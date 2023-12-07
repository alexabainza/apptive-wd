import React from "react";
import { Card as BootstrapCard } from "react-bootstrap";

const BoxCard = ({ icon, text }) => {
  return (
    <BootstrapCard className="cardcont">
      <BootstrapCard.Body className="cardbody">
        <img className="icon" src={icon} />
        <h5 className="card-title">{text}</h5>
      </BootstrapCard.Body>
    </BootstrapCard>
  );
};

export default BoxCard;