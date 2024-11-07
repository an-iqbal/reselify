import React from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";

const Profile = () => {
    return (
        <Layout title={"Sell"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Sell</h1>
                        {/* ask gpt to create this page by first giving it authcontroller and auth route the product route and product cotnroller first ask only to give products put by 
                        user to sell with two button update and delete it sould look like order page so everything sould be similar just give gpt sample code and qask it to make similar to sell 
                        page then on update should be where user can update their product details and similarly for delete , also sell button on dashboard should redirect to this sell page get the product listing code from auth 
                        and ask gpt to modify it for seller on specific order  */}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
