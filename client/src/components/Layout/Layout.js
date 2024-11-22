import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from "react-helmet"
import { Toaster } from "react-hot-toast";

const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div>
            <Helmet>
                <meta charSet='utf-8' />
                <mets name="description" content={description} />
                <mets name="keywords" content={keywords} />
                <mets name="author" content={author} />
                <title>{title} </title>
            </Helmet>
            <Header />
            <main style={{ minHeight: "75vh" }}>

                <Toaster />
                {children}
            </main>
            <Footer />

        </div>
    )
}

Layout.defaultProps = {
    title: 'Reselify',
    description: 'Your go to Campus Market',
    keywords: 'mern,react,resell,mongodb,campus',
    author: 'Shanky, Anwar, Akash'
}

export default Layout
