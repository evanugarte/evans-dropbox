import React from "react";
import { Container, Button, FormGroup, Input, Label } from "reactstrap";
import { handleSignIn } from "../backend/AuthFunctions";

class LoginView extends React.Component {

  state = {
    forms: [
      { name: "email", text: "Email" },
      { name: "password", text: "Password" }
    ],
    email: "",
    password: ""
  };

  updateLoginField = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  formEmpty = () => {
    return this.state.email.length && this.state.password.length;
  }

  handleSubmit = () => {
    console.log(this.state);
    
    let { email, password } = this.state;
    handleSignIn(email, password);
  }

  render() {
    return (
      <Container>
        <form onSubmit={(e) => { e.preventDefault() }}>
          {this.state.forms.map((x, index) => {
            return (
              <FormGroup key={index}>
                <Label>{x.text}</Label>
                <Input
                  autoFocus
                  name={x.name}
                  type={x.name}
                  onChange={this.updateLoginField}
                />
              </FormGroup>
            );
          })}
          <Button
            block
            disabled={!this.formEmpty}
            type="submit"
            onClick={this.handleSubmit}
          >
            Login
          </Button>
        </form>
      </Container>
    );
  }
}

export default LoginView;
