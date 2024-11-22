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
  const [reviews, setReviews] = useState([]); // State for reviews

  // Initial details
  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug]);

  // Get product details
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
      getProductReviews(data?.product._id); // Fetch reviews for the product
    } catch (error) {
      console.log(error);
    }
  };

  // Get similar products
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

  // Fetch product reviews
  const getProductReviews = async (productId) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/review/${productId}`
      );
      setReviews(data?.reviews || []);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to add the current product to the cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    toast.success("Item Added to Cart");
  };

  return (
    <Layout>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <img
              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
              className="img-fluid rounded"
              alt={product.name}
              style={{
                height: "350px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </div>
          <div className="col-md-6 mt-4 mt-md-0">
            <h1 className="text-center text-primary">{product.name}</h1>
            <h5 className="text-muted">{product.description}</h5>
            <h6 className="text-success mt-3">₹{product.price}</h6>
            <h6 className="text-info">Category: {product?.category?.name}</h6>
            <div className="d-flex mt-4">
              <div className="d-flex flex-column align-items-center gap-3">
                <div className="d-flex justify-content-between align-items-center gap-3">
                  <button
                    className="btn btn-lg btn-outline-warning flex-fill"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>

                  <button
                    className="btn btn-lg btn-outline-warning flex-fill"
                    onClick={() => navigate(`/chat`)}
                  >
                    <i className="bi bi-chat"></i> Chat with Seller
                  </button>

                  <button
                    className="btn btn-lg btn-outline-warning flex-fill"
                    onClick={() => navigate(`/review/${product._id}`)}
                  >
                    Write a Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />

        {/* Review Section */}
        <div className="mt-5">
          <h3 className="text-center">Customer Reviews</h3>
          {reviews.length < 1 ? (
            <p className="text-center">No Reviews Yet</p>
          ) : (
            <div className="list-group">
              {reviews.map((review) => (
                <div className="list-group-item" key={review._id}>
                  <h5 className="mb-1">{review.title}</h5>
                  <p className="mb-1 text-muted">{review.text}</p>
                  <small className="text-warning">
                    Rating: {review.rating} / 5
                  </small>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Similar Products Section */}
        <hr />
        <div className="mt-5">
          <h3 className="text-center">Similar Products</h3>
          {relatedProducts.length < 1 && (
            <p className="text-center">No Similar Products found</p>
          )}
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {relatedProducts?.map((p) => (
              <div className="col" key={p._id}>
                <div className="card h-100 shadow-sm border-0 rounded-lg">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p?._id}`}
                    className="card-img-top"
                    alt={p.name}
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      borderTopLeftRadius: "8px",
                      borderTopRightRadius: "8px",
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text text-muted">
                      {p.description.substring(0, 30)}...
                    </p>
                    <p className="card-text text-primary">₹{p.price}</p>
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => addToCart(p)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
