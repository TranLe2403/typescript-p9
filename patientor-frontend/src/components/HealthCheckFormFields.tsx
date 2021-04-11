import React from "react";
import { Field } from "formik";

import { NumberField } from "../AddPatientModal/FormField";

export const HealthCheckFormFields = (): JSX.Element => {
  return (
    <Field
      label="HealthCheckRating"
      name="healthCheckRating"
      component={NumberField}
      min={0}
      max={3}
    />
  );
};

export default HealthCheckFormFields;
