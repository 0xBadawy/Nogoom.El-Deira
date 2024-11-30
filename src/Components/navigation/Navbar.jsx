import React from "react";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";
import { UserProfile } from "./UserProfile";
import { LoginButton } from "./LoginButton";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import LogoWhite from "../../assets/Images/Logo/Deira-logo.png";
import LogoPrimary from "../../assets/Images/Logo/Deira-logo_colored.png";
import Image from "../../assets/Images/LoginStar.jpg";

const pages = [
  { path: "/", label: "الرئيسية" },
  { path: "/privacy-policy", label: "سياسة الخصوصية" },
  { path: "/contact", label: "تواصل معنا" },
  { path: "/stars", label: "النجوم" },
];

const mockUser = {
  name: "Mohamed Badawy",
  image: Image,
  isAuthenticated: false, // Changed to false to demonstrate login button
};

const Navbar = () => {
  const isScrolled = useScrollPosition();

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logging out...");
  };

  const handleLogin = () => {
    // Implement login logic here
    console.log("Logging in...");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
                ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <Logo
            primaryLogo={LogoPrimary}
            whiteLogo={LogoWhite}
            isScrolled={isScrolled}
          />

          <div className="hidden md:block">
            <NavLinks links={pages} isScrolled={isScrolled} />
          </div>

          {mockUser.isAuthenticated ? (
            <UserProfile user={mockUser} onLogout={handleLogout} />
          ) : (
            <LoginButton onLogin={handleLogin} isScrolled={isScrolled} />
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <NavLinks links={pages} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
