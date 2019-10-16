import React, { useState } from "react";
import { Container, Button, FormGroup, Input, Label } from "reactstrap";
import { Auth } from "aws-amplify";

function LoginView(props) {
  console.log("inside login wassup", props);
  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const forms = [
    { text: "Email", name: "email", callback: setEmail },
    { text: "Password", name: "password", callback: setPassword }
  ];

  async function handleSignIn() {

    try {
      await Auth.signIn(email, password);
      props.setAuthenticated(true);
      alert("Logged in");
    } catch (e) {
      alert(e.message);
    }
  }

  function formEmpty() {
    return email.length && password.length;
  }

  return (
    <Container>
      <form onSubmit={(e) => { e.preventDefault() }}>
        {forms.map((x, index) => {
          return (
            <FormGroup key={index}>
              <Label>{x.text}</Label>
              <Input
                autoFocus
                name={x.name}
                type={x.name}
                onChange={(e) => x.callback(e.target.value)}
              />
            </FormGroup>
          );
        })}
        <Button
          block
          disabled={!formEmpty()}
          type="submit"
          onClick={() => handleSignIn(email, password)}
        >
          Login
          </Button>
      </form>
    </Container>
  );
}

export default LoginView;
