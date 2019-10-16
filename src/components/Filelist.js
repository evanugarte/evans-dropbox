import React, { Component } from "react";
import { Container, ListGroup } from "reactstrap";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { getObjects } from "../backend/S3Functions";
import File from "./File";
import ItemEditModal from "./ItemEditModal.js";

class FileList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false,
      itemToEdit: null,
      items: [
        { _id: 1, name: "resurrecting", quantity: 0, sellPrice: 2 },
        { _id: 2, name: "the", quantity: 0, sellPrice: 2 },
        { _id: 3, name: "past endeavors", quantity: 0, sellPrice: 2 }
      ]
    };
    this.indexID = 1;
  }

  componentDidMount() {
    getObjects();
  }

  /**
   * This function opens the edit modal with the item to edit
   * @param itemToEdit an item object
   */
  toggleShowEditModal = (itemToEdit) => {
    this.setState({
      showEditModal: !this.state.showEditModal,
      itemToEdit: itemToEdit,
    })
  };

  /**
   * This function checks if the inventory is empty.
   * If so, it returns a small p tag telling the user.
   */
  handleEmptyInventory = () => {
    const { items } = this.state;
    //checks if the items array length is 0
    if (items === 0) {
      return <p>Your list is empty. Try refreshing the page or adding an item.</p>;
    } else {
      return;
    }
  }

  /**
   * This is a helper function to give the items alternating
   * class names to give them a pattern effect with CSS
   */
  incrementIndex = () => {
    this.indexID++;
  }

  /**
   * Render the class component
   */
  render() {
    return (
      <Container>
        <ItemEditModal showEditModal={this.state.showEditModal} item={this.state.itemToEdit} />
        <ListGroup>
          <TransitionGroup>
            {this.state.items.map((item) => (
              <React.Fragment key={item._id}>
                <CSSTransition key={item._id} timeout={500} classNames="fade">
                  <File
                    id={this.indexID % 2}
                    key={item.name}
                    item={item}
                    toggleShowEditModal={this.toggleShowEditModal}
                  />
                </CSSTransition>
                {this.incrementIndex()}
              </React.Fragment>
            ))}
            {this.handleEmptyInventory()}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

export default FileList;
