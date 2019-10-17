[facebook login](https://serverless-stack.com/chapters/facebook-login-with-cognito-using-aws-amplify.html)

[download s3 object](https://stackoverflow.com/questions/16799956/javascript-to-download-a-file-from-amazon-s3-bucket)
  - `GetObject` API

[list objects in s3 bucket](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#listObjects-property)
  - `ListObjects` API

[whoa](https://serverless-stack.com/chapters/create-a-login-page.html)
- create an RDS table instead. We will store things in a table Users (name, email, password, ID)
  - 
  - S3 done
  - cognito (no google/FB) done
  - next steps: login + sign up page

[facebook and google sign in](https://medium.com/wolox-driving-innovation/integrating-social-media-to-your-app-with-aws-cognito-8943329aa89b)

[tokens over state variables for react](https://stackoverflow.com/questions/49819183/react-what-is-the-best-way-to-handle-login-and-authentication)


- pool id: us-west-2_UdZYHtMrO
- Pool ARN: arn:aws:cognito-idp:us-west-2:907407725874:userpool/us-west-2_UdZYHtMrO
- app client id: 45rn14gl0p766nv0e6ej7p3all


# after sign up login done
- work on s3 upload + list for autheniticated people
  - [api docs, how to do protected ](https://aws-amplify.github.io/docs/js/storage)
  - maybe just make it public but you cant get to it unless u sign in 
  - store regular and admin on different tables.
- first do get/upload (need date).
- then policy for segregated users
- then lambda
- RDS table
- FB + Google Login 

# What we on
- RDS ready to go to use
  - write handlers for user (done)
- write handles for objects (id -> object key)
  - lets us show only objects we want (w/ updated time etc)
  - e.g. onload call handler with user id from `Auth`, return list of keys
- FB Goog
- deploy
- woo

## Stopped at
- https://serverless-stack.com/chapters/load-the-state-from-the-session.html
  - update state somehow lol
