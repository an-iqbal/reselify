import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const [cart, setCart] = useCart();
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch product details
  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
      setLoading(false); // Set loading to false after fetching product
    } catch (error) {
      console.log(error);
      setLoading(false); // Set loading to false on error
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item Added to Cart");
  };

  return (
    <Layout>
      <div className="container mt-3">
        {loading ? ( // Display loading spinner while fetching data
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-6">
              <img
                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                className="card-img-top img-fluid"
                alt={product.name}
                height="300"
                style={{ borderRadius: "8px" }}
              />
            </div>
            <div className="col-md-6">
              <h1 className="text-center">{product.name}</h1>
              <h6>Description: {product.description}</h6>
              <h6>Price: ₹{product.price}</h6>
              <h6>Category: {product?.category?.name}</h6>
              <button
                className="btn btn-secondary ms-1 mt-2"
                onClick={() => addToCart(product)}
              >
                ADD TO CART
              </button>
            </div>
          </div>
        )}
      </div>
      <hr />
      <div className="container mt-4">
        <h6>Similar Products</h6>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" style={{ width: "18rem", transition: "transform 0.3s", cursor: "pointer" }} key={p._id}>
              <img
                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
                style={{ borderRadius: "8px 8px 0 0" }}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <p className="card-text">₹{p.price}</p>
                <button
                  className="btn btn-primary ms-1"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </button>
                <button
                  className="btn btn-secondary ms-1"
                  onClick={() => addToCart(p)}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .card:hover {
          transform: scale(1.03);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </Layout>
  );
};

export default ProductDetails;
