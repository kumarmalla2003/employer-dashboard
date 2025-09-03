import os
import json
import asyncio
import mysql.connector
import tornado.web
import tornado.ioloop
import bcrypt

# --- Database Setup ---
def create_db_connection():
    try:
        db_connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password="KumarMalla@1993",
            database="employer_dashboard"
        )
        print("Database connection successful!")
        return db_connection
    except mysql.connector.Error as err:
        print(f"Error connecting to MySQL: {err}")
        return None

db = create_db_connection()

# --- Base Handler for CORS and User Authentication ---
class BaseHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "http://localhost:5173")
        self.set_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.set_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.set_header("Access-Control-Allow-Credentials", "true")

    def options(self):
        self.set_status(204)
        self.finish()

    def get_current_user(self):
        return self.get_secure_cookie("user")

# --- User Authentication Handlers ---
class SignupHandler(BaseHandler):
    def post(self):
        try:
            data = json.loads(self.request.body)
            email = data.get('email')
            password = data.get('password')

            if not email or not password:
                self.set_status(400)
                self.write({"error": "Email and password are required."})
                return

            hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

            cursor = db.cursor()
            query = "INSERT INTO users (email, password_hash) VALUES (%s, %s)"
            cursor.execute(query, (email, hashed_password))
            db.commit()
            cursor.close()

            self.set_status(201)
            self.write({"message": "User created successfully."})
        except mysql.connector.Error as err:
            self.set_status(409)
            self.write({"error": "This email is already registered."})
            db.rollback()
        except Exception as e:
            self.set_status(500)
            self.write({"error": f"Internal server error: {e}"})

class LoginHandler(BaseHandler):
    def post(self):
        try:
            data = json.loads(self.request.body)
            email = data.get('email')
            password = data.get('password')

            cursor = db.cursor(dictionary=True)
            query = "SELECT id, password_hash FROM users WHERE email = %s"
            cursor.execute(query, (email,))
            user = cursor.fetchone()
            cursor.close()

            if user and bcrypt.checkpw(password.encode('utf-8'), user['password_hash'].encode('utf-8')):
                self.set_secure_cookie("user", str(user['id']), expires_days=1)
                self.set_status(200)
                self.write({"message": "Login successful."})
            else:
                self.set_status(401)
                self.write({"error": "Invalid email or password."})
        except Exception as e:
            self.set_status(500)
            self.write({"error": f"Internal server error: {e}"})

class LogoutHandler(BaseHandler):
    def post(self):
        self.clear_cookie("user")
        self.set_status(200)
        self.write({"message": "Logged out successfully."})

# --- Employee Management Handlers ---
class EmployeeHandler(BaseHandler):
    def prepare(self):
        if not self.get_current_user():
            self.set_status(401)
            self.write({"error": "Unauthorized"})
            self.finish()
            
    def get(self, employee_id=None):
        try:
            cursor = db.cursor(dictionary=True)
            if employee_id:
                query = "SELECT id, firstName, lastName, email, phone, department, designation, salary, hireDate, dateOfBirth, address, city, state, postalCode, country, emergencyContactName, emergencyContactPhone FROM employees WHERE id = %s"
                cursor.execute(query, (employee_id,))
                employee = cursor.fetchone()
                if employee:
                    self.write(json.dumps(employee, default=str)) # Use json.dumps for proper serialization
                else:
                    self.set_status(404)
                    self.write({"error": "Employee not found."})
            else:
                query = "SELECT id, firstName, lastName, email, phone, department, designation, salary, hireDate, dateOfBirth, address, city, state, postalCode, country, emergencyContactName, emergencyContactPhone FROM employees"
                cursor.execute(query)
                employees = cursor.fetchall()
                self.write(json.dumps(employees, default=str)) # Use json.dumps for proper serialization
            cursor.close()
            self.set_status(200)
        except Exception as e:
            self.set_status(500)
            self.write({"error": f"Internal server error: {e}"})

    def post(self):
        try:
            data = json.loads(self.request.body)
            firstName = data.get('firstName')
            lastName = data.get('lastName')
            email = data.get('email')
            phone = data.get('phone')
            department = data.get('department')
            designation = data.get('designation')
            salary = data.get('salary')
            hireDate = data.get('hireDate')
            dateOfBirth = data.get('dateOfBirth')
            address = data.get('address')
            city = data.get('city')
            state = data.get('state')
            postalCode = data.get('postalCode')
            country = data.get('country')
            emergencyContactName = data.get('emergencyContactName')
            emergencyContactPhone = data.get('emergencyContactPhone')

            if not firstName or not lastName or not email:
                self.set_status(400)
                self.write({"error": "First name, last name, and email are required."})
                return

            cursor = db.cursor()
            query = """
            INSERT INTO employees 
            (firstName, lastName, email, phone, department, designation, salary, hireDate, dateOfBirth, address, city, state, postalCode, country, emergencyContactName, emergencyContactPhone) 
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            cursor.execute(query, (
                firstName,
                lastName,
                email,
                phone,
                department,
                designation,
                salary,
                hireDate,
                dateOfBirth,
                address,
                city,
                state,
                postalCode,
                country,
                emergencyContactName,
                emergencyContactPhone
            ))
            db.commit()
            new_id = cursor.lastrowid
            cursor.close()

            self.set_status(201)
            self.write({"message": "Employee created successfully.", "id": new_id})
        except mysql.connector.Error as err:
            self.set_status(409)
            self.write({"error": "This email is already registered."})
            db.rollback()
        except Exception as e:
            self.set_status(500)
            self.write({"error": f"Internal server error: {e}"})

    def put(self, employee_id):
        try:
            data = json.loads(self.request.body)
            firstName = data.get('firstName')
            lastName = data.get('lastName')
            email = data.get('email')
            phone = data.get('phone')
            department = data.get('department')
            designation = data.get('designation')
            salary = data.get('salary')
            hireDate = data.get('hireDate')
            dateOfBirth = data.get('dateOfBirth')
            address = data.get('address')
            city = data.get('city')
            state = data.get('state')
            postalCode = data.get('postalCode')
            country = data.get('country')
            emergencyContactName = data.get('emergencyContactName')
            emergencyContactPhone = data.get('emergencyContactPhone')

            if not firstName or not lastName or not email:
                self.set_status(400)
                self.write({"error": "First name, last name, and email are required."})
                return

            cursor = db.cursor()
            query = """
            UPDATE employees
            SET firstName = %s, lastName = %s, email = %s, phone = %s, department = %s, designation = %s, salary = %s, hireDate = %s, dateOfBirth = %s, address = %s, city = %s, state = %s, postalCode = %s, country = %s, emergencyContactName = %s, emergencyContactPhone = %s
            WHERE id = %s
            """
            cursor.execute(query, (
                firstName, lastName, email, phone, department, designation, salary,
                hireDate, dateOfBirth, address, city, state, postalCode, country,
                emergencyContactName, emergencyContactPhone, employee_id
            ))
            db.commit()
            cursor.close()

            if cursor.rowcount > 0:
                self.set_status(200)
                self.write({"message": "Employee updated successfully."})
            else:
                self.set_status(404)
                self.write({"error": "Employee not found."})
        except Exception as e:
            self.set_status(500)
            self.write({"error": f"Internal server error: {e}"})

    def delete(self, employee_id):
        try:
            cursor = db.cursor()
            query = "DELETE FROM employees WHERE id = %s"
            cursor.execute(query, (employee_id,))
            db.commit()
            cursor.close()

            if cursor.rowcount > 0:
                self.set_status(200)
                self.write({"message": "Employee deleted successfully."})
            else:
                self.set_status(404)
                self.write({"error": "Employee not found."})
        except Exception as e:
            self.set_status(500)
            self.write({"error": f"Internal server error: {e}"})

# --- Application and Server Setup ---
def make_app():
    return tornado.web.Application([
        (r"/api/signup", SignupHandler),
        (r"/api/login", LoginHandler),
        (r"/api/logout", LogoutHandler),
        (r"/api/employees", EmployeeHandler),
        (r"/api/employees/(?P<employee_id>[0-9]+)", EmployeeHandler),
    ], 
    cookie_secret=os.environ.get("TORNADO_COOKIE_SECRET", "default_secret_key"),
    debug=True)

async def main():
    app = make_app()
    app.listen(8000)
    print("Server is listening on port 8000...")
    await asyncio.Event().wait()

if __name__ == "__main__":
    asyncio.run(main())