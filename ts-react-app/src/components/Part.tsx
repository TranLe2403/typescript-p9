import React from "react";
import { CoursePart } from "../App";

const Part = ({ courseParts }: { courseParts: CoursePart[] }): JSX.Element => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const renderPartHandler = courseParts.map((part) => {
    switch (part.type) {
      case "normal":
        return (
          <div>
            <div>
              <strong>
                {part.name} {part.exerciseCount}
              </strong>
            </div>
            <div>{part.description}</div>
            <br />
          </div>
        );
      case "groupProject":
        return (
          <div>
            <div>
              <strong>
                {part.name} {part.exerciseCount}
              </strong>
            </div>
            <div>Project exercises {part.groupProjectCount}</div>
            <br />
          </div>
        );
      case "submission":
        return (
          <div>
            <div>
              <strong>
                {part.name} {part.exerciseCount}
              </strong>
            </div>
            <div>{part.description}</div>
            <div>Submit to {part.exerciseSubmissionLink}</div>
            <br />
          </div>
        );
      case "special":
        return (
          <div>
            <div>
              <strong>
                {part.name} {part.exerciseCount}
              </strong>
            </div>
            <div>{part.description}</div>
            <div>
              Required skills: {part.requirements.map((skill) => <> {skill}</>)}
            </div>
            <br />
          </div>
        );

      default:
        return;
    }
  });

  return <div>{renderPartHandler}</div>;
};

export default Part;
