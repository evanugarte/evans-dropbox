import React, { useState, useEffect } from "react";
import { Container, ListGroup } from "reactstrap";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { getObjects } from "../backend/S3Functions";
import File from "./File";
import ItemEditModal from "./ItemEditModal.js";

function FileList() {
  const [modalShown, setModalShown] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    renderObjects();
  });

  async function renderObjects() {
    let objs = await getObjects();
    setItems(objs);
  }

  /**
   * This function opens the edit modal with the item to edit
   * @param item an item object
   */
  function toggleShowEditModal(item) {
    setItemToEdit(item);
    setModalShown(!modalShown);
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
      <ItemEditModal showEditModal={modalShown} item={itemToEdit} />
      <ListGroup>
        <TransitionGroup>
          {items.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <CSSTransition timeout={500} classNames="fade">
                  <File
                    id={index % 2}
                    key={item.name}
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
