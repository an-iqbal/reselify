import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../styles/Search.css"; // External CSS file for custom styles

const Search = () => {
  const [values] = useSearch();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  return (
    <Layout title="Search Results">
      <div className="container py-4">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length} Products`}
          </h6>
          <div className="row mt-4 justify-content-center">
            {values?.results.map((p) => (
              <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={p._id}>
                <div className="card h-100 search-card">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.length > 50
                        ? `${p.description.substring(0, 50)}...`
                        : p.description}
                    </p>
                    <p className="card-text fw-bold">₹{p.price}</p>
                    <div className="mt-auto">
                      <button
                        className="btn btn-outline-primary w-100 mb-2"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                      <button
                        className="btn btn-primary w-100"
                        onClick={() => {
                          const updatedCart = [...cart, p];
                          setCart(updatedCart);
                          localStorage.setItem("cart", JSON.stringify(updatedCart));
                          toast.success("Item Added to Cart");
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
    </Layout>
  );
};

export default Search;
