import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <div className="text-center">
          {/* Updated category name color to a more professional color (dark gray) */}
          <h2 style={{ fontWeight: "bold", color: "#333" }}>Category - {category?.name}</h2>
          <p className="text-muted">{products?.length} result(s) found</p>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="row">
              {products?.map((p) => (
                <div className="col-md-4 mb-4" key={p._id}>
                  <div
                    className="card h-100 shadow-sm border-0"
                    style={{
                      borderRadius: "12px",
                      transition: "transform 0.2s",
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate(`/product/${p.slug}`)}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                  >
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      style={{
                        height: "200px",
                        objectFit: "cover",
                        borderTopLeftRadius: "12px",
                        borderTopRightRadius: "12px",
                      }}
                    />
                    <div className="card-body">
                      <h5 className="card-title" style={{ color: "#333", fontWeight: "bold" }}>{p.name}</h5>
                      <p className="card-text text-muted" style={{ fontSize: "0.9rem" }}>
                        {p.description.substring(0, 60)}...
                      </p>
                      <p className="card-text" style={{ color: "#FFA500", fontSize: "1.2rem", fontWeight: "bold" }}>
                        ₹ {p.price}
                      </p>
                      <div className="d-flex justify-content-between">
                        <button
                          className="btn btn-warning"
                          onClick={() => {
                            setCart([...cart, p]);
                            localStorage.setItem("cart", JSON.stringify([...cart, p]));
                            toast.success("Item Added to Cart");
                          }}
                          style={{
                            borderRadius: "8px",
                            fontWeight: "bold",
                          }}
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
      </div>
    </Layout>
  );
};

export default CategoryProduct;
