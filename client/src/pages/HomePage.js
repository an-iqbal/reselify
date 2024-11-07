import React, { useState, useEffect, useCallback } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import Fade from "react-reveal/Fade";
import { Spin } from "antd";

const HomePage = () => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTotal = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getAllProducts = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [page]);

  const filterProduct = useCallback(async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  }, [checked, radio]);

  const handleFilter = (value, id) => {
    setChecked((prevChecked) => {
      const updatedChecked = value
        ? [...prevChecked, id]
        : prevChecked.filter((c) => c !== id);
      return updatedChecked;
    });
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
    getAllProducts();
  }, [getTotal, getAllProducts]);

  useEffect(() => {
    if (page > 1) getAllProducts();
  }, [page, getAllProducts]);

  useEffect(() => {
    if (!checked.length && !radio.length) {
      getAllProducts();
    } else {
      filterProduct();
    }
  }, [checked, radio, filterProduct, getAllProducts]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (event, product) => {
    event.stopPropagation(); // Prevent the Link from being clicked
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Layout title={"All Products - Best Offers"}>
      <Fade duration={800}>
        <div
          className="hero-banner text-white text-center py-5"
          style={{
            backgroundColor: "#001f3f",
            height: "300px",
            color: "#ffdd57",
            position: "relative",
            borderRadius: "0.5rem",
            marginBottom: "20px",
            background: "linear-gradient(135deg, #001f3f, #ffdd57)",
          }}
        >
          <h1 className="display-3 fw-bold">🔥 Discover Amazing Deals!</h1>
          <p className="lead fs-4">
            Shop quality products at unbeatable prices!
          </p>
          <input
            type="text"
            placeholder="Search products..."
            className="form-control w-50 mx-auto mt-3"
            onChange={handleSearch}
          />
          <button
            className="btn btn-warning btn-lg rounded-pill shadow mt-2"
            onClick={() =>
              window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: "smooth",
              })
            }
          >
            Shop Now
          </button>
        </div>
      </Fade>

      <div className="container-fluid row mt-4">
        <Fade left duration={800}>
          <div className="col-md-2">
            <div className="border p-3 rounded shadow-sm mb-4">
              <h4 className="text-center">Filter By Category</h4>
              <div className="d-flex flex-column">
                {categories?.map((c) => (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                  >
                    {c.name}
                  </Checkbox>
                ))}
              </div>
              <h4 className="text-center mt-4">Filter By Price</h4>
              <div className="d-flex flex-column">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices?.map((p) => (
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
              <button
                className="btn btn-primary mt-3 w-100"
                style={{
                  backgroundColor: "#007bff",
                  borderColor: "#007bff",
                  color: "#fff",
                }}
                onClick={() => window.location.reload()}
              >
                RESET FILTERS
              </button>
            </div>
          </div>
        </Fade>

        <div className="col-md-9">
          <h1 className="text-center mb-4">Featured Products</h1>
          {loading ? (
            <Spin size="large" tip="Loading..." />
          ) : (
            <div className="d-flex flex-wrap justify-content-center">
              {filteredProducts?.map((p) => (
                <Link to={`/product/${p.slug}`} key={p._id} style={{ textDecoration: 'none' }}>
                  <div
                    className="card m-3 shadow-sm"
                    style={{
                      width: "20rem",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      overflow: "hidden",
                      transition: "transform 0.3s, box-shadow 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {/* Product Image */}
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      style={{
                        height: "250px",
                        objectFit: "cover",
                      }}
                    />

                    {/* Product Info */}
                    <div className="card-body text-center">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text text-muted">
                        {p.description.substring(0, 60)}...
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="card-text fw-bold">₹ {p.price}</p>
                        <span
                          className="badge bg-danger"
                          style={{ fontSize: "0.9rem" }}
                        >
                          {p.discount ? `${p.discount}% OFF` : "No Discount"}
                        </span>
                      </div>
                      <p className="card-text" style={{ fontSize: "0.85rem" }}>
                        Rating: ⭐⭐⭐⭐☆ ({p.rating} Reviews)
                      </p>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="card-footer text-center">
                      <button
                        className="btn btn-warning w-100 rounded-pill"
                        onClick={(event) => handleAddToCart(event, p)}
                        style={{
                          backgroundColor: "#f8c20e",
                          borderColor: "#f8c20e",
                          color: "#000",
                          fontWeight: "bold",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          transition: "background-color 0.3s, transform 0.3s",
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
