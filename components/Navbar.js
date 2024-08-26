"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
// import ProjectSearch from "./ProjectSearch";
import SearchSuggest from "./SerachSuggest";

const Navbar = ({ cities, transparent }) => {
  const [cityname, setCityname] = useState("");
  const [navbar, setNavbar] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    if (window) {
      window.addEventListener("scroll", changeBackground);
    }
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    setButtonClicked(!buttonClicked);
  };

  return (
    <div
      className={navbar ? "navbar-transparent active" : "navbar-transparent"}
    >
      <nav className="navbar navbar-expand-lg py-lg-3">
        <div className="container justify-content-start">
          <div className="d-flex">
            <Link
              href="/"
              className="logo d-flex justify-content-center align-items-center pe-1  text-sm"
            >
              <span>
                propertyassign<span className="text-danger">.ca</span>{" "}
              </span>
            </Link>
            <div
              className="input-group input-group-search
             me-md-0 "
            >
              {/* <ProjectSearch /> */}
              <SearchSuggest cities={cities} />
            </div>
            <button
              className={`navbar-toggler ${buttonClicked ? "bg-white" : ""}`}
              type="button"
              onClick={toggleCollapse}
              aria-controls="collapsibleNavId"
              aria-expanded={isCollapsed}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div
            className={`collapse navbar-collapse ${isCollapsed ? "show" : ""} ${
              isCollapsed ? "bg-white" : ""
            }`}
            id="collapsibleNavId"
          >
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              <li className="nav-item dropdown mx-1">
                <Link
                  className="nav-link dropdown-toggle active fw-medium  rounded-2"
                  href="#"
                  id="dropdownId"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Cities
                </Link>
                <div
                  className="dropdown-menu mt-1"
                  aria-labelledby="dropdownId"
                >
                  <div className="container">
                    <div className="row row-cols-md-3 row-cols-3">
                      {cities &&
                        cities.map((city) => (
                          <div className="col" key={city.id}>
                            <Link
                              className="dropdown-item"
                              href={`/assignment-for-sale/${city.slug}`}
                            >
                              {city.name}
                            </Link>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </li>
              <li className="nav-item mx-1">
                <Link className="nav-link" href="/mortgage-calculator">
                  Mortgage Calculator
                </Link>
              </li>
              {/* <li className="nav-item rounded-2  mx-1">
                <Link className="nav-link" href="/top-10-gta-projects">
                  Top Assignments for Sale <span className="fw-medium"></span>
                </Link>
              </li> */}
              <li className="nav-item mx-1">
                <Link className="nav-link" href="">
                  Blogs
                </Link>
              </li>
            </ul>
            <button
              className="btn bg-dark btn-dark my-2 my-sm-0 rounded ms-md-4 py-2 px-3 fs-6"
              type="submit"
            >
              <Link className="nav-link text-white " href="#contact">
                Contact Now
              </Link>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
