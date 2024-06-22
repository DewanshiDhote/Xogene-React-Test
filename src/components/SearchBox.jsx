import React, { useState } from "react";
const SearchBox = ({ onSearch, onButtonClick }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
    `<q>jewiu</q>`(event.target.value);
  };

  return (
    <div className="flex items-center bg-white rounded shadow p-4 ml-[25%] w-[50%]">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        className="border p-2 w-full rounded"
        placeholder="Search for drugs..."
      />
      <button
        onClick={onButtonClick}
        className="ml-2 p-2 bg-purple-500 text-white rounded hover:bg-purple-700"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBox;
