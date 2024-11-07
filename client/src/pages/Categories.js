import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";
import "../styles/Categories.css";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title="All Categories">
      <div className="categories-container">
        <h2 className="text-center mb-4">Explore Our Categories</h2>
        <div className="row">
          {categories.map((c) => (
            <div className="col-md-4 col-sm-6 mb-4" key={c._id}>
              <div className="category-card">
                <Link to={`/category/${c.slug}`} className="category-link">
                  {c.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
