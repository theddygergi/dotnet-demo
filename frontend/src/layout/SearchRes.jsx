import React from "react";

function SearchRes({ results }) {
  return (
    <div>
      {results.map((result) => {
        <li key={result.mediaId}>{result.title}</li>;
      })}
    </div>
  );
}

export default SearchRes;
