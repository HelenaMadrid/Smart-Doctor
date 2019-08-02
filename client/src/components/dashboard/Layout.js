import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { getProjects } from "../../actions/projectsActions";
import { getPatients } from "../../actions/patientsActions";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";

import Spinner from "../common/Spinner";
import SideNav from "./SideNav/SideNav";
import TopNav from "./TopNav/TopNav";
import Dashboard from "./MainContent/Dashboard";
// import Tasks from "./MainContent/Tasks";
//import Project from "./MainContent/Project/Project";
import Patient from "./MainContent/Patient/Patient";
import NotFound from "../404/404";

import "./Layout.scss";

class Layout extends Component {
  componentDidMount() {
    
    this.props.getPatients();
  }

  render() {
    const { patients, patientsLoading } = this.props.patients;

    let dashboardContent;

    if (patients === null || patientsLoading) {
      dashboardContent = <Spinner />;
    } else if (patients.length > 0) {
      dashboardContent = (
        <>
          <SideNav patients={patients} />
          <div className="right">
            <TopNav />
            <Switch>
              <Route
                exact
                path="/dashboard"
                patients={patients}
                component={Dashboard}
              />
              <Route
                exact
                path="/tasks"
                patients={patients}
              // component={Tasks}
              />
              <Route exact path="/patient/:patient" component={Patient} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </>
      );
    } else {
      dashboardContent = (
        <>
          <SideNav />
          <div className="right">
            <TopNav />
            <Switch>
              <Route
                exact
                path="/dashboard"
                patients={[]}
                component={Dashboard}
              />
              {/* <Route exact path="/tasks" component={Tasks} /> */}
              {/* <Route exact path="/patients" component={Patient} /> */}
              <Route component={NotFound} />
            </Switch>
          </div>
        </>
      );
    }

    return (
      <Router>
        <div className="wrapper">{dashboardContent}</div>
      </Router>
    );
  }
}

Layout.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  patients: state.patients
});

export default withRouter(
  connect(
    mapStateToProps,
    { getPatients }
  )(Layout)
);
