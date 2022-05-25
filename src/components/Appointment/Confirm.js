import React from "react";
import Button from "components/Button";


export default function confirm(props) {
  return (<main className="appointment__card appointment__card--confirm">
  <h1 className="text--semi-bold">{props.children}</h1>
  <section className="appointment__actions">
    <Button onClick={props.onCancel} danger>Cancel</Button>
    <Button onClick={props.onConfirm} danger>Confirm</Button>
  </section>
</main>);
}