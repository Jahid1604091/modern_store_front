import React from "react";
import { menuData } from "../../utils/menu_data";
import "./Sidebar.css"; // Custom CSS file

const renderSubmenu = (items) => {
  return (
    <ul className="submenu">
      {items?.map((item) => (
        <li key={item.id} className="menu-item">
          <a href={item.link} className="menu-link">
            {item.title}
          </a>
          {item?.childrens?.length > 0 && renderSubmenu(item.childrens)}
        </li>
      ))}
    </ul>
  );
};

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="menu-header">Menu</h2>
      {renderSubmenu(menuData)}
    </div>
  );
};

export default Sidebar;
