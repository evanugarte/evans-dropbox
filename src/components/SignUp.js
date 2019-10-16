import React, { useState } from "react";
import {
  Container,
  Label,
  Button,
  FormGroup,
  Input,
  Spinner
} from "reactstrap";
import { Auth } from "aws-amplify";

export default function Signup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [newUser, setNewUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const forms = [
    { text: "Email", type: "email", callback: setEmail },
    { text: "Password", type: "password", callback: setPassword },
    { text: "Confirm Password", type: "password", callback: setPasswordConfirm }
  ];

  function validateForm() {
    return (
      email.length > 0 &&
      password.length > 0 &&
      password === passwordConfirm
    );
  }

  function validateConfirmationForm() {
    return confirmationCode.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);

    try {
      const newUser = await Auth.signUp({
        username: email,
        password: password
      });
      setLoading(false);
      setNewUser(newUser);
    } catch (e) {
      alert(e.message);
      setLoading(false);
    }

    setNewUser("test");

    setLoading(false);
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      await Auth.confirmSignUp(email, confirmationCode);
      await Auth.signIn(email, password);

      props.setAuthenticated(true);
      props.history.push("/");
    } catch (e) {
      alert(e.message);
      setLoading(false);
    }
  }

  function renderConfirmationForm() {
    return (
      <form onSubmit={handleConfirmationSubmit}>
        <FormGroup>
          <Label>Confirmation Code</Label>
          <Input
            autoFocus
            type="tel"
            onChange={setConfirmationCode}
            value={confirmationCode}
          />
          <Label>Please check your email for the code.</Label>
        </FormGroup>
        <Button
          block
          disabled={!validateConfirmationForm()}
          type="submit"
        >
          {loading ? <Spinner color="primary" /> : "Login"}
        </Button>
      </form>
    );
  }

  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        {forms.map((x, index) => {
          return (
            <FormGroup key={index}>
              <Label>{x.text}</Label>
              <Input
                autoFocus
                type={x.type}
                onChange={(e) => x.callback(e.target.value)}
              />
            </FormGroup>
          );
        })}
        <Button
          block
          disabled={!validateForm()}
          type="submit"
        >
          {loading ? <Spinner color="primary" /> : "Login"}
        </Button>
      </form>
    );
  }

  return (
    <Container>
      {newUser === null ? renderForm() : renderConfirmationForm()}
      <br />
      <a href="login">Existing account? Log in here!</a>
    </Container>
  );
}
