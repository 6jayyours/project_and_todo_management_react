import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="mt-4 text-center text-sm">
        &copy; {new Date().getFullYear()} ARJUN. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
