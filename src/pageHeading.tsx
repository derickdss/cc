import React from "react";

export const SubHeading: React.FC<{ subtitle: string }> = ({ subtitle }) => (
  <div style={{ paddingLeft: "30px", width: "80%" }}>
    <h1
      style={{
        textAlign: "left",
        color: "grey",
        borderBottom: "1px solid grey",
        paddingBottom: "20px",
        paddingLeft: "20px",
        marginTop: "50px",
        marginBottom: "30px",
      }}
    >
      {subtitle}
    </h1>
  </div>
);

const Heading: React.FC<{ backgroundImage: string; title: string }> = ({
  backgroundImage,
  title,
}) => (
  <div
    style={{
      backgroundImage: `url(${backgroundImage})`,
      height: "170px",
      textAlign: "center",
    }}
  >
    <h1 style={{ color: "white", paddingTop: "48px" }}>{title}</h1>
  </div>
);

export default Heading;
