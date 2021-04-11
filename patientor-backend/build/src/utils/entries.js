"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Patient_1 = require("../types/Patient");
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
const parseString = (str) => {
    if (!str || !isString(str)) {
        throw new Error("Incorrect or missing name" + str);
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
const parseArray = (arr) => {
    const newArr = arr.map((item) => {
        if (!isString(item)) {
            throw new Error("Incorrect code");
        }
        else
            return item;
    });
    return newArr;
};
const isHealthType = (type) => {
    return (type === "HealthCheck" ||
        type === "Hospital" ||
        type === "OccupationalHealthcare");
};
const parseType = (type) => {
    if (!type || !isHealthType(type)) {
        throw new Error("Incorrect or missing type of entry" + type);
    }
    return type;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param) => {
    if (isNaN(param)) {
        throw new Error("Rating is not a valid number");
    }
    return Object.values(Patient_1.HealthCheckRating).includes(Number(param));
};
const parseHealthCheckRating = (rate) => {
    if (rate === undefined || !isHealthCheckRating(rate)) {
        throw new Error("Incorrect or missing HealthCheckRating: " + rate);
    }
    return rate;
};
const parseSickLeave = (startDate, endDate) => {
    if (!startDate ||
        !endDate ||
        !isString(startDate) ||
        !isString(endDate) ||
        !isDate(startDate) ||
        !isDate(endDate)) {
        throw new Error("Incorrect sick leave");
    }
    return { startDate, endDate };
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewEntry = (object) => {
    const validType = parseType(object.type);
    const newEntry = {
        description: parseString(object.description),
        date: parseDate(object.date),
        specialist: parseString(object.specialist),
        diagnosisCodes: object.diagnosisCodes
            ? parseArray(object.diagnosisCodes)
            : undefined,
    };
    const assertNever = (value) => {
        throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
    };
    switch (validType) {
        case "HealthCheck":
            return Object.assign(Object.assign({}, newEntry), { type: "HealthCheck", healthCheckRating: parseHealthCheckRating(object.healthCheckRating) });
        case "Hospital":
            return Object.assign(Object.assign({}, newEntry), { type: "Hospital", discharge: {
                    date: parseDate(object.discharge.date),
                    criteria: parseString(object.discharge.criteria),
                } });
        case "OccupationalHealthcare":
            return Object.assign(Object.assign({}, newEntry), { type: "OccupationalHealthcare", employerName: parseString(object.employerName), sickLeave: object.sickLeave.startDate && object.sickLeave.endDate
                    ? parseSickLeave(object.sickLeave.startDate, object.sickLeave.endDate)
                    : undefined });
        default:
            return assertNever(validType);
    }
};
exports.default = toNewEntry;
