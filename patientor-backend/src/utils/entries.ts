import { HealthCheckRating, EntryWithoutId } from "../types/Patient";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (str: unknown): string => {
  if (!str || !isString(str)) {
    throw new Error("Incorrect or missing name" + str);
  }

  return str;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error("Incorrect or missing date: " + dateOfBirth);
  }
  return dateOfBirth;
};

const parseArray = (arr: unknown[]): string[] => {
  const newArr = arr.map((item) => {
    if (!isString(item)) {
      throw new Error("Incorrect code");
    } else return item;
  });

  return newArr;
};

type HealthType = "HealthCheck" | "Hospital" | "OccupationalHealthcare";

const isHealthType = (type: unknown): type is HealthType => {
  return (
    type === "HealthCheck" ||
    type === "Hospital" ||
    type === "OccupationalHealthcare"
  );
};

const parseType = (type: unknown): HealthType => {
  if (!type || !isHealthType(type)) {
    throw new Error("Incorrect or missing type of entry" + type);
  }

  return type;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  if (isNaN(param)) {
    throw new Error("Rating is not a valid number");
  }

  return Object.values(HealthCheckRating).includes(Number(param));
};

const parseHealthCheckRating = (rate: unknown): HealthCheckRating => {
  if (rate === undefined || !isHealthCheckRating(rate)) {
    throw new Error("Incorrect or missing HealthCheckRating: " + rate);
  }

  return rate;
};

type SickLeave = {
  startDate: string;
  endDate: string;
};

const parseSickLeave = (
  startDate: unknown,
  endDate: unknown
): SickLeave | undefined => {
  if (
    !startDate ||
    !endDate ||
    !isString(startDate) ||
    !isString(endDate) ||
    !isDate(startDate) ||
    !isDate(endDate)
  ) {
    throw new Error("Incorrect sick leave");
  }
  return { startDate, endDate };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewEntry = (object: any): EntryWithoutId => {
  const validType = parseType(object.type);

  const newEntry = {
    description: parseString(object.description),
    date: parseDate(object.date),
    specialist: parseString(object.specialist),
    diagnosisCodes: object.diagnosisCodes
      ? parseArray(object.diagnosisCodes)
      : undefined,
  };

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (validType) {
    case "HealthCheck":
      return {
        ...newEntry,
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };

    case "Hospital":
      return {
        ...newEntry,
        type: "Hospital",
        discharge: {
          date: parseDate(object.discharge.date),
          criteria: parseString(object.discharge.criteria),
        },
      };

    case "OccupationalHealthcare":
      return {
        ...newEntry,
        type: "OccupationalHealthcare",
        employerName: parseString(object.employerName),
        sickLeave:
          object.sickLeave.startDate && object.sickLeave.endDate
            ? parseSickLeave(
                object.sickLeave.startDate,
                object.sickLeave.endDate
              )
            : undefined,
      };

    default:
      return assertNever(validType);
  }
};

export default toNewEntry;
