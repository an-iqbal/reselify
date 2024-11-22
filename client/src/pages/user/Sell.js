import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";

const Profile = () => {
     // State to manage products
  const [products, setProducts] = useState([]);

  // Fetch the products if stored (e.g., from an API or local storage) and display them
  useEffect(() => {
    // For simplicity, this uses an empty array initially.
    // Replace with a fetch call if using an API or local storage retrieval.
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(savedProducts);
  }, []);

  // Function to handle adding a new product
  const addProduct = (newProduct) => {
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts)); // Store updated list if desired
  };
  return (
    <Layout title={"Sell"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>Sell</h1>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <td colSpan="4">
                    <Link to="/dashboard/user/sell/sell-product-form">
                      <button className="btn btn-success">Sell Product</button>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{product.name}</td>
                      <td>${product.price}</td>
                      <td>
                        <button className="btn btn-primary mx-1">Update</button>
                        <button className="btn btn-danger mx-1">Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No products available for sale.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;