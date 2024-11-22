import React, { useState, useEffect, useCallback } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio, Spin, Button, Carousel } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import Fade from "react-reveal/Fade";
import Slide from "react-reveal/Slide";

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

  const handleAddToCart = (event, product) => {
    event.stopPropagation();
    const existingProduct = cart.find((item) => item._id === product._id);
    if (existingProduct) {
      toast.error(`${product.name} is already in your cart.`);
      return;
    }
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success(`${product.name} added to cart`);
  };

  const handleNavigateToProduct = (slug) => {
    navigate(`/product/${slug}`);
  };

  const handleNextPage = () => {
    if (page < Math.ceil(total / 10)) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
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

  return (
    <Layout title={"All Products - Best Offers"}>
      <Carousel autoplay autoplaySpeed={2500}>
        {/* Slide 1 */}
        <div className="carousel-banner">
          <div
            className="carousel-content"
            style={{
              backgroundImage:
                "url('https://cdn4.vectorstock.com/i/1000x1000/62/08/happy-diwali-sale-and-offer-banner-with-artistic-vector-44356208.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "400px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              textAlign: "center",
            }}
          >
          </div>
        </div>

        {/* Slide 2 */}
        <div className="carousel-banner">
          <div
            className="carousel-content"
            style={{
              backgroundImage:
                "url('https://www.shutterstock.com/image-vector/banner-announcing-mega-discount-half-260nw-1962489325.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "400px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              textAlign: "center",
            }}
          >
          </div>
        </div>

        {/* Slide 3 */}
        <div className="carousel-banner">
          <div
            className="carousel-content"
            style={{
              backgroundImage:
                "url('https://www.shutterstock.com/image-vector/super-sale-discount-e-commerce-260nw-1384030049.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "400px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              textAlign: "center",
            }}
          >
          </div>
            
        </div>

                {/* Slide 4 */}
                <div className="carousel-banner">
          <div
            className="carousel-content"
            style={{
              backgroundImage:
                "url('https://cdn.vectorstock.com/i/1000x1000/78/15/nice-sale-and-offer-banner-for-diwali-season-vector-48687815.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "400px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              textAlign: "center",
            }}
          >
          </div>
        </div>
      </Carousel>


      <div className="container-fluid row mt-4">
        <Fade left duration={100}>
          <div className="col-md-3">
            <div className="border p-3 rounded shadow-sm mb-4">
              <h4 className="text-center">Filter By Category</h4>
              <div className="d-flex flex-column">
                {categories?.map((c) => (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                    style={{ fontSize: "1.1rem", padding: "5px" }}
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
                      <Radio value={p.array} style={{ fontSize: "1.1rem" }}>
                        {p.name}
                      </Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
              <button
                className="btn btn-primary mt-3 w-100"
                style={{
                  backgroundColor: "#ffdd57",
                  borderColor: "#ffdd57",
                  color: "#001f3f",
                  padding: "10px 20px",
                  fontWeight: "bold",
                  borderRadius: "25px",
                }}
                onClick={() => window.location.reload()}
              >
                RESET FILTERS
              </button>
            </div>
          </div>
        </Fade>

        <div className="col-md-9">
          {loading ? (
            <div className="text-center">
              <Spin size="large" tip="Loading Products..." />
            </div>
          ) : (
            <div className="d-flex flex-wrap justify-content-center">
              {products?.map((p) => (
                <div
                  key={p._id}
                  className="card m-3 shadow-sm"
                  style={{
                    width: "20rem",
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                    overflow: "hidden",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    cursor: "pointer",
                  }}
                  onClick={() => handleNavigateToProduct(p.slug)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 15px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top img-fluid"
                    alt={p.name}
                    style={{
                      objectFit: "cover",
                      height: "250px",
                      width: "100%",
                    }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5
                      className="card-title"
                      style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                    >
                      {p.name}
                    </h5>
                    <p className="card-text" style={{ fontSize: "1rem" }}>
                      {p.description.substring(0, 60)}...
                    </p>
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <h6
                        className="text-primary"
                        style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                      >
                        ₹{p.price}
                      </h6>
                      <Button
                        type="primary"
                        onClick={(e) => handleAddToCart(e, p)}
                        style={{
                          backgroundColor: "#ffdd57",
                          color: "#001f3f",
                          borderColor: "#ffdd57",
                          fontWeight: "bold",
                          borderRadius: "8px",
                          fontSize: "0.9rem",
                        }}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="pagination mt-4 d-flex justify-content-center">
            <Button
              onClick={handlePreviousPage}
              disabled={page === 1}
              type="primary"
              style={{
                backgroundColor: "#001f3f",
                borderColor: "#001f3f",
                color: "#ffdd57",
                fontWeight: "bold",
                borderRadius: "8px",
                marginRight: "10px",
              }}
            >
              Previous
            </Button>
            <Button
              onClick={handleNextPage}
              disabled={page === Math.ceil(total / 10)}
              type="primary"
              style={{
                backgroundColor: "#001f3f",
                borderColor: "#001f3f",
                color: "#ffdd57",
                fontWeight: "bold",
                borderRadius: "8px",
              }}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
