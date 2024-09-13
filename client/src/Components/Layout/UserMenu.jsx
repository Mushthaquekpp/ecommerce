import React from "react";
import Nav from "react-bootstrap/Nav";

const UserMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h1>User panel</h1>
          <Nav.Link
            href="/dashboard/user/profile"
            className="list-group-item list-group-item-action"
          >
            Profile
          </Nav.Link>

          <Nav.Link
            href="/dashboard/user/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </Nav.Link>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
