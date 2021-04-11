import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import {
  TextField,
  DiagnosisSelection,
  SelectField,
  Options,
} from "../AddPatientModal/FormField";
import { HealthCheckRating } from "../types";
import { useStateValue } from "../state";
import HealthCheckFormFields from "../components/HealthCheckFormFields";
import HospitalFormFields from "../components/HospitalFormFields";
import OccupationalHealthcareFormFields from "../components/OccupationalHealthcareFormFields";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */

interface Props {
  onSubmit: (values: unknown) => void;
  onCancel: () => void;
}

const typeOptions: Options[] = [
  { value: "HealthCheck", label: "Health Check" },
  { value: "Hospital", label: "Hospital" },
  {
    value: "OccupationalHealthcare",
    label: "OccupationalHealthcare",
  },
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props): JSX.Element => {
  const [{ diagnosis }] = useStateValue();

  const additionalFields = (type: string) => {
    switch (type) {
      case "HealthCheck":
        return <HealthCheckFormFields />;

      case "Hospital":
        return <HospitalFormFields />;

      case "OccupationalHealthcare":
        return <OccupationalHealthcareFormFields />;

      default:
        break;
    }
  };

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [""],
        type: "HealthCheck",
        healthCheckRating: 0,
        dischargeDate: "",
        criteria: "",
        employerName: "",
        sickLeaveStartDate: "",
        sickLeaveEndDate: "",
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};

        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }

        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }

        if (values.type === "HealthCheck") {
          if (
            isNaN(values.healthCheckRating) ||
            values.healthCheckRating.toString() === ""
          ) {
            errors.healthCheckRating = requiredError;
          }

          const isValidHealthCheckRatingValue = Object.values(
            HealthCheckRating
          ).includes(Number(values.healthCheckRating));
          if (!isValidHealthCheckRatingValue) {
            errors.healthCheckRating =
              "Health Check Rating must be a number between 0 and 3";
          }
        }

        if (values.type === "Hospital") {
          if (!values.dischargeDate) {
            errors.dischargeDate = requiredError;
          }
          if (!values.criteria) {
            errors.criteria = requiredError;
          }
        }

        if (values.type === "OccupationalHealthcare") {
          if (!values.employerName) {
            errors.employerName === requiredError;
          }
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              diagnoses={Object.values(diagnosis)}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <SelectField label="Type" name="type" options={typeOptions} />

            {additionalFields(values.type)}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
