import React from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import Newsletter from "../components/common/newsletter";
import SEO from "../components/common/seo";

const GeneralLayout = ({ children, ...info }) => {
  return (
    <div className="lg:min-h-screen lg:flex lg:flex-col">
      <SEO {...info} />
      <Header />
      <main className="flex flex-col flex-1">
        <div className="flex-1">{children}</div>
        <div className="container mb-10">
          <Newsletter />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GeneralLayout;
