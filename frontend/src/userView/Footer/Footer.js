import React from 'react';
import "./Footer.css"

function Footer() {
  return (
    <footer className="footer py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className=" text-center">
          <center>
            © {new Date().getFullYear()} Gym Management System. All rights reserved.
          </center>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
