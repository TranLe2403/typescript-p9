import React from "react";

interface Course {
  name: string;
  exerciseCount: number;
}

const Total = ({ courseParts }: { courseParts: Course[] }): JSX.Element => {
  return (
    <div>
      <p>
        Number of exercises
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};

export default Total;
