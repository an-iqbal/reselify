import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";
import Fade from "react-reveal/Fade";
import { Card } from "antd";

const Categories = () => {
  const categories = useCategory();

  // Suggested images based on common categories
  const categoryImages = {
    "Bikes & Transportation": "https://media.istockphoto.com/id/1168051114/photo/group-of-bicycles-parking-sport-concept-with-bicycle-pile-of-bikes-in-the-street-of-stockholm.jpg?s=612x612&w=0&k=20&c=cG0r_xQbPl9AjBBwGJ-u__Oy7oHs9T_frcBQXLsj0io=",
    "Fashion & Accessories": "https://www.thestatesman.com/wp-content/uploads/2017/12/accessories.jpg",
    "Sports & Fitness": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjClC2CaRBoyGSH5Y5o_h-C2aRq051DkQ4JQ&s",
    "Books & Stationery": "https://as1.ftcdn.net/v2/jpg/00/34/70/32/1000_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg",
    "Stationery": "https://cdn.pixabay.com/photo/2016/03/26/22/21/school-1272951_1280.jpg",
    "Electronics": "https://alloy.ai/wp-content/uploads/2023/04/industries-consumer-electronics.jpeg",
    "Furniture": "https://www.alankaram.in/wp-content/uploads/2022/12/A7402720-2048x1365-1.jpg",
    "Home Essentials": "https://booxoul.com/wp-content/uploads/2023/04/Maid-on-Leave-10-Home-Essentials-to-Keep-You-Organized.webp",
    "Miscellaneous": "https://www.shutterstock.com/image-vector/stickerstyle-business-supplies-icon-set-260nw-2185235043.jpg",
    // Fallback image if no match is found
    "default": "https://via.placeholder.com/500"
  };

  return (
    <Layout title={"All Categories"}>
      <div className="container">
        <h2 className="text-center my-5" style={{ fontSize: "2rem", fontWeight: "bold", color: "#001f3f" }}>
          Explore Our Categories
        </h2>
        <div className="row">
          {categories.map((c) => {
            const imageUrl = categoryImages[c.name] || categoryImages["default"];

            return (
              <div className="col-md-4 mb-4" key={c._id}>
                <Fade bottom duration={1000}>
                  <Link
                    to={`/category/${c.slug}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <Card
                      hoverable
                      cover={
                        <div
                          style={{
                            height: "200px",
                            background: `url(${imageUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundColor: "#f0f0f0", // Add background color in case image fails
                          }}
                          className="category-image"
                        />
                      }
                      style={{
                        borderRadius: "10px",
                        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                        transition: "transform 0.3s",
                      }}
                      className="category-card"
                    >
                      <div style={{ padding: "10px" }}>
                        <h4
                          className="text-center"
                          style={{
                            color: "#001f3f",
                            fontWeight: "bold",
                            padding: "10px",
                            fontSize: "1.25rem",
                            textTransform: "capitalize",
                          }}
                        >
                          {c.name}
                        </h4>
                      </div>
                    </Card>
                  </Link>
                </Fade>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
