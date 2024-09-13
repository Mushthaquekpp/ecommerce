import React from "react";
import Nav from "react-bootstrap/Nav";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h1>Admin panel</h1>
          <Nav.Link
            href="/dashboard/admin/createcategory"
            className="list-group-item list-group-item-action"
          >
            Create Category
          </Nav.Link>

          <Nav.Link
            href="/dashboard/admin/createproduct"
            className="list-group-item list-group-item-action"
          >
            Create product
          </Nav.Link>

          <Nav.Link
            href="/dashboard/admin/products"
            className="list-group-item list-group-item-action"
          >
            Products
          </Nav.Link>

          <Nav.Link
            href="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
          >
            Users
          </Nav.Link>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
