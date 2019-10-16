import { Auth } from "aws-amplify";

export async function handleSignIn(email, password) {
  try {
    await Auth.signIn(email, password);
    alert("Logged in");
  } catch (e) {
    alert(e.message);
  }
}

export async function handleLogout() {
  await Auth.signOut();
}

export async function getAuthStatus() {
  try {
    await Auth.currentSession();
    return true;
  }
  catch (e) {
    if (e !== 'No current user') {
      alert(e);
    }
  }
  return false;
}
