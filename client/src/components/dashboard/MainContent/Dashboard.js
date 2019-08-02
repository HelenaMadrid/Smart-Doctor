import React, { Component } from "react";
import "./MainContent.scss";
import "./Dashboard.scss";

import { connect } from "react-redux";

import Modal from "./Modal/Modal";

class Dashboard extends Component {
  state = {
    modal: false,
    edit: false,
    name: "",
    age: "",
    // height: "",
    // weight: "",
    // notes: "",
    id: "",
    owner: {}
  };

  toggleModal = e => {
    this.setState({ modal: !this.state.modal, edit: false });
  };

  toggleEditModal = (name, age, id, owner, e) => {
    e.stopPropagation();

    this.setState({
      modal: !this.state.modal,
      edit: !this.state.edit,
      name: name,
      age: age,
      id: id,
      owner: owner
    });
  };

  render() {
   const { patients } = this.props.patients;

     let content;

    let patientData = patients.sort().map(patient => (
      <div
        key={patient._id}
        className="patient-icon"
        onClick={() => this.props.history.push(`/patients/${patient._id}`)}
      >
        <div className="patient-name">{patient.name}</div>
         <div
          className="patient-info-button"
          onClick={this.toggleEditModal.bind(
            this,
            patient.name,
            patient.age,
            //patient.weight,
            //patient.height,
            patient._id,
            patient.owner
          )}
        >
          Edit patient
        </div>
        <div className="patient-info-button">Go to patient</div>
      </div>
     ));

    if (patients.length > 0) {
      // At least one patient
      content = (
        <>
          <button className="main-btn" onClick={this.toggleModal}>
            Create another patient
          </button>
          <div className="modal-wrapper">
            <Modal
              onClose={this.toggleModal}
              modal={this.state.modal}
              edit={this.state.edit}
              name={this.state.name}
              age={this.state.age}
              id={this.state.id}
              owner={this.state.owner}
            />
          </div>
          <div className="patients-wrapper">{patientData}</div> 
        </>
      );
    } else {
      // No patients
      content = (
        <>
          <div className="patients">
            <div className="no-patients">
              <h1 className="header">You have no patients</h1>
              <button className="main-btn" onClick={this.toggleModal}>
                Create your first patient
              </button>
              <div className="modal-wrapper">
                <Modal onClose={this.toggleModal} modal={this.state.modal} />
              </div>
            </div>
          </div>
        </>
      );
    }

    return (
      <div className="main-content">
        <h1 className="header">Your patients</h1>
       {content}
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
)(Dashboard);
