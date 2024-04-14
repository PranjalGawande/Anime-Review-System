import React from 'react'
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-opacity-50">
    <div className="container-fluid">
      <Link className="navbar-brand " to="/">
      <img src="https://i.postimg.cc/X7Sr7Fsq/logo.png" alt="logo" height={70} />
        Techie Store
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link
              className="nav-link active"
              aria-current="page"
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              New
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Trending
            </Link>
          </li>
        </ul>
        {/* <Link to="/profile"> */}
          <img className="icon" src="https://i.postimg.cc/PfMgPn4D/user.png" alt="user" height="25px" />
        {/* </Link> */}
        {/* <Link to="/cart"> */}
          <img className="icon" src="https://i.postimg.cc/2S5rzSN3/cart.png" alt="cart" height="25px" />
        {/* </Link> */}
        <form className="d-flex" role="search">
          <input
            className="form-control me-2 text-dark border-dark-subtle border border-primary rounded-pill border-3"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          {/* <Link */}
            {/* className="btn btn-primary btn-lg rounded-pill border-3" */}
            {/* type="submit" */}
          {/* > */}
            Search
          {/* </Link> */}
        </form>
      </div>
    </div>
  </nav>
  )
}

export default Nav