import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";

const UserProducts = () => {
    const [products, setProducts] = useState([]);

    // Fetch all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`);
            // Filter products where shipping is 1 (true)
            const filteredProducts = data.products.filter((p) => p.shipping === true);
            setProducts(filteredProducts);
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };

    // Handle "Collected" button click to delete the product from the database
    const handleCollected = async (productId) => {
        try {
            // Prompt the user for confirmation before deleting
            let answer = window.prompt("Are you sure you want to mark this product as collected?");
            if (!answer) return;  // If user cancels, do nothing

            // Delete the product from the database
            const { data } = await axios.delete(
                `${process.env.REACT_APP_API}/api/v1/product/delete-product/${productId}`
            );

            // If successful, remove the product from the UI
            setProducts((prevProducts) =>
                prevProducts.filter((product) => product._id !== productId)
            );

            toast.success("Product successfully collected and removed");
        } catch (error) {
            console.log(error);
            toast.error("Failed to collect the product");
        }
    };

    // Lifecycle method to fetch products on mount
    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <Layout>
            <style>{`
                .products-container {
                    padding: 20px;
                    background-color: #f9f9f9;
                }
                .product-card {
                    border: none;
                    border-radius: 10px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    transition: transform 0.3s;
                }
                .product-card:hover {
                    transform: translateY(-5px);
                }
                .product-link {
                    text-decoration: none;
                    color: inherit;
                }
                .product-img {
                    border-radius: 10px 10px 0 0;
                    width: 100%;
                    height: auto;
                    max-height: 200px;
                    object-fit: contain;
                }
                .card-title {
                    font-size: 1.25rem;
                    font-weight: bold;
                }
                .card-text {
                    color: #6c757d;
                }
                .title {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .product-count {
                    font-size: 1.2rem;
                    color: #333;
                    text-align: center;
                    margin-bottom: 20px;
                    font-weight: bold;
                }
                .collected-button {
                    margin-top: 10px;
                    background-color: #28a745;
                    color: white;
                    border: none;
                    padding: 5px 10px;
                    cursor: pointer;
                }
                .collected-button:hover {
                    background-color: #218838;
                }
            `}</style>

            <div className="row products-container">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1 className="title">All Products List</h1>
                    {/* Dynamic product count */}
                    <p className="product-count">
                        You have {products.length} products to pick up.
                    </p>
                    <div className="row">
                        {products?.map((p) => (
                            <div key={p._id} className="col-md-4 mb-4">
                                <div className="card product-card" style={{ width: "100%" }}>
                                    <img
                                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                        className="card-img-top product-img"
                                        alt={p.name}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description}</p>
                                        <button
                                            className="collected-button"
                                            onClick={() => handleCollected(p._id)}
                                        >
                                            Collected
                                        </button>
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

export default UserProducts;
