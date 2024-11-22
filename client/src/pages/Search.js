import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [values] = useSearch();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  return (
    <Layout title={"Search results"}>
      <div className="container my-5">
        <div className="text-center mb-4">
          <h1 className="text-primary">Search Results</h1>
          <h6 className="text-muted">
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length} items`}
          </h6>
        </div>
        <div className="row d-flex justify-content-center">
          {values?.results.map((p) => (
            <div className="col-md-4 col-lg-3 mb-4" key={p._id}>
              <div className="card shadow-sm border-0 rounded-lg">
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{
                    height: "250px",
                    objectFit: "cover",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title" style={{ fontWeight: "600" }}>
                    {p.name}
                  </h5>
                  <p className="card-text text-muted">
                    {p.description.substring(0, 50)}...
                  </p>
                  <p className="card-text text-primary" style={{ fontWeight: "700" }}>
                    ₹ {p.price}
                  </p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => navigate(`/product/${p.slug}`)}
                      style={{
                        width: "48%",
                        transition: "background-color 0.3s ease-in-out",
                      }}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem('cart', JSON.stringify([...cart, p]));
                        toast.success('Item Added to Cart');
                      }}
                      style={{
                        width: "48%",
                        transition: "background-color 0.3s ease-in-out",
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
    </Layout>
  );
};

export default Search;
