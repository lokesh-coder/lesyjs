import React from "react";
import { Link } from "gatsby";
import { Highlight } from "react-instantsearch-dom";
const SearchPreview = props => {
  const { hit } = props;
  return (
    <article>
      <h3>
        <Link to={hit.path}>
          <Highlight hit={hit} attribute="title" tagName="mark" />
        </Link>
      </h3>
      <small>{new Date(hit.date).toLocaleDateString()}</small>
      <p>
        <Highlight hit={hit} attribute="excerpt" tagName="mark" />
      </p>
    </article>
  );
};
export default SearchPreview;
