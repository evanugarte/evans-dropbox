import { Auth } from "aws-amplify";

// http://ec2-52-38-99-2.us-west-2.compute.amazonaws.com:4000/users/

export function addUserToRDS(id) {
  fetch(`http://ec2-52-38-99-2.us-west-2.compute.amazonaws.com:4000/users/add?id=${id}`)
    .catch((err) => { console.log(err) });
}


export async function getAuthInfo() {
  let x = await Auth.currentUserCredentials(); 
  return x.data.IdentityId;
}
