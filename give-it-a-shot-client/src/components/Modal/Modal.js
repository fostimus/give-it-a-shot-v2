import React, { useState, useEffect } from "react";
import { default as BSModal } from "react-bootstrap/Modal";

export function Modal(props) {
  const [show, setShow] = useState(false);

  const toggleShow = () => setShow(!show);

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

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
    </BSModal>
  );
}
