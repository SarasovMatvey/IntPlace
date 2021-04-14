import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import "./Header.sass";
import logo from "./img/logo.png";

function Header() {
  return (
    <Menu fixed="top" className="header">
      <Menu.Item>
        <img className="header__logo" src={logo} />
      </Menu.Item>
      <Menu.Item>
        <NavLink
          className="header__link"
          activeClassName="header__link_active"
          exact
          to="/"
        >
          Main
        </NavLink>
      </Menu.Item>
    </Menu>
  );
}

export default Header;
