import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 text-center py-4 text-sm mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p>
          &copy; {new Date().getFullYear()} Employer Dashboard. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
