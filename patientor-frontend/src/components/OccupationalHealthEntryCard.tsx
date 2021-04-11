import React from "react";
import Card from "semantic-ui-react/dist/commonjs/views/Card";
import { OccupationalHealthcareEntry } from "../types";

const OccupationalHealthEntry = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}): JSX.Element => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date} <i className="stethoscope icon"></i> {entry.employerName}
        </Card.Header>
        <Card.Description>
          <p>{entry.description}</p>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default OccupationalHealthEntry;
