import React, { useState, useEffect } from "react";
import { Container, Button, Row, Input } from "reactstrap";
import { getAuthInfo } from "../backend/AuthFunctions";
import { uploadObject } from "../backend/S3Functions";
import { addFileToTable } from "../backend/RDSFunctions";

function UploadView(appProps) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState();
  const [size, setSize] = useState();
  const [description, setDescription] = useState("");
  const [fileValid, setFileValid] = useState(true);
  const [userId, setUserId] = useState();

  const fields = [
    <p>upload here!</p>,
    <Input placeholder="File Title (optional)"
      onChange={(e) => setTitle(e.target.value)} />,
    <Input type="file" onChange={onFileChange} />,
    <Input
      placeholder="Description (optional)"
      type="textarea" onChange={
        (e) => setDescription(e.target.value)} />,
    <Button
      color={fileValid ? "primary" : "danger"}
      disabled={!isUploadAllowed()}
      onClick={async () => await uploadFile(file)}>
      {fileValid ? "Upload" : "File too large (>10MB)."}
    </Button>,
  ];

  useEffect(() => {
    storeUserId();
    // eslint-disable-next-line
  }, []);

  async function storeUserId() {
    if (!appProps.authenticated) return;
    setUserId(await getAuthInfo());
  }

  async function uploadFile() {
    let fileId = await uploadObject(file);
    await addFileToTable({
      userId: userId,
      fileId: fileId.key,
      title: title ? title : file.name,
      size: size,
      description: description
    });
    alert("file sucessfully uploaded.");
  }

  function onFileChange(e) {
    if (!e.target.files[0]) return;
    setFile(e.target.files[0]);
    if (e.target.files[0].size > 1e7) {
      setFileValid(false);
    } else {
      setSize(e.target.files[0].size);
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
      {fields.map((x, index) => {
        return (
          <Row key={index} style={{ width: "50%", padding: 10 }}>
            {x}
          </Row>
        );
      })}
    </Container>
  );
}

export default UploadView;
