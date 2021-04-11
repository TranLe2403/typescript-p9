import React from "react";
import Card from "semantic-ui-react/dist/commonjs/views/Card";

import { HealthCheckEntry } from "../types";

const HealthCareCheckEntry = ({
  entry,
}: {
  entry: HealthCheckEntry;
}): JSX.Element => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date} <i className="user md icon"></i>
        </Card.Header>
        <Card.Description>
          <p>{entry.description}</p>
          <i className="heart icon"></i>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default HealthCareCheckEntry;
