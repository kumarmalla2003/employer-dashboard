import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 text-center py-4 text-sm mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p>
          Made with &#9829; & passion by{" "}
          <a
            href="https://github.com/kumarmalla2003"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Kumar Naidu Malla
          </a>{" "}
          to simplify your work.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
