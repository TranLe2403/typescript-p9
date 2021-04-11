import React from "react";
import { Field } from "formik";

import { TextField } from "../AddPatientModal/FormField";

export const OccupationalHealthcareFormFields = (): JSX.Element => {
  return (
    <>
      <Field
        label="Employer Name"
        placeholder="Employer Name"
        name="employerName"
        component={TextField}
      />
      <Field
        label="Start Date"
        placeholder="YYYY-MM-DD"
        name="sickLeaveStartDate"
        component={TextField}
      />

      <Field
        label="End Date"
        placeholder="YYYY-MM-DD"
        name="sickLeaveEndDate"
        component={TextField}
      />
    </>
  );
};

export default OccupationalHealthcareFormFields;
