"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-call */
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const getEntries = () => {
    return patients_1.default;
};
const getNonSensitiveEntries = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
    }));
};
const addPatient = (newPatient) => {
    const newPatientObj = Object.assign({ id: uuid_1.v1() }, newPatient);
    patients_1.default.push(newPatientObj);
    return newPatientObj;
};
const findById = (id) => {
    const entry = patients_1.default.find((d) => d.id === id);
    return entry;
};
const addEntry = (patientId, entry) => {
    const newEntry = Object.assign({ id: uuid_1.v1() }, entry);
    const patientIndex = patients_1.default.findIndex((patient) => patient.id === patientId);
    patients_1.default[patientIndex].entries.push(newEntry);
    return newEntry;
};
exports.default = {
    getEntries,
    getNonSensitiveEntries,
    addPatient,
    findById,
    addEntry,
};
