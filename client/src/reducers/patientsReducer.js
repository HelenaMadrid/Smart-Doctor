import {
  CREATE_PATIENT,
  UPDATE_PATIENT,
  DELETE_PATIENT,
  GET_PATIENT,
  PATIENT_LOADING,
  GET_PATIENTS,
  PATIENTS_LOADING
} from "../actions/types";

const initialState = {
  patients: [],
  patient: [],
  patientLoading: false,
  patientsLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_PATIENT:
      return {
        ...state,
        patients: [action.payload, ...state.patients]
      };
    case UPDATE_PATIENT:
      let index = state.patients.findIndex(
        patient => patient._id === action.payload._id
      );

      state.patients.splice(index, 1);

      return {
        ...state,
        patients: [action.payload, ...state.patients]
      };
    case DELETE_PATIENT:
      return {
        ...state,
        patients: state.patients.filter(
          patient => patient._id !== action.payload
        )
      };
    case GET_PATIENT:
      return {
        ...state,
        patient: action.payload,
        patientLoading: false
      };
    case GET_PATIENTS:
      return {
        ...state,
        patients: action.payload,
        patientsLoading: false
      };
    case PATIENT_LOADING:
      return {
        ...state,
        patientLoading: true
      };
    case PATIENTS_LOADING:
      return {
        ...state,
        patientsLoading: true
      };
    default:
      return state;
  }
}
