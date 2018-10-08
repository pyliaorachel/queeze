import React from 'react';
import { Alert as AlertComp } from 'react-bootstrap';

function Alert(props) {
  return (
    (props.message === '') ? 
      null
    :
      <AlertComp variant={props.variant}>{props.message}</AlertComp>
  );
}

export default Alert;
