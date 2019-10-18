import React, { useState, useEffect } from "react";
import { Container, ListGroup } from "reactstrap";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { getUserFiles } from "../backend/RDSFunctions";
import { getAuthInfo } from "../backend/AuthFunctions";
import File from "./File";
import NewModal from "./NewModal.js";

function FileList() {
  const [modalShown, setModalShown] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [items, setItems] = useState(null);

  useEffect(() => {
    renderObjects();
  }, []);

  async function renderObjects() {
    let returnedId = await getAuthInfo();
    let objs = await getUserFiles(returnedId);
    setItems(objs);
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
   * This function checks if the inventory is empty.
   * If so, it returns a small p tag telling the user.
   */
  // function handleEmptyInventory() {
  //   //checks if the items array length is 0
  //   if (items.length === 0) {
  //     return <p>Your list is empty. Try refreshing the page or adding an item.</p>;
  //   } else {
  //     return;
  //   }
  // }

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
