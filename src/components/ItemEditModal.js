import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Input,
  Label
} from "reactstrap";

function FileEditModal(props) {


  const [title, setTitle] = useState("");
  const [file, setFile] = useState();
  const [showModal, toggleModal] = useState("");
  const [editActive, toggleEdit] = useState(false);
  const [fileValid, setFileValid] = useState(true);
  const [description, setDescription] = useState();
  let state = {
    showEditModal: props.showEditModal,
    editActive: false,
    previouslyEdited: false,
    //Item Fields
    title: null,
    quantity: null,
    sellPrice: null,
    purchasePrice: null,
    barcode: null,
    description: null,
    _id: null,
  };
  let itemDeleted = false;
  const itemValues = [
    { name: "Title", value: props.item.title, id: "title" },
    { name: "File", value: props.item.quantity, id: "file" },
    {
      name: "Description",
      value: props.item.description,
      id: "description"
    }
  ];

  /**
   * This function handles an enter key pressed in the text box.
   * @param e the event itself
   */
  function handleKeyDown(e) {
    //Prevent the form being submitted by hitting the enter button
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  /**
   * This is a helper to make sure that the proper
   * textbox is rendered for editing an item.
   * @param id item id
   */
  function getClass(id) {
    if (!id.includes("quantity") && !id.includes("Price")) {
      return "word";
    } else {
      return "number";
    }
  }

  /**
 * This is a helper to make sure that the proper
 * textbox is rendered for editing an item.
 * @param id item id
 */
  function getStep(id) {
    if (id.includes("quantity")) {
      return "1";
    } else {
      return "0.01";
    }
  }

  /**
 * This is a helper to make sure that either the textboxes are rendered
 * or if merely <p> tags should be shown for an item's data in the modal.
 * @param id item id
 */
  function renderEditComponent() {
    //Decide whether to render item data or textboxes to edit item data
    if (this.state.editActive && !this.itemDeleted) {
      //If edit button is enabled
      return (
        <React.Fragment>
          <p style={{ fontSize: 15 }}>
            Any fields left blank, unchanged, or with invalid entries will
            default to their original value.
          </p>
          {itemValues.map((item) =>
            <React.Fragment>
              <Label>{item.name}:</Label>
              <Input
                type={this.getClass(item.id)}
                min="0"
                step={this.getStep(item.id)}
                name={item.id}
                defaultValue={item.value}
                id={item.id}
                onKeyDown={this.handleKeyDown}
                placeholder={`Add ${item.name} Here...`}
                onChange={this.onChange}
              />
            </React.Fragment>
          )}
          <Button color="danger" onClick={this.onDeleteClick.bind(this, props.item._id)}>Delete Item</Button>
        </React.Fragment>
      );
    } else if (!this.itemDeleted) {
      //If edit button isn't enabled
      return (
        <React.Fragment>
          <h3>{this.state.title ? this.state.title : props.item.title}</h3>
          <p>Quantity: {this.state.quantity ? this.state.quantity : props.item.quantity}</p>
          <p>Purchase Price: {this.state.purchasePrice ? (this.state.purchasePrice) : (props.item.purchasePrice)}</p>
          <p>Sell Price: {this.state.sellPrice ? (this.state.sellPrice) : (props.item.sellPrice)}</p>
          <p>Barcode: {this.state.barcode ? this.state.barcode : props.item.barcode}</p>
          <p>Description: {this.state.description ? this.state.description : props.item.description}</p>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <h3>Item Deleted. Close modal to see changes.</h3>
        </React.Fragment>
      );
    }
  };

  /**
   * Handle a user clicking the delete button
   * @param id item id to send a delete request for
   */
  function onDeleteClick(id) {
    console.log("deleting... ", id);
  }

  /**
   * Toggles the edit modal either open or closed.
   */
  function toggle() {
    this.setState({
      showEditModal: !this.state.showEditModal
    });
  };

  /**
   * Toggles the edit mode either on or off.
   */
  function toggleEditMode() {
    this.setState({
      editActive: !this.state.editActive,
      item: props.item
    });
  };

  /**
   * This function handles a change in the text box.
   * @param e the event itself
   */
  function onChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
      _id: props.item._id
    });
  };


  /**
   * This function handles a user submitting an edited item for updating.
   * It sends a post request with addItem to itemActions to update the item 
   * in mongoDB.
   */
  function sumbitEdit() {
    const editedItem = this.state;
    props.addItem(editedItem);
    this.toggleEditMode();
    this.setState({
      previouslyEdited: true
    });
  };

  /**
   * Render the class component
   */
  return (
    <Modal
      isOpen={props.showEditModal}
      toggle={props.toggleShowEditModal}
    >
      <Form>
        <ModalHeader toggle={props.toggleShowEditModal}>
          Edit Item
              <Button onClick={this.toggleEditMode}>Edit</Button>
        </ModalHeader>
        <ModalBody>
          {this.renderEditComponent()}
        </ModalBody>
        <ModalFooter>
          {this.state.editActive ? (
            <Button className={"btn btn-primary"} onClick={this.sumbitEdit}>
              Save
                </Button>
          ) : (
              <p />
            )}
          <p>
            {this.state.previouslyEdited && !this.state.editActive
              ? "Click Close to see Changes"
              : ""}
          </p>
          <Button
            className={"btn btn-danger"}
            onClick={props.toggleShowEditModal}
          >
            {this.state.editActive ? "Cancel" : "Close"}
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}

export default FileEditModal;
