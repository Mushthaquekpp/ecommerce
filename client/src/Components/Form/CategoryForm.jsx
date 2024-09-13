// Importing React library to use JSX and other React features
import React from "react";

// CategoryForm component accepts handleSubmit, value, and setValue as props
const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      {/* Form submission will trigger the handleSubmit function */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          {/* Input field for creating a new category, value is controlled by the component's state */}
          <input
            type="text"
            className="form-control"
            placeholder="create new category"
            value={value} // input value tied to the state
            onChange={(e) => setValue(e.target.value)} // updating the state on input change
          />
        </div>
        {/* Submit button to trigger form submission */}
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

// Exporting the CategoryForm component to be used in other parts of the application
export default CategoryForm;
