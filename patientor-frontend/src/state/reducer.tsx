import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "UPDATE_PATIENT_DETAIL";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      payload: { newEntry: Entry; patientId: string };
    };

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientListFromApi,
  };
};

export const setDiagnoseList = (diagnoseListFromApi: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnoseListFromApi,
  };
};

export const addPatient = (newPatient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: newPatient,
  };
};

export const patientDetail = (patient: Patient): Action => {
  return {
    type: "UPDATE_PATIENT_DETAIL",
    payload: patient,
  };
};

export const addEntry = (newEntry: Entry, patientId: string): Action => {
  return {
    type: "ADD_ENTRY",
    payload: { newEntry, patientId },
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.diagnosis,
        },
      };

    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "UPDATE_PATIENT_DETAIL":
      if (
        JSON.stringify(action.payload) ===
        JSON.stringify(state.patients[action.payload.id])
      ) {
        return state;
      }

      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "ADD_ENTRY":
      const targetPatientEntries = state.patients[action.payload.patientId];
      targetPatientEntries.entries.push(action.payload.newEntry);
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.patientId]: targetPatientEntries,
        },
      };

    default:
      return state;
  }
};
