import React, { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";
import { UserProfile } from "./UserProfile";
import { LoginButton } from "./LoginButton";
import MobileMenu from "./MobileMenu";
import MobileMenuButton from "./MobileMenuButton";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import LogoWhite from "../../assets/Images/Logo/Deira-logo.png";
import LogoPrimary from "../../assets/Images/Logo/Deira-logo_colored.png";
import Image from "../../assets/Images/LoginStar.jpg";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import SelectArea from "./SelectArea";

const pages = [
  { path: "/", label: "الرئيسية" },
  { path: "/privacy-policy", label: "سياسة الخصوصية" },
  { path: "/contact", label: "تواصل معنا" },
  { path: "/profile", label: "النجوم" },
];

const Navbar = ({ color }) => {

  const navigate = useNavigate();
  const [mockUser, setMockUser] = useState({
    name: "",
    image: Image,
    isAuthenticated: false,
    role:"star"

  });


    const { getUserData, logOut } = useAuth();
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserData();
        setMockUser({
          name: userData.name,
          image: userData.profilePicture,
          isAuthenticated: true,
          role: userData.role,
        });
      } catch (error) {
        // console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [getUserData]);




  const scrollPosition = useScrollPosition();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isScrolled = color === "black" ? true : scrollPosition;

  const onClose = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    
    logOut();
    setMockUser({
      name: "",
      image: Image,
      isAuthenticated:false,
      role:"star"
    });

    navigate("/login");
    
  }

  const handleLogin = () => {
    console.log("Logging in...");
    navigate("/login");

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

          <div className="hidden md:block">
            {mockUser.isAuthenticated ? (
              <div className="flex gap-10">
              <SelectArea isScrolled={isScrolled}/>
              <UserProfile user={mockUser} onLogout={handleLogout} />
              </div>
            ) : (
              <div className="flex gap-10">
              <SelectArea isScrolled={isScrolled}/>
              <LoginButton onLogin={handleLogin} isScrolled={isScrolled} />
              </div>
            )}
          </div>

          <MobileMenuButton
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            isOpen={isMobileMenuOpen}
            isScrolled={isScrolled}
          />
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        links={pages}
        user={mockUser}
        onClose={onClose}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
    </nav>
  );
};

export default Navbar;
