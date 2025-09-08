import os
import json
import asyncio
import mysql.connector
import tornado.web
import tornado.ioloop
import bcrypt
from dotenv import load_dotenv

load_dotenv()

# --- Database Setup ---
def create_db_connection():
    try:
        db_connection = mysql.connector.connect(
            host=os.environ.get("DB_HOST"),
            user=os.environ.get("DB_USER"),
            password=os.environ.get("DB_PASSWORD"),
            database=os.environ.get("DB_NAME")
        )
        print("Database connection successful!")
        return db_connection
    except mysql.connector.Error as err:
        print(f"Error connecting to MySQL: {err}")
        return None

db = create_db_connection()

# --- Base Handler for CORS and User Authentication ---
# --- Base Handler for CORS and User Authentication ---
class BaseHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "http://localhost:5173")
        self.set_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.set_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.set_header("Access-Control-Allow-Credentials", "true")

    def options(self, *args, **kwargs):
        """Handle CORS preflight requests with any number of arguments"""
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
            self.write({"error": "This email is already registered. Please log in!"})
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

            if not user:
                self.set_status(404)
                self.write({"error": "This email is not registered! Please sign up first."})
                return

            if bcrypt.checkpw(password.encode('utf-8'), user['password_hash'].encode('utf-8')):
                self.set_secure_cookie("user", str(user['id']))
                self.set_status(200)
                self.write({"message": "Login successful."})
            else:
                self.set_status(401)
                self.write({"error": "Wrong password! Please try again."})
        except Exception as e:
            self.set_status(500)
            self.write({"error": f"Internal server error: {e}"})

class LogoutHandler(BaseHandler):
    def post(self):
        self.clear_cookie("user")
        self.set_status(200)
        self.write({"message": "Logged out successfully."})

class CheckAuthHandler(BaseHandler):
    def get(self):
        user_id = self.get_current_user()
        if user_id:
            self.set_status(200)
            self.write({"authenticated": True, "user_id": user_id.decode('utf-8')})
        else:
            self.set_status(401)
            self.write({"authenticated": False})

class ResetPasswordHandler(BaseHandler):
    def post(self):
        try:
            data = json.loads(self.request.body)
            email = data.get('email')
            old_password = data.get('old_password')
            new_password = data.get('new_password')

            if not email or not old_password or not new_password:
                self.set_status(400)
                self.write({"error": "Email, old password, and new password are required."})
                return

            cursor = db.cursor(dictionary=True)
            query = "SELECT id, password_hash FROM users WHERE email = %s"
            cursor.execute(query, (email,))
            user = cursor.fetchone()
            cursor.close()

            if not user or not bcrypt.checkpw(old_password.encode('utf-8'), user['password_hash'].encode('utf-8')):
                self.set_status(401)
                self.write({"error": "Invalid email or old password."})
                return

            hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
            
            cursor = db.cursor()
            update_query = "UPDATE users SET password_hash = %s WHERE id = %s"
            cursor.execute(update_query, (hashed_password, user['id']))
            db.commit()
            cursor.close()

            self.set_status(200)
            self.write({"message": "Password updated successfully."})

        except Exception as e:
            self.set_status(500)
            self.write({"error": f"Internal server error: {e}"})

# --- Employee Management Handlers ---
class EmployeeHandler(BaseHandler):
    def prepare(self):
        # Skip authentication check for OPTIONS requests (CORS preflight)
        if self.request.method == "OPTIONS":
            return
        
        if not self.get_current_user():
            self.set_status(401)
            self.write({"error": "Unauthorized"})
            self.finish()

    def get(self, employee_id=None):
        try:
            user_id = self.get_current_user().decode('utf-8')
            cursor = db.cursor(dictionary=True)
            
            if employee_id:
                print(f"Fetching employee with ID: {employee_id} for user: {user_id}")
                query = "SELECT id, firstName, lastName, email, phone, department, designation, salary, hireDate, dateOfBirth, address, city, state, postalCode, country, emergencyContactName, emergencyContactPhone FROM employees WHERE id = %s AND user_id = %s"
                cursor.execute(query, (employee_id, user_id))
                employee = cursor.fetchone()
                cursor.close()
                
                if employee:
                    self.set_status(200)
                    self.write(json.dumps(employee, default=str))
                else:
                    self.set_status(404)
                    self.write({"error": "Employee not found or you don't have permission to view it."})
            else:
                query = "SELECT id, firstName, lastName, email, phone, department, designation, salary, hireDate, dateOfBirth, address, city, state, postalCode, country, emergencyContactName, emergencyContactPhone FROM employees WHERE user_id = %s"
                cursor.execute(query, (user_id,))
                employees = cursor.fetchall()
                cursor.close()
                
                self.set_status(200)
                self.write(json.dumps(employees, default=str))
                
        except Exception as e:
            print(f"Error in GET /employees/{employee_id}: {e}")
            self.set_status(500)
            self.write({"error": f"Internal server error: {e}"})

    def post(self):
        try:
            user_id = self.get_current_user().decode('utf-8')
            data = json.loads(self.request.body)

            required_fields = [
                'firstName', 'lastName', 'email', 'phone', 'department',
                'designation', 'salary', 'hireDate', 'dateOfBirth', 'address',
                'city', 'state', 'postalCode', 'country',
                'emergencyContactName', 'emergencyContactPhone'
            ]

            missing_fields = [field for field in required_fields if not data.get(field)]
            if missing_fields:
                self.set_status(400)
                self.write({"error": f"Missing required fields: {', '.join(missing_fields)}"})
                return

            cursor = db.cursor()
            query = """
            INSERT INTO employees 
            (firstName, lastName, email, phone, department, designation, salary, hireDate, dateOfBirth, address, city, state, postalCode, country, emergencyContactName, emergencyContactPhone, user_id)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            cursor.execute(query, (
                data['firstName'], data['lastName'], data['email'], data['phone'],
                data['department'], data['designation'], data['salary'], data['hireDate'],
                data['dateOfBirth'], data['address'], data['city'], data['state'],
                data['postalCode'], data['country'], data['emergencyContactName'],
                data['emergencyContactPhone'], user_id
            ))
            db.commit()
            new_id = cursor.lastrowid
            cursor.close()

            self.set_status(201)
            self.write({"message": "Employee created successfully.", "id": new_id})
        except mysql.connector.IntegrityError as err:
            if "Duplicate entry" in str(err) and "email" in str(err):
                self.set_status(409)
                self.write({"error": "This email is already registered for an employee."})
            else:
                self.set_status(400)
                self.write({"error": f"Database constraint error: {err}"})
            db.rollback()
        except mysql.connector.Error as err:
            self.set_status(500)
            self.write({"error": f"Database error: {err}"})
            db.rollback()
        except Exception as e:
            self.set_status(500)
            self.write({"error": f"Internal server error: {e}"})

    def put(self, employee_id):
        try:
            print(f"PUT request for employee ID: {employee_id}")
            user_id = self.get_current_user().decode('utf-8')
            data = json.loads(self.request.body)

            required_fields = [
                'firstName', 'lastName', 'email', 'phone', 'department',
                'designation', 'salary', 'hireDate', 'dateOfBirth', 'address',
                'city', 'state', 'postalCode', 'country',
                'emergencyContactName', 'emergencyContactPhone'
            ]

            missing_fields = [field for field in required_fields if not data.get(field)]
            if missing_fields:
                self.set_status(400)
                self.write({"error": f"Missing required fields: {', '.join(missing_fields)}"})
                return

            cursor = db.cursor()
            query = """
            UPDATE employees
            SET firstName = %s, lastName = %s, email = %s, phone = %s, department = %s,
            designation = %s, salary = %s, hireDate = %s, dateOfBirth = %s, address = %s,
            city = %s, state = %s, postalCode = %s, country = %s,
            emergencyContactName = %s, emergencyContactPhone = %s
            WHERE id = %s AND user_id = %s
            """
            cursor.execute(query, (
                data['firstName'], data['lastName'], data['email'], data['phone'],
                data['department'], data['designation'], data['salary'], data['hireDate'],
                data['dateOfBirth'], data['address'], data['city'], data['state'],
                data['postalCode'], data['country'], data['emergencyContactName'],
                data['emergencyContactPhone'], employee_id, user_id
            ))
            db.commit()

            rowcount = cursor.rowcount
            cursor.close()

            if rowcount > 0:
                self.set_status(200)
                self.write({"message": "Employee updated successfully."})
            else:
                self.set_status(404)
                self.write({"error": "Employee not found or you don't have permission to update it."})
        except mysql.connector.IntegrityError as err:
            if "Duplicate entry" in str(err) and "email" in str(err):
                self.set_status(409)
                self.write({"error": "This email is already registered for another employee."})
            else:
                self.set_status(400)
                self.write({"error": f"Database constraint error: {err}"})
            db.rollback()
        except Exception as e:
            print(f"Error in PUT /employees/{employee_id}: {e}")
            self.set_status(500)
            self.write({"error": f"Internal server error: {e}"})

    def delete(self, employee_id):
        try:
            print(f"DELETE request for employee ID: {employee_id}")
            user_id = self.get_current_user().decode('utf-8')
            cursor = db.cursor()
            query = "DELETE FROM employees WHERE id = %s AND user_id = %s"
            cursor.execute(query, (employee_id, user_id))
            db.commit()

            rowcount = cursor.rowcount
            cursor.close()

            if rowcount > 0:
                self.set_status(200)
                self.write({"message": "Employee deleted successfully."})
            else:
                self.set_status(404)
                self.write({"error": "Employee not found or you don't have permission to delete it."})
        except Exception as e:
            print(f"Error in DELETE /employees/{employee_id}: {e}")
            self.set_status(500)
            self.write({"error": f"Internal server error: {e}"})

# --- Application and Server Setup ---
def make_app():
    cookie_secret = os.environ.get("TORNADO_COOKIE_SECRET")
    if not cookie_secret:
        raise ValueError("The TORNADO_COOKIE_SECRET environment variable must be set for security.")

    return tornado.web.Application([
        (r"/api/signup", SignupHandler),
        (r"/api/login", LoginHandler),
        (r"/api/logout", LogoutHandler),
        (r"/api/check-auth", CheckAuthHandler),
        (r"/api/reset-password", ResetPasswordHandler),
        (r"/api/employees/?$", EmployeeHandler),  # Fixed: Made trailing slash optional
        (r"/api/employees/([0-9]+)/?$", EmployeeHandler),  # Fixed: Proper capture group syntax
    ], 
    cookie_secret=cookie_secret,
    debug=True)

async def main():
    app = make_app()
    app.listen(8000)
    print("Server is listening on port 8000...")
    await asyncio.Event().wait()

if __name__ == "__main__":
    asyncio.run(main())