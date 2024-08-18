import React from "react";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-[#A91D3A] text-white p-4">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()}  All rights reserved to TechZen.
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
