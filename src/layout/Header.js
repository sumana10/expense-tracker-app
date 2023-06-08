import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";
import { clearAuthientication, getAuthientication } from "../utils/loginLogic";
import useCategory from "../utils/useCategory";

const Header = () => {

  const [isOpen, setIsOpen] = useState(false);

  const [categories] = useCategory();

  const toggleOpen = () => setIsOpen(!isOpen);

  const menuClass = `dropdown-menu${isOpen ? " show" : ""}`;

  const [isAdmin, setIsAdmin] = useState();

  const {authUser} = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
   authFunction()
  },[]);

  const authFunction = () =>{

    const isLoggedIn = getAuthientication();
    if (!isLoggedIn) navigate("/");

    let res = authUser?.role === "admin";
    setIsAdmin(res);
    console.log(isAdmin + "admin");

  }

  const onLogOut = () => {
    clearAuthientication();
    navigate("/");
  };
  const styleX = {
    backgroundColor: "#17a2b8 !important",
    marginTop: "-25px",
  };

  return (
    <nav
      id="my-navbar"
      className="navbar navbar-expand-lg navbar-dark bg-success bg-gradient"
      style={styleX}
    >
      <NavLink
        className="navbar-brand fw-bold"
        to="#"
        style={{ marginLeft: "50px" }}
      >
        Expense Tracker
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-auto">
          {isAdmin && (
            <>
              <li className="nav-item">
                <NavLink
                  className="nav-link text-white text-uppercase fw-bold"
                  to="/category"
                >
                  Manage Category
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link text-white text-uppercase fw-bold"
                  to="/expenses"
                >
                  Manage Expenses
                </NavLink>
              </li>
              <li className="nav-item dropdown" onClick={toggleOpen}>
                <NavLink
                  to="#"
                  className="nav-link dropdown-toggle text-uppercase fw-bold"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Expense Report
                </NavLink>
                <div className={menuClass} aria-labelledby="navbarDropdown">
                  {categories &&
                    categories.map((cat) => (
                      <NavLink
                        key={cat.id}
                        className="dropdown-item text-success"
                        to={`/category/${cat.id}`}
                      >
                        {cat.name}
                      </NavLink>
                    ))}
                </div>
              </li>
            </>
          )}
        </ul>
        <span className="me-4 text-white fw-bold text-uppercase">
          Welcome ! {authUser?.user}
        </span>
        <button
          className="btn btn-outline-light me-4"
          onClick={onLogOut}
        >
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Header;
