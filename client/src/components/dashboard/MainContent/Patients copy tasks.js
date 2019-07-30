import React, { Component } from "react";
import "./MainContent.scss";
import { connect } from "react-redux";

import Modal from "./Modal/Modal";

class Patients extends Component {
  state = {
    modal: false
  };

  toggleModal = e => {
    this.setState({ modal: !this.state.modal });
  };

  render() {
    const { patients } = this.props.patients;

    return (
      <div className="main-content">
        <h1 className="header">Your Patients</h1>
        <div className="projects">
          <div className="no-projects">
            <h1 className="header">You have no patients</h1>
            {patients.length > 0 ? (
              <p>Visit a project to create your first task</p>
            ) : (
              <button className="main-btn" onClick={this.toggleModal}>
                Create your first patient
              </button>
            )}
            <Modal onClose={this.toggleModal} modal={this.state.modal} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  patients: state.patients
});

export default connect(
  mapStateToProps,
  {}
)(Patients);
