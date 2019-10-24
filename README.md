# Evan Ugarte's Dropbox
This application was made while in CMPE 172 at San Jose State. Users can upload their files to the cloud through this web app and access them from anywhere. A **video demo** can be found [here](https://www.youtube.com/watch?v=YaaZQ7lRg6c&t=377s)

## Folder Organization
`.circleci/` contains all the test, build and deploy steps for CircleCi in the `config.yml` file. `public/` contains `index.html`, which is used for rendering our react Application. `src/` contains the React code needed to run the application, and `server/` contains the Node.js server code that my EC2 RDS server runs.

## Tools Used
Amazon Web Services was used for anything ane everything cloud related. This includes EC2, Cognito, Lambda, S3, CloudFront, Route 53, RDS, Elastic Load Balancers and Autoscaling Groups for EC2. For continuous integration and deployment, I used [CircleCI](https://circleci.com/) which was easy and fun to use. [React.js](https://reactjs.org/) with [Reactstrap](https://reactstrap.github.io/) was used for UI rendering, and [eslint](https://eslint.org/) was used to help me make sure my code isn't too gross.
