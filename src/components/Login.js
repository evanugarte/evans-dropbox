import React, { useState } from "react";
import {
  Container,
  Button,
  FormGroup,
  Input,
  Label,
  Spinner
} from "reactstrap";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { Auth } from "aws-amplify";
import { checkIfUserExists, addUserToRDS } from "../backend/RDSFunctions";
import { getAuthInfo } from "../backend/AuthFunctions";
import md5 from "md5";
import config from "../backend/config";

function LoginView(props) {
  const [email, setEmail] = useState("");
  const [modalShown, setModalShown] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const forms = [
    { text: "Email", name: "email", callback: setEmail },
    { text: "Password", name: "password", callback: setPassword }
  ];

  async function handleSignIn() {
    setLoading(true);
    try {
      await Auth.signIn(email, password);
      props.setAuthenticated(true);
      alert("Logged in");
      props.history.push("/");
    } catch (e) {
      alert(e.message);
      setLoading(false);
    }
  }

  async function handleFacebookLogin(response) {
    const { error, name, userID, accessToken, expiresIn } = response;
    const userEmail = response.email;
    console.log(error, name, userEmail, userID);

    if (!error) {
      if (name && userEmail && userID) {
        try {
          await Auth.federatedSignIn("facebook",
            { accessToken, expiresIn: (expiresIn * 1000 + new Date().getTime()) }
          );
          await handleNewSocialMediaSignIn({
            userFirstName: name.substr(0, name.indexOf(' ')),
            userLastName: name.substr(name.indexOf(' ') + 1),
            userEmail: userEmail,
            password: "X!" + md5(userID)
          });
        } catch (error) {
          alert("Could not sign in with facebook.")
        }
      } else {
        alert("Could not sign in with facebook.");
      }
    }
    console.log("facebook");
    console.log(response);
  }

  async function handleGoogleLogin(response) {
    if (!response.error) {
      try {
        await Auth.federatedSignIn(
          "google", {
          accessToken: response.accessToken.toString(),
          expiresIn: (response.Zi.expires_in * 1000 + new Date().getTime())
        });
        await handleNewSocialMediaSignIn({
          userFirstName: response.profileObj.givenName,
          userLastName: response.profileObj.familyName,
          userEmail: response.profileObj.email,
          password: "X!" + md5(response.El)
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function handleNewSocialMediaSignIn(data) {
    setModalShown(false);
    if (!await checkIfUserExists(data.password)) {
      console.log("user doesnt exist.");
      console.log(data.password, data.userFirstName, data.userLastName, data.userEmail);
      // await Auth.signUp({
      //   username: data.userEmail,
      //   password: data.password
      // });
      const newUser = {
        userId: await getAuthInfo(),
        firstName: data.userFirstName,
        lastName: data.userLastName
      };
      await addUserToRDS(newUser);
      props.history.push("/");
      props.setAuthenticated(true);
    } else {
      console.log("user exists.");

    }
    // const newUser = {
    //   userId: userId,
    //   firstName: firstName,
    //   lastName: lastName
    // };
    // await addUserToRDS(newUser);
    // props.setAuthenticated(true);
    // props.history.push("/");
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
          disabled={!formEmpty() || loading}
          type="submit"
          onClick={() => handleSignIn(email, password)}
        >
          {loading ? <Spinner color="primary" /> : "Login"}
        </Button>
      </form>
      <br />
      <GoogleLogin
        clientId={config.social.Google}
        buttonText="Login"
        onSuccess={handleGoogleLogin}
        onFailure={handleGoogleLogin}
        cookiePolicy={'single_host_origin'}
      />
      <br />
      <FacebookLogin
        appId={config.social.FB}
        autoLoad={true}
        fields="name,email"
        callback={handleFacebookLogin} />
      <br />
      <a href="signup">New user? Sign up here!</a>
    </Container>
  );
}

export default LoginView;
