"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Patient_1 = require("../types/Patient");
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
const parseString = (str) => {
    if (!str || !isString(str)) {
        throw new Error("Incorrect or missing name");
    }
    return str;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (dateOfBirth) => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error("Incorrect or missing date: " + dateOfBirth);
    }
    return dateOfBirth;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param) => {
    return Object.values(Patient_1.Gender).includes(param);
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error("Incorrect or missing weather: " + gender);
    }
    return gender;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatient = (object) => {
    const newEntry = {
        name: parseString(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseString(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation),
        entries: [],
    };
    return newEntry;
};
exports.default = toNewPatient;
