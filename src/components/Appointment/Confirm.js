import React from "react";
import Button from "components/Button";


export default function confirm(props) {

  const { cancelInterview, onCancel} = props


  return (<main className="appointment__card appointment__card--confirm">
  <h1 className="text--semi-bold">DELETE?</h1>
  <section className="appointment__actions">
    <Button onClick={onCancel} danger>Cancel</Button>
    <Button onClick={cancelInterview} danger>Confirm</Button>
  </section>
</main>);
}