import React from "react";
import { Link } from "react-router-dom";

const SearchList = ({ results, suggestions }) => {
  return (
    <div className="mt-5 m-36">
      {results.length > 0 ? (
        <ul className="bg-white p-4 rounded shadow">
          {results.map((result) => (
            <li key={result.rxcui} className="py-2 border-b last:border-none">
              <Link
                to={`/drugs/${result.name}`}
                className="text-purple-600 hover:underline"
              >
                {result.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : suggestions.length > 0 ? (
        <div className="bg-white p-4 rounded shadow">
          <p>Did you mean:</p>
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index} className="py-2 border-b last:border-none">
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="p-4 rounded shadow">
          <p>Nothing could be found</p>
        </div>
      )}
    </div>
  );
};

export default SearchList;
