import {AWSAccessKeyId, AWSSecretKey, Bucket} from "./config";

///////// CONFIG /////////
var aws = require('aws-sdk');


aws.config.update({
  region: 'us-west-1',
  accessKeyId: AWSAccessKeyId,
  secretAccessKey: AWSSecretKey
});

const S3_BUCKET = Bucket;

///////// FUNCTIONS /////////
export async function sign_s3(req) {
  const s3 = new aws.S3();
  const fileName = req.fileName;
  const fileType = req.fileType;
  
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 500,
    ContentType: fileType,
    ACL: 'public-read'
  };
  
  await s3.getSignedUrl('putObject', s3Params, (err, data) => {
    console.log("inslide signed");

    if (err) {
      console.log(err);
      return { success: false, error: err };
    }
  
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
  
    
    console.log(returnData);

    return { success: true, data: { returnData } };
  });
}

export function handleUpload(file) {
  console.log(file);
}

export function getObjects() {
  let params = {
    Bucket: S3_BUCKET
  };
  const s3 = new aws.S3();  // Create a new instance of S3
  s3.listObjects(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log(data);
  })
}
