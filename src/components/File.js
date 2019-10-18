import React from "react";
import { ListGroupItem, Row, Col, Button } from "reactstrap";
import { CSSTransition } from "react-transition-group";
import { getDownloadUrl } from "../backend/S3Functions";

export function File(props) {
  
  function toggleShowEditModal(item) {
    props.toggleShowEditModal(item);
  };

  async function downloadFile() {
    let url = await getDownloadUrl(props.item.file_id);
    window.open(url);
  }

  /**
   * Render the class component
   */
  return (
    <CSSTransition timeout={500} classNames="fade">
      <React.Fragment>
        <ListGroupItem id={`itemtype-${props.item.key}`}>
          <div style={{ display: "inline-block", width: "90%" }}>
            <div style={{ float: "left" }}>
              <Row>
                <h3>{props.item.title}</h3>
              </Row>
              <Row>
                <Col>
                  <p>Size: {props.item.size} bytes</p>
                </Col>
                <Col>
                  <p>Last Modified: {props.item.updated_time.toString()}</p>
                </Col>
                <Col>
                  <p>Uploaded: {props.item.uploaded_time.toString()}</p>
                </Col>
              </Row>
              <Row>
                {props.item.description ? <p style={{ fontStyle: "italic" }}>
                  {props.item.description} </p> : ""}
              </Row>
            </div>
            <Button className={"btn btn-warning float-right"}
              onClick={async () => await downloadFile()}>
              Download
            </Button>
            <Button className={"btn btn-info float-right"}
              onClick={() => toggleShowEditModal(props.item)}>
              Info
            </Button>
          </div>
        </ListGroupItem>

      </React.Fragment>
    </CSSTransition>
  );
}

export default File;
