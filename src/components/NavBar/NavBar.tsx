import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

const NavBar = () => {
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">To-Do App</p>
      </NavbarBrand>
    </Navbar>
  );
};

export default NavBar;
