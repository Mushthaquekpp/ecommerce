// Importing React library to use JSX and other React features
import React from "react";

// Importing useSearch hook from context for managing search state
import { useSearch } from "../../Context/Search";

// Importing axios for making HTTP requests
import axios from "axios";

// Importing useNavigate from react-router-dom for programmatic navigation
import { useNavigate } from "react-router-dom";

// Importing Container component from react-bootstrap for layout purposes
import { Container } from "react-bootstrap";

const SearchInput = () => {
  // Using useSearch hook to access and update search state
  const [values, setValues] = useSearch();
  // Using useNavigate hook to programmatically navigate to different routes
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      // Making a GET request to the API to fetch search results based on the keyword
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/search/${values.keyword}`
      );
      // Updating the search state with the results from the API
      setValues({ ...values, results: data });
      // Navigating to the search results page
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/get-product"
      );
      if (data?.success) {
        setValues({ ...values, results: data.products, keyword: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (target) => {
    if (!target.value) {
      setValues({ ...values, keyword: "" });
      getProduct();
    } else setValues({ ...values, keyword: target.value });
  };

  return (
    <Container className="me-md-5 me-sm-0">
      {/* Search form with role="search" for accessibility */}
      <form
        className="d-flex search-form"
        role="search"
        onSubmit={handleSubmit}
      >
        {/* Input field for the search query */}
        <input
          className="form-control"
          type="search"
          placeholder="Search..."
          aria-label="Search" // Accessible label for screen readers
          style={{ width: "300px" }} // Inline style for width
          value={values.keyword} // Controlled input value tied to state
          onChange={(e) => handleChange(e.target)} // Updating state on input change
        />
      </form>
    </Container>
  );
};

// Exporting the SearchInput component for use in other parts of the application
export default SearchInput;
