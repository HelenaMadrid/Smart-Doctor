import React, { Component } from "react";
import { connect } from "react-redux";
import {
  createPatient,
  updatePatient,
  deletePatient
} from "../../../../actions/patientsActions";
// import { createTask } from "../../../../actions/taskActions";

// import moment from "moment";

import "./Modal.scss";

class Modal extends Component {
  state = {
    patientName: "",
    age: "",
    height: "",
    weight: ""
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.edit) {
      this.setState({
        patientName: nextProps.name,
        age: nextProps.age,
        height: nextProps.height,
        weight: nextProps.weight
      });
    }
  }

  onChange = e => {
    // if (["name", "email"].includes(e.target.name)) {
    //   let members = [...this.state.members];
    //   members[e.target.dataset.id][e.target.name] = e.target.value;
    //   this.setState({ members });
    // } else {
      this.setState({ [e.target.id]: e.target.value });
    // }
  };

  // addMember = e => {
  //   this.setState(prevState => ({
  //     members: [...prevState.members, { name: "", email: "" }]
  //   }));
  // };

  // deleteMember = index => {
  //   let array = [...this.state.members];
  //   array.splice(index, 1);
  //   this.setState({ members: array });
  // };

  createPatient = () => {
    let patient = {
      patientName: this.state.patientName,
      age: this.state.age,
      height: this.state.height,
      weight: this.state.weight
    };

    this.props.createPatient(patient);
    this.onClose();
  };

  updatePatient = async id => {
    let patient = {
      id: this.props.id,
      patientName: this.state.patientName,
      age: this.state.age,
      height: this.state.height,
      weight: this.state.weight
    };

    await this.props.updatePatient(patient);

    this.onClose();
  };

  deletePatient = id => {
    this.props.deletePatient(id);
    this.onClose();
  };

  onClose = e => {
    this.props.onClose && this.props.onClose(e);
    this.setState({
      patientName: "",
      age: "",
      height: "",
      weight: "",
    });
  };

  onSelectChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  // createTask = e => {
  //   e.preventDefault();

  //   let fullDate =
  //     this.state.monthDue +
  //     "-" +
  //     this.state.dayDue +
  //     "-" +
  //     Date().split(" ")[3];

  //   let momentDate = moment(fullDate, "MM-DD-YYYY")
  //     ._d.toString()
  //     .split(" ");

  //   let finalDate = momentDate[1] + " " + momentDate[2];

  //   const data = {
  //     patient: this.props.projects.project._id,
  //     // taskName: this.state.taskName,
  //     assignee: this.state.assignee,
  //     dateDue: finalDate
  //   };

  //   this.props.createTask(data);

  //   this.onClose();
  // };

  render() {
    if (!this.props.modal) {
      return null;
    }

    document.onkeyup = e => {
      if (e.keyCode === 27 && this.props.modal) {
        this.onClose();
      }
    };

    // let { members } = this.state;

    // Create task modal
    // if (this.props.task) {
    //   const { teamMembers } = this.props.patients.patient;
    //   const { name, email } = this.props.auth.user;

    // Assignee dropdown in Modal
    // let membersOptions = teamMembers.map((member, index) => (
    //   <option key={index} value={member.email}>
    //     {member.name}
    //   </option>
    // ));

    // Due date dropdown in Modal
    // const MONTHS = new Array(12).fill(1);
    // const DAYS = new Array(31).fill(1);

    // let monthsOptions = MONTHS.map((month, i) => (
    //   <option key={i} value={i + 1}>
    //     {i < 9 && "0"}
    //     {i + 1}
    //   </option>
    // ));

    // let daysOptions = DAYS.map((day, i) => (
    //   <option key={i} value={i + 1}>
    //     {i < 9 && "0"}
    //     {i + 1}
    //   </option>
    // ));

    //   return (
    //     <form onSubmit={this.createTask} className="modal">
    //       <span className="close-modal" onClick={this.onClose}>
    //         &times;
    //       </span>
    //       <h1 className="header">Create task</h1>
    //       <div className="form-group">
    //         <label>
    //           <div className="form-label">Task Name (required)</div>
    //           <input
    //             required
    //             onChange={this.onChange}
    //             value={this.state.taskName}
    //             id="taskName"
    //             type="text"
    //             placeholder={"What is the task?"}
    //             className="form-input"
    //           />
    //         </label>
    //       </div>
    //       <div className="form-group">
    //         <div className="split">
    //           <label>
    //             <div className="form-label">Assignee</div>
    //             <select
    //               onChange={this.onSelectChange}
    //               value={this.state.assignee}
    //               id="assignee"
    //               type="text"
    //               className="form-input task-input-split"
    //             >
    //               <option disabled value="">
    //                 Select a teammate
    //               </option>
    //               <option value={email}>{name + " (You)"}</option>
    //               {membersOptions}
    //             </select>
    //           </label>
    //           <label>
    //             <div className="form-label">Due Date</div>
    //             <div className="split">
    //               <select
    //                 required={this.state.dayDue ? true : false}
    //                 onChange={this.onSelectChange}
    //                 value={this.state.monthDue}
    //                 id="monthDue"
    //                 type="text"
    //                 className="form-input task-input-split month-due"
    //               >
    //                 <option disabled value="">
    //                   Month
    //                 </option>
    //                 {monthsOptions}
    //               </select>
    //               <select
    //                 required={this.state.monthDue ? true : false}
    //                 onChange={this.onSelectChange}
    //                 value={this.state.dayDue}
    //                 id="dayDue"
    //                 type="text"
    //                 className="form-input task-input-split"
    //               >
    //                 <option disabled value="">
    //                   Day
    //                 </option>
    //                 {daysOptions}
    //               </select>
    //             </div>
    //           </label>
    //         </div>
    //       </div>
    //       <div>
    //         <button className="main-btn update-project" type="submit">
    //           Create Task
    //         </button>
    //       </div>
    //     </form>
    //   );
    // } else if (this.props.editTask) {
    //   const { teamMembers } = this.props.projects.project;
    //   const { name, email } = this.props.auth.user;

    //   // Assignee dropdown in Modal
    //   let membersOptions = teamMembers.map((member, index) => (
    //     <option key={index} value={member.email}>
    //       {member.name}
    //     </option>
    //   ));

    //   // Due date dropdown in Modal
    //   const MONTHS = new Array(12).fill(1);
    //   const DAYS = new Array(31).fill(1);

    //   let monthsOptions = MONTHS.map((month, i) => (
    //     <option key={i} value={i + 1}>
    //       {i < 9 && "0"}
    //       {i + 1}
    //     </option>
    //   ));

    //   let daysOptions = DAYS.map((day, i) => (
    //     <option key={i} value={i + 1}>
    //       {i < 9 && "0"}
    //       {i + 1}
    //     </option>
    //   ));

    //   return (
    //     <form onSubmit={this.createTask} className="modal">
    //       <span className="close-modal" onClick={this.onClose}>
    //         &times;
    //       </span>
    //       <h1 className="header">Edit task</h1>
    //       <div className="form-group">
    //         <label>
    //           <div className="form-label">Task Name (required)</div>
    //           <input
    //             required
    //             onChange={this.onChange}
    //             value={this.state.taskName}
    //             id="taskName"
    //             type="text"
    //             placeholder={"What is the task?"}
    //             className="form-input"
    //           />
    //         </label>
    //       </div>
    //       <div className="form-group">
    //         <div className="split">
    //           <label>
    //             <div className="form-label">Assignee</div>
    //             <select
    //               onChange={this.onSelectChange}
    //               value={this.state.assignee}
    //               id="assignee"
    //               type="text"
    //               className="form-input task-input-split"
    //             >
    //               <option disabled value="">
    //                 Select a teammate
    //               </option>
    //               <option value={email}>{name + " (You)"}</option>
    //               {membersOptions}
    //             </select>
    //           </label>
    //           <label>
    //             <div className="form-label">Due Date</div>
    //             <div className="split">
    //               <select
    //                 required={this.state.dayDue ? true : false}
    //                 onChange={this.onSelectChange}
    //                 value={this.state.monthDue}
    //                 id="monthDue"
    //                 type="text"
    //                 className="form-input task-input-split month-due"
    //               >
    //                 <option disabled value="">
    //                   Month
    //                 </option>
    //                 {monthsOptions}
    //               </select>
    //               <select
    //                 required={this.state.monthDue ? true : false}
    //                 onChange={this.onSelectChange}
    //                 value={this.state.dayDue}
    //                 id="dayDue"
    //                 type="text"
    //                 className="form-input task-input-split"
    //               >
    //                 <option disabled value="">
    //                   Day
    //                 </option>
    //                 {daysOptions}
    //               </select>
    //             </div>
    //           </label>
    //         </div>
    //       </div>
    //       <div>
    //         <button className="main-btn update-project" type="submit">
    //           Create Task
    //         </button>
    //       </div>
    //     </form>
    //   );
    // }

    // Edit project modal
    if (this.props.edit) {
      return (
        <div className="modal">
          <span className="close-modal" onClick={this.onClose}>
            &times;
          </span>
          <h1 className="header">Edit Patient Info</h1>
          <p className="created-by">
            Created by {this.props.owner.name} ({this.props.owner.email})
          </p>
          <div className="form-group">
            <label>
              <div className="form-label">Patient Name (required)</div>
              <input
                onChange={this.onChange}
                value={this.state.patientName}
                id="patientName"
                type="text"
                placeholder={"My patient name"}
                className="form-input"
              />
            </label>
          </div>
          
          <div>
            <button
              className="main-btn update-patient"
              onClick={this.updatePatient.bind(this, this.props.id)}
            >
              Update Patient
            </button>
            {this.props.owner.id === this.props.auth.user.id ? (
              <button
                className="main-btn delete-project"
                onClick={this.deletePatient.bind(this, this.props.id)}
              >
                Delete Patient
              </button>
            ) : null}
          </div>
        </div>
      );
    }

    // Create patient modal
    else
      return (
        <div className="modal">
          <span className="close-modal" onClick={this.onClose}>
            &times;
          </span>
          <h1 className="header">Create a patient</h1>
          <div className="form-group">
            <label>
              <div className="form-label">Patient (required)</div>
              <input
                onChange={this.onChange}
                value={this.state.patientName}
                id="patientName"
                type="text"
                placeholder="My patient name"
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <div className="form-label">age</div>
              <input
                onChange={this.onChange}
                value={this.state.age}
                id="age"
                type="number"
                placeholder="patient age"
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <div className="form-label">height</div>
              <input
                onChange={this.onChange}
                value={this.state.height}
                id="height"
                type="number"
                placeholder="patient height"
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <div className="form-label">weight</div>
              <input
                onChange={this.onChange}
                value={this.state.weight}
                id="weight"
                type="number"
                placeholder="patient weight"
                className="form-input"
              />
            </label>
          </div>
          <div>
            <button
              className="main-btn create-patient"
              onClick={this.createPatient}
            >
              Create Patient
            </button>
          </div>
        </div>
      );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  patients: state.patients
});

export default connect(
  mapStateToProps,
  { createPatient, updatePatient, deletePatient }
)(Modal);
