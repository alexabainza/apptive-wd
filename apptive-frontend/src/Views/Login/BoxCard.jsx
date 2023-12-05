// boxCard.jsx

import React from "react";
import { Card as BootstrapCard } from "react-bootstrap";

const BoxCard = ({ icon, text }) => {
  return (
    <BootstrapCard>
      <BootstrapCard.Body>
        <img src={icon} />
        <h5 className="card-title">{text}</h5>
      </BootstrapCard.Body>
    </BootstrapCard>
  );
};

export default BoxCard;
