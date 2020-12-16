import React, { useState, useEffect } from "react";
import { default as BSModal } from "react-bootstrap/Modal";
import { ButtonLink } from "../Button";

export function Modal(props) {
  const [show, setShow] = useState(false);

  const toggleShow = () => setShow(!show);

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  const buttons = props.buttons
    ? props.buttons.map(button => (
        <ButtonLink variant="primary" text={button.text} path={button.path} />
      ))
    : null;

  console.log(buttons);

  const footer = buttons ? <BSModal.Footer>{buttons}</BSModal.Footer> : null;

  return (
    <BSModal
      show={show}
      onHide={() => {
        toggleShow();
        props.setModalToggled(false);
      }}
    >
      <BSModal.Header closeButton>
        <BSModal.Title>{props.title}</BSModal.Title>
      </BSModal.Header>
      <BSModal.Body>{props.body}</BSModal.Body>
      {footer}
    </BSModal>
  );
}
