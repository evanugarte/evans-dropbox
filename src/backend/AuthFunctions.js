import { Auth } from "aws-amplify";

export async function handleSignIn(email, password) {
  try {
    await Auth.signIn(email, password);
    alert("Logged in");
  } catch (e) {
    alert(e.message);
  }
}
