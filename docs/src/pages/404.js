import React from "react";
import Heading from "../components/common/heading";
import GeneralLayout from "../layouts/general.layout";

const NotFoundPage = () => {
  return (
    <GeneralLayout>
      <div className="container text-center">
        <Heading
          title="Page not found"
          desc="Looks like the page is not avaliable"
        />
      </div>
    </GeneralLayout>
  );
};

export default NotFoundPage;
