// https://medium.com/@khelif96/uploading-files-from-a-react-app-to-aws-s3-the-right-way-541dd6be689
import React from "react";
import { Container, Button, Row } from "reactstrap";
import { handleUpload, sign_s3 } from "../backend/S3Functions";

class UploadView extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      fileValid: true,
      buttonColor: "primary",
      buttonText: "Upload",
    }
    this.file = undefined;
  }

  uploadFile = () => {
    console.log(this.file);
    
    if (!this.file || !this.state.fileValid) {
      alert("file is invalid.");
      return;
    }
    let fileSplice = this.file.name.split('.');
    let urlRequest = {
      fileName: fileSplice[0],
      fileType: fileSplice[0],
    };

    let urlResponse = sign_s3(urlRequest);
    console.log(urlResponse);
    if (!urlResponse.success) {
      alert("s3 was unable to upload your file. Try again later.");
      return;
    }


  }

  onFileChange = (e) => {
    if (!e.target.files[0]) return;
    this.file = e.target.files[0];
    if (this.file.size > 1e7) {
      this.setState({
        fileValid: false
      });
    } else {
      if (!this.state.fileValid) {
        this.setState({
          fileValid: true
        });
      }
    }
  }

  render() {
    const { fileValid } = this.state;
    return (
      <Container>
        <p>
          upload here!
        </p>
        <Row>
          <input type="file" onChange={this.onFileChange} />
        </Row>
        <Row>
          <Button
            color={fileValid ? "primary" : "danger"}
            disabled={!fileValid}
            onClick={this.uploadFile}>
            {fileValid ? "Upload" : "File too large (>10MB)."}
          </Button>
        </Row>
      </Container>
    );
  }
}

export default UploadView;
