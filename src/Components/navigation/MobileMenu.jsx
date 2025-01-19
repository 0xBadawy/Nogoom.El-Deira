import PropTypes from "prop-types";
import { NavLinks } from "./NavLinks";
import { LoginButton } from "./LoginButton";
import { UserProfile } from "./UserProfile";
import SelectArea from "./SelectArea";

const MobileMenu = ({
  isOpen,
  links,
  user,
  onLogin,
  onLogout,
  onClose = () => {},
}) => {
  if (!isOpen) return null;
  

  return (
    <div className="md:hidden fixed inset-0 z-50 bg-white">
      <div className="flex flex-col h-full p-4">
        <div className="flex justify-end">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => onClose()}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="flex flex-col items-center mt-8 space-y-6">

          <div className="mt-auto">
            {user?.isAuthenticated ? (
              <>
                            <SelectArea />
                            <NavLinks links={links} isMobile={true} />

              <UserProfile user={user} onLogout={onLogout} isMobile={true} />
              </>
            ) : (
              <>
                            <SelectArea />
                            <NavLinks links={links} isMobile={true} />

              <LoginButton onLogin={onLogin} isMobile={true} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  }),
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onClose: PropTypes.func,
};

export default MobileMenu;
