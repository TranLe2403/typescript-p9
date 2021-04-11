import React from "react";
import { Field } from "formik";

import { TextField } from "../AddPatientModal/FormField";

export const HospitalFormFields = (): JSX.Element => {
  return (
    <>
      <Field
        label="Discharge Date"
        placeholder="YYYY-MM-DD"
        name="dischargeDate"
        component={TextField}
      />
      <Field
        label="Criteria"
        placeholder="Criteria"
        name="criteria"
        component={TextField}
      />
    </>
  );
};

export default HospitalFormFields;
