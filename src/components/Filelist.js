import React, { useState, useEffect } from "react";
import { Container, ListGroup } from "reactstrap";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { getUserFiles } from "../backend/RDSFunctions";
import { getAuthInfo } from "../backend/AuthFunctions";
import File from "./File";
import NewModal from "./NewModal.js";

function FileList(appProps) {
  const [modalShown, setModalShown] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [items, setItems] = useState(null);

  useEffect(() => {
    renderObjects();
  }, []);

  async function renderObjects() {
    if(!appProps.authenticated) return;
    let returnedId = await getAuthInfo();
    setItems(await getUserFiles(returnedId));
  }

  /**
   * This function opens the edit modal with the item to edit
   * @param item an item object
   */
  function toggleShowEditModal(item) {
    console.log("lol");
    
    setItemToEdit(item);
    setModalShown(true);
  };

  /**
   * Render the class component
   */
  return (
    <Container>
      <NewModal showEditModal={modalShown} item={itemToEdit} />
      <ListGroup>
        <TransitionGroup>
          {items && items.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <CSSTransition timeout={500} classNames="fade">
                  <File
                    id={index % 2}
                    item={item}
                    toggleShowEditModal={toggleShowEditModal}
                  />
                </CSSTransition>
              </React.Fragment>
            );
          })}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
}

export default FileList;
