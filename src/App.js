import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import SearchBox from "./components/SearchBox";
import SearchList from "./components/SearchList";
import DrugInfo from "./components/DrugInfo";
import Header from "./components/Header";
import debounce from "lodash.debounce";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [apiError, setApiError] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  const fetchSearchResults = async (searchQuery) => {
    try {
      setApiError("");
      setSearchResults([]);
      console.log(`Searching for: ${searchQuery}`);

      const response = await axios.get(
        `https://rxnav.nlm.nih.gov/REST/drugs.json?name=${searchQuery}`
      );

      console.log("Drugs API response:", response.data);

      const drugs = response.data.drugGroup.conceptGroup
        ? response.data.drugGroup.conceptGroup.flatMap(
            (group) => group.conceptProperties || []
          )
        : [];

      console.log("Parsed Drugs:", drugs);

      if (drugs.length > 0) {
        setSearchResults(drugs);
      } else {
        setApiError("No results found.");
      }
    } catch (error) {
      console.error("Error searching for drugs:", error);
      setApiError("An error occurred while searching.");
    }
  };

  const fetchSearchSuggestions = useCallback(
    debounce(async (searchQuery) => {
      try {
        const suggestionResponse = await axios.get(
          `https://rxnav.nlm.nih.gov/REST/spellingsuggestions.json?name=${searchQuery}`
        );

        console.log("Suggestions API response:", suggestionResponse.data);

        const suggestions =
          suggestionResponse.data.suggestionGroup.suggestionList?.suggestion ||
          [];

        console.log("Parsed Suggestions:", suggestions);

        setSearchSuggestions(suggestions);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    }, 500),
    []
  );

  useEffect(() => {
    if (searchTerm) {
      fetchSearchSuggestions(searchTerm);
    }
  }, [searchTerm, fetchSearchSuggestions]);

  const handleSearch = () => {
    fetchSearchResults(searchTerm);
  };

  return (
    <Router>
      <div className="min-h-screen bg-purple-100 ">
        <Header />
        <div className="container mx-auto p-5 ">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SearchBox
                    onSearch={(value) => setSearchTerm(value)}
                    onButtonClick={handleSearch}
                  />
                  {apiError && (
                    <div className="text-black mt-5 ml-36">{apiError}</div>
                  )}
                  <SearchList
                    results={searchResults}
                    suggestions={searchSuggestions}
                  />
                </>
              }
            />
            <Route
              path="/drugs/:drug_name"
              element={<DrugInfo query={searchTerm} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
