import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dropdownOpen: false,
      navLinks: [
        { name: "Upload File", link: "upload" },
        { name: "View Files", link: "/" },
      ]
    };
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  toggleDropdown = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };

  getDropDown = () => {
    if (this.props.authed) {
      return (
        <Dropdown
          navbar="true"
          isOpen={this.state.dropdownOpen}
          toggle={this.toggleDropdown}
        >
          <DropdownToggle navbar="true" caret>
            Account Options
                </DropdownToggle>
          <DropdownMenu dark="true">
            <DropdownItem>
              <NavLink
                onClick={this.props.handleLogout}
                href="/login">
                Log out
                        </NavLink>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    } else {
      return <p />;
    }
  }

  render() {
    return (
      <Navbar color="dark" dark={true} expand="sm">
        <Container>
          <NavbarBrand href="/">172 Project 1</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar={true}>
            <Nav className="mr-auto" navbar>
              {this.props.authed && this.state.navLinks.map((option, index) => {
                return (
                  <NavItem key={index}>
                    <NavLink href={option.link}>{option.name}</NavLink>
                  </NavItem>
                );
              })}
            </Nav>

            <Nav className="ml-auto" nav="true">
              {this.getDropDown()}
            </Nav>
          </Collapse>
          <NavbarToggler onClick={this.toggle} />
        </Container>
      </Navbar>
    );
  }
}

export default Navigation;
