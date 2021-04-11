import React from "react";
import Card from "semantic-ui-react/dist/commonjs/views/Card/Card";

import { HospitalEntry } from "../types";

const HospitalEntryCard = ({
  entry,
}: {
  entry: HospitalEntry;
}): JSX.Element => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date} <i className="first aid icon"></i>
        </Card.Header>
        <Card.Description>
          <p>{entry.description}</p>
          <i className="heart icon"></i>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default HospitalEntryCard;
