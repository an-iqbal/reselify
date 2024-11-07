import React from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import "../styles/CartStyles.css";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = () => {
    return cart?.reduce((total, item) => total + item.price, 0).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  };

  // Remove cart item function
  const removeCartItem = (pid) => {
    const updatedCart = cart.filter((item) => item._id !== pid);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <Layout>
      <div className="cart-container">
        <div className="text-center">
          <h1>{`Hello ${auth?.token && auth?.user?.name}`}</h1>
          <h4>
            {cart?.length
              ? `You have ${cart.length} item(s) in your cart${auth?.token ? "" : ", please login to checkout"}`
              : "Your Cart is Empty"}
          </h4>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cart?.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="cart-item-image-container">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${item._id}`}
                    alt={item.name}
                    className="cart-item-image"
                  />
                </div>
                <div className="cart-item-details">
                  <p className="cart-item-title">{item.name}</p>
                  <p className="cart-item-description">{item.description.substring(0, 30)}...</p>
                  <p className="cart-item-price">Price: {item.price}</p>
                  <button
                    className="btn-remove"
                    onClick={() => removeCartItem(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total: {totalPrice()}</h4>
            {auth?.user?.address ? (
              <div>
                <h4>Current Address</h4>
                <p>{auth?.user?.address}</p>
                <button
                  className="btn-outline-warning"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
              </div>
            ) : (
              <div>
                {auth?.token ? (
                  <button
                    className="btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn-outline-warning"
                    onClick={() => navigate("/login", { state: "/cart" })}
                  >
                    Please Login to checkout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
