import React, { useState } from "react";
import { Container, Button, Row } from "reactstrap";
import { handleS3Upload } from "../backend/S3Functions";
import { getAuthInfo } from "../backend/AuthFunctions";

function UploadView() {
  const [file, setFile] = useState(undefined);
  const [fileValid, setFileValid] = useState(true);


  async function uploadFile() {
    let x = await getAuthInfo();
    console.log(x.data.IdentityId);
    handleS3Upload(x.data.IdentityId, file);
  }

  function onFileChange(e) {
    if (!e.target.files[0]) return;
    setFile(e.target.files[0]);
    if (e.target.files[0].size > 1e7) {
      setFileValid(false);
    } else {
      if (!fileValid) {
        setFileValid(true);
      }
    }
  }

  function isUploadAllowed() {
    return file && fileValid;
  }

  return (
    <Container>
      <p>
        upload here!
        </p>
      <Row>
        <input type="file" onChange={onFileChange} />
      </Row>
      <Row>
        <Button
          color={fileValid ? "primary" : "danger"}
          disabled={!isUploadAllowed()}
          onClick={() => uploadFile(file)}>
          {fileValid ? "Upload" : "File too large (>10MB)."}
        </Button>
      </Row>
    </Container>
  );
}

export default UploadView;
