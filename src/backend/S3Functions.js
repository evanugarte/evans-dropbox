import { Storage } from "aws-amplify";


///////// FUNCTIONS /////////
export async function handleS3Upload(userId, file) {
  console.log(userId);
  
  const filename = `${Date.now()}-${file.name}`;

  const s3Response = await Storage.put(filename, file, {
    contentType: file.type
  });

  console.log(s3Response);
  return s3Response.key;
}

export async function getObjects() {
  return await Storage.list("");
}
