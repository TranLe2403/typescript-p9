/* eslint-disable @typescript-eslint/no-unsafe-call */
import patients from "../../data/patients";
import {
  Patient,
  NonSensitivePatient,
  NewPatient,
  EntryWithoutId,
  Entry,
} from "../types/Patient";
import { v1 as uuid } from "uuid";

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const addPatient = (newPatient: NewPatient): Patient => {
  const newPatientObj = {
    id: uuid(),
    ...newPatient,
  };

  patients.push(newPatientObj);
  return newPatientObj;
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find((d) => d.id === id);
  return entry;
};

const addEntry = (patientId: string, entry: EntryWithoutId): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };

  const patientIndex = patients.findIndex((patient) => patient.id === patientId);

  patients[patientIndex].entries.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById,
  addEntry,
};
