import React from "react";

const Header = ({ header }: { header: string }): JSX.Element => {
  return (
    <div>
      <h1>{header}</h1>
    </div>
  );
};

export default Header;
