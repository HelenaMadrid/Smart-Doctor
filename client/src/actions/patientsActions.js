import axios from "axios";

import {
  CREATE_PATIENT,
  UPDATE_PATIENT,
  DELETE_PATIENT,
  GET_PATIENT,
  PATIENT_LOADING,
  GET_PATIENTS,
  PATIENTS_LOADING
} from "./types";

// Create Patient
export const createPatient = patientData => dispatch => {
  axios
    .post("/api/patients/create", patientData)
    .then(res =>
      dispatch({
        type: CREATE_PATIENT,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

// Update Patient
export const updatePatient = patientData => dispatch => {
  axios
    .patch("/api/patients/update", patientData)
    .then(res =>
      dispatch({
        type: UPDATE_PATIENT,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

// Delete Patient
export const deletePatient = id => dispatch => {
  axios
    .delete(`/api/patients/delete/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_PATIENT,
        payload: id
      })
    )
    .catch(err => console.log(err));
};

// Get specific patient by id
export const getPatient = id => dispatch => {
  dispatch(setPatientLoading());
  axios
    .get(`/api/patients/${id}`)
    .then(res =>
      dispatch({
        type: GET_PATIENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PATIENT,
        payload: null
      })
    );
};

// Get all patients for specific user
export const getPatients = () => dispatch => {
  dispatch(setPatientsLoading());
  axios
    .get("/api/patients")
    .then(res =>
      dispatch({
        type: GET_PATIENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PATIENTS,
        payload: null
      })
    );
};

// Patient loading
export const setPatientLoading = () => {
  return {
    type: PATIENT_LOADING
  };
};

// PATIENTs loading
export const setPatientsLoading = () => {
  return {
    type: PATIENTS_LOADING
  };
};
