import React, { Component } from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";

import "./SideNav.scss";

class SideNav extends Component {
  onLogoutClick = e => {
    this.props.logoutUser();
  };

  // Hide Side Nav
  toggleMenu = e => {
    let sideNav = document.querySelector(".side");
    sideNav.classList.add("invisibile");

    let hamburger = document.querySelector(".hamburger-top-menu");
    hamburger.classList.add("hamburger-visible");

    let rightSide = document.querySelector(".right");
    rightSide.classList.add("no-side");

    let rightSideRight = document.querySelector(".right-top");
    rightSideRight.classList.add("right-top-visibile");
  };

  render() {
    const { patients } = this.props.patients;

   let patientData = patients.sort().map(patient => (
      <li className="project-listing" key={patient._id}>
        <Link to={`/patients/${patient._id}`}>{patient.name}</Link>
      </li>
    ));

    return (
      <nav className="side">
        <ul className="top">
          <li>
            <i
              onClick={this.toggleMenu}
              className="material-icons hamburger-side-menu"
            >
              menu
            </i>
          </li>
          <NavLink exact activeClassName="active-page" to="/dashboard">
            <li>
              <i className="material-icons icon">home</i>Home
            </li>
          </NavLink>
          <NavLink exact activeClassName="active-page" to="/tasks">
            <li>
              <i className="material-icons icon">check_circle</i>My Tasks
            </li>
          </NavLink>
          <NavLink exact activeClassName="active-page" to="/patients">
            <li>
              <i className="material-icons icon">check_circle</i>Patients
            </li>
          </NavLink>
          <div className="sign-out" onClick={this.onLogoutClick}>
            <li>
              <i className="material-icons icon">arrow_back</i>Sign Out
            </li>
          </div>
        </ul>
        {patients.length > 0 && (
          <ul className="bottom">
            <li>
              <h4 className="side-projects-header">Patients</h4>
            </li>
            <div className="project-listings">{patientData}</div>
          </ul>
        )}
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  patients: state.patients
});

export default withRouter(
  connect(
    mapStateToProps,
    { logoutUser }
  )(SideNav)
);
