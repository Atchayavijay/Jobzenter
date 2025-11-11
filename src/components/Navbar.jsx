import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";
import { IoChevronDownSharp } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/", hasDropdown: false },
    { label: "Courses", path: "/courses", hasDropdown: false },
    { label: "Reach Us", path: "/reach-us", hasDropdown: false },
    {
      label: "Career Lab",
      path: "/career-lab",
      hasDropdown: true,
      dropdownItems: [
        { label: "Interview Preparation", path: "/career-lab/interview-preparation" },
        { label: "Resume Building", path: "/career-lab/resume-building" },
        { label: "Bootcamps", path: "/career-lab/bootcamps" },
      ],
    },
    { label: "Tech Blogs", path: "/tech-blogs", hasDropdown: false },
  ];

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const navbarRef = useRef(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const navigate = useNavigate();
  const closeDropdownTimer = useRef(null);

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    const updateBodyPadding = () => {
      if (!navbarRef.current) return;
      const computedStyle = window.getComputedStyle(navbarRef.current);
      const isFixed = computedStyle.position === "fixed";
      const navHeight = navbarRef.current.offsetHeight;
      document.body.style.paddingTop = isFixed ? `${navHeight}px` : "";
    };

    updateBodyPadding();
    window.addEventListener("resize", updateBodyPadding);
    return () => {
      window.removeEventListener("resize", updateBodyPadding);
      document.body.style.paddingTop = "";
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 992);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!navbarRef.current) return;
    const computedStyle = window.getComputedStyle(navbarRef.current);
    const isFixed = computedStyle.position === "fixed";
    const navHeight = navbarRef.current.offsetHeight;
    document.body.style.paddingTop = isFixed ? `${navHeight}px` : "";
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setOpenDropdown(null);
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (closeDropdownTimer.current) {
        clearTimeout(closeDropdownTimer.current);
      }
    };
  }, []);

  const handleDropdownToggle = (label) => {
    if (closeDropdownTimer.current) {
      clearTimeout(closeDropdownTimer.current);
      closeDropdownTimer.current = null;
    }
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  const handleDropdownOpen = (label) => {
    if (closeDropdownTimer.current) {
      clearTimeout(closeDropdownTimer.current);
      closeDropdownTimer.current = null;
    }
    if (isDesktop) {
      setOpenDropdown(label);
    }
  };

  const handleDropdownClose = (event, label) => {
    if (!isDesktop) return;
    const relatedTarget = event?.relatedTarget;
    if (relatedTarget && relatedTarget.closest(`[data-dropdown="${label}"]`)) {
      return;
    }
    closeDropdownTimer.current = setTimeout(() => {
      setOpenDropdown((current) => (current === label ? null : current));
      closeDropdownTimer.current = null;
    }, 300);
  };

  const handleNavLinkClick = (event, item) => {
    if (item.hasDropdown && !isDesktop && openDropdown !== item.label) {
      event.preventDefault();
      setOpenDropdown(item.label);
    }
  };

  const handleDropdownNavigation = (path) => {
    if (closeDropdownTimer.current) {
      clearTimeout(closeDropdownTimer.current);
      closeDropdownTimer.current = null;
    }
    navigate(path);
    setOpenDropdown(null);
    setIsOpen(false);
  };

  return (
    <nav ref={navbarRef} className="navbar navbar-expand-lg navbar-custom fixed-top shadow-sm">
      <div className="container-fluid navbar-inner-container h-100">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src="/JZ Logo.png"
            alt="Jobzenter Logo"
            className="img-fluid"
            style={{ width: "227px", height: "52px", objectFit: "contain" }}
          />
        </Link>

        <button
          className={`navbar-toggler navbar-toggler-custom ${isOpen ? "collapsed" : ""}`}
          type="button"
          aria-controls="navbarSupportedContent"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-line" />
          <span className="navbar-toggler-line" />
          <span className="navbar-toggler-line" />
        </button>

        <div
          className={`collapse navbar-collapse justify-content-end ${isOpen ? "show" : ""}`}
          id="navbarSupportedContent"
        >
          <ul
            className="navbar-nav nav-links mb-3 mb-lg-0"
            onMouseEnter={() => {
              if (closeDropdownTimer.current) {
                clearTimeout(closeDropdownTimer.current);
                closeDropdownTimer.current = null;
              }
            }}
            onMouseLeave={() => {
              if (!isDesktop) return;
              if (closeDropdownTimer.current) {
                clearTimeout(closeDropdownTimer.current);
              }
              closeDropdownTimer.current = setTimeout(() => {
                setOpenDropdown(null);
                closeDropdownTimer.current = null;
              }, 500);
            }}
          >
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const isDropdownOpen = openDropdown === item.label;
              return (
                <li
                  key={item.path}
                  className={`nav-item d-flex align-items-center ${item.hasDropdown ? "has-dropdown" : ""} ${
                    item.label === "Career Lab" ? "career-lab" : ""
                  } ${isDropdownOpen ? "dropdown-open" : ""}`}
                  data-dropdown={item.label}
                  onMouseEnter={(event) => item.hasDropdown && handleDropdownOpen(item.label)}
                  onMouseLeave={(event) => item.hasDropdown && handleDropdownClose(event, item.label)}
                >
                  <div className="nav-link-wrapper">
                    <Link
                      to={item.path}
                      className={`nav-link text-dark ${isActive ? "active nav-link-active" : ""}`}
                      onClick={(event) => handleNavLinkClick(event, item)}
                    >
                      {item.label}
                    </Link>
                    {item.hasDropdown && (
                      <button
                        type="button"
                        className="dropdown-toggle-button"
                        aria-expanded={isDropdownOpen}
                        aria-haspopup="true"
                        aria-label={`${item.label} menu`}
                        onClick={() => handleDropdownToggle(item.label)}
                      >
                        <IoChevronDownSharp
                          size={14}
                          className={`dropdown-icon text-dark ${isDropdownOpen ? "open" : ""}`}
                        />
                      </button>
                    )}
                  </div>
                  {item.hasDropdown && item.dropdownItems && (
                    <>
                      {isDesktop ? (
                        <ul
                          className={`dropdown-menu-custom ${isDropdownOpen ? "show" : ""}`}
                          data-dropdown={item.label}
                          onMouseLeave={(event) => handleDropdownClose(event, item.label)}
                        >
                          {item.dropdownItems.map((dropdownItem) => {
                            const isDropdownActive = location.pathname === dropdownItem.path;
                            return (
                              <li key={dropdownItem.path}>
                                <Link
                                  to={dropdownItem.path}
                                  className={`dropdown-item-custom ${isDropdownActive ? "active" : ""}`}
                                  onClick={() => setOpenDropdown(null)}
                                >
                                  {dropdownItem.label}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        <>
                          <div
                            className={`mobile-dropdown-overlay ${isDropdownOpen ? "show" : ""}`}
                            onClick={() => {
                              setOpenDropdown(null);
                            }}
                          />
                          <div className={`mobile-dropdown-panel ${isDropdownOpen ? "show" : ""}`} data-dropdown={item.label}>
                            <div className="mobile-dropdown-body">
                              {item.dropdownItems.map((dropdownItem) => {
                                const isDropdownActive = location.pathname === dropdownItem.path;
                                return (
                                  <button
                                    key={dropdownItem.path}
                                    type="button"
                                    className={`mobile-dropdown-item ${isDropdownActive ? "active" : ""}`}
                                    onClick={() => handleDropdownNavigation(dropdownItem.path)}
                                  >
                                    {dropdownItem.label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="social-icons ms-lg-4">
            <Link
              to="https://twitter.com/jobzenter"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Jobzenter on Twitter"
              className="social-icon-button"
            >
              <FaTwitter className="social-icon" style={{ color: "#1DA1F2" }} />
            </Link>
            <Link
              to="https://facebook.com/jobzenter"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Jobzenter on Facebook"
              className="social-icon-button"
            >
              <FaFacebookF className="social-icon" style={{ color: "#1877F2" }} />
            </Link>
            <Link
              to="https://www.instagram.com/jobzenter_official?igsh=dWVwdGs1bWM4ZnBp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Jobzenter on Instagram"
              className="social-icon-button"
            >
              <FaInstagram className="social-icon" style={{ color: "#E4405F" }} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
