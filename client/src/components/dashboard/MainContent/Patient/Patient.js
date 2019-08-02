import React, { Component } from "react";
import { connect } from "react-redux";
import { getPatient } from "../../../../actions/patientsActions";
// import { getTasks } from "../../../../actions/taskActions";

import Spinner from "../../../common/Spinner";
import Modal from "../Modal/Modal";

import "../MainContent.scss";
import "./Patient.scss";

class Patient extends Component {
  state = {
    modal: false,
    edit: false,
    name: "",
    age: "",
    height: "",
    weight: "",
    id: "",
    owner: {},
    date: ""
  };

  toggleModal = e => {
    this.setState({ modal: !this.state.modal, edit: false});
  };

  toggleEditModal = (name, id, owner, e) => {
    this.setState({
      modal: !this.state.modal,
      edit: !this.state.edit,
      name: name,
      id: id,
      owner: owner
    });
  };


  componentDidMount() {
    this.props.getPatient(this.props.match.params.patient);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.patient !== prevProps.match.params.patient) {
      this.props.getPatient(this.props.match.params.patient);
    }
  }


  render() {
  
    if (
      this.props.patient &&
      !this.props.patients.patientLoading
    ) {
      const { patient } = this.props;

      return (
        <div className="main-content">
          <h1 className="patient-header">{patient.name}</h1>
          <button
            onClick={this.toggleEditModal.bind(
              this,
              patient.name,
              patient._id,
              patient.owner
            )}
            className="main-btn center-btn"
          >
            Edit Patient Info
          </button>

          <div className="modal-wrapper">
            <Modal
              onClose={this.toggleModal}
              modal={this.state.modal}
              edit={this.state.edit}
              name={this.state.name}
              id={this.state.id}
              owner={this.state.owner}
            />
          </div>
          {/* <div className="tasks-container">
            <div className="patients-first-row">
              <button
                className="main-btn add-btn"
                onClick={this.toggleTaskModal}
              >
                Add task
              </button>
              <div className="projects-column-headers">
                <p>Assignee</p>
                <p>Due</p>
              </div>
            </div>
            <div className="project-tasks">{tasksList}</div>
          </div> */}
        </div>
      );
    }

    return (
      <div className="patient-spinner">
        <Spinner />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  patient: state.patients.patient,
  patients: state.patients
});

export default connect(
  mapStateToProps,
  { getPatient }
)(Patient);
