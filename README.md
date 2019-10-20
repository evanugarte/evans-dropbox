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

# aight
- login w fb + goog
- get first/last name from it
  - check user if its in `users` table
  - if not show modal.
  - if so show modal, 
  - submit will add user to db, and cancel button will log user out
- lambda for new user to enter into users table
  - [do this](https://stackoverflow.com/questions/33659059/invoke-amazon-lambda-function-from-node-app)
  - refactor existing code. after onto config in cloud we are done!

## Friday
- deploy
- scaling group, elb, cloudfront, r53

# video
- video and pdf explanation
  - create account, add file
    - show it rendered
      - edit it
    - add another file
      - delete it
  - log into an existing non admin account
    - create file
    - create file to be deleted by admin
  - log into admin
    - show that you can see everything and not upload.
    - delete the file that was named to be deleted
  - sign back into existing
    - show that that file was deleted.

```sql
CREATE TABLE files (
    entry_id int AUTO_INCREMENT PRIMARY KEY,
    file_id varchar(255) NOT NULL,
    user_id varchar(255) NOT NULL,
    title varchar(255) NOT NULL,
    description TEXT,
    size int NOT NULL,
    uploaded_time varchar(255),
    updated_time varchar(255)
);
```

```sql
select a.first_name, a.last_name, a.id, b.* from users a, files b where a.id = b.user_id;
```


https://medium.com/@uriklar/hosting-a-react-app-using-s3-cloudfront-with-continuous-deployment-using-circleci-89a921f74b82
https://serverless-stack.com/chapters/facebook-login-with-cognito-using-aws-amplify.html


# final boss battle
- use npm [facebook button](https://www.npmjs.com/package/react-facebook-login)
  - try federated login with whatever the response gives you with `callback`
- use npm [google button](https://www.npmjs.com/package/react-google-login)
  - try federated login with whatever the response gives you with `onsuccess`
- add both to RDS if they dont exist (function for that is done)
  - figure out how to enter name ([splice on the first space](https://stackoverflow.com/questions/10272773/split-string-on-the-first-white-space-occurrence)).
- lambda for adding new users ONLY

- holy shit did we do it
- deploy (cloudfront, ELB, Scaling group)
- diagrams
- Video
