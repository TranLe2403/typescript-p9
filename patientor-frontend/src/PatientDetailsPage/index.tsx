/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button } from "semantic-ui-react";
import Card from "semantic-ui-react/dist/commonjs/views/Card";

import { apiBaseUrl } from "../constants";
import { Entry, EntryWithoutId, Patient } from "../types";
import { useStateValue } from "../state";
import { addEntry, patientDetail } from "../state/reducer";

import HospitalEntryCard from "../components/HospitalEntryCard";
import OccupationalHealthEntryCard from "../components/OccupationalHealthEntryCard";
import HealthCareCheckEntryCard from "../components/HealthCareCheckEntryCard";
import AddEntryModal from "../AddEntryModal";

const PatientDetailsPage = (): JSX.Element => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  useEffect(() => {
    const isPatientInState = patients[id] !== undefined;

    if (isPatientInState && patients[id].ssn) return;

    const getPatientDetail = async () => {
      const patientDetailObj = await axios.get<Patient>(
        `${apiBaseUrl}/api/patients/${id}`
      );

      dispatch(patientDetail(patientDetailObj.data));
    };

    void getPatientDetail();
  }, [id]);

  const getGenderIcon = (gender: string | undefined): string => {
    switch (gender) {
      case "male":
        return "mars";
      case "female":
        return "venus";
      default:
        return "neuter";
    }
  };

  if (!patients[id]) return <div>Patient not found</div>;

  const entries = patients[id].entries;

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case "Hospital":
        return <HospitalEntryCard entry={entry} />;

      case "OccupationalHealthcare":
        return <OccupationalHealthEntryCard entry={entry} />;

      case "HealthCheck":
        return <HealthCareCheckEntryCard entry={entry} />;

      default:
        return assertNever(entry);
    }
  };

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submitNewEntry = async (values: any) => {
    try {
      let newObj: EntryWithoutId | undefined;

      switch (values.type) {
        case "HealthCheck":
          newObj = {
            description: values.description,
            date: values.date,
            specialist: values.specialist,
            diagnosisCodes: values.diagnosisCodes,
            type: values.type,
            healthCheckRating: values.healthCheckRating,
          };
          break;
        case "Hospital":
          newObj = {
            description: values.description,
            date: values.date,
            specialist: values.specialist,
            diagnosisCodes: values.diagnosisCodes,
            type: values.type,
            discharge: {
              date: values.dischargeDate,
              criteria: values.criteria,
            },
          };
          break;
        case "OccupationalHealthcare":
          newObj = {
            description: values.description,
            date: values.date,
            specialist: values.specialist,
            diagnosisCodes: values.diagnosisCodes,
            type: values.type,
            employerName: values.employerName,
            sickLeave: {
              startDate: values.sickLeaveStartDate,
              endDate: values.sickLeaveEndDate,
            },
          };
          break;
        default:
          break;
      }

      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/api/patients/${id}/entries`,
        newObj
      );

      dispatch(addEntry(newEntry, id));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || "Unknown Error");
      setError(e.response?.data?.error || "Unknown error");
    }
  };

  return (
    <div>
      <h2>
        {patients[id].name}
        <i className={`${getGenderIcon(patients[id].gender)} icon`}></i>
      </h2>
      <p>ssn: {patients[id].ssn}</p>
      <p>occupation: {patients[id].occupation}</p>
      <h3>Entries</h3>
      <Card.Group>
        {entries.map((entry) => (
          <EntryDetails entry={entry} key={entry.id} />
        ))}
      </Card.Group>

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />

      <Button onClick={() => openModal()}>Add New Patient</Button>
    </div>
  );
};

export default PatientDetailsPage;
