import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { ADD_BOOK_MUTATION, GET_AUTHORS, GET_BOOKS } from "../queries/queries";

const AddBook = () => {
  const [pageData, setPageData] = useState({
    name: "",
    genre: "",
    authorID: "",
  });
  const { loading, error, data } = useQuery(GET_AUTHORS);
  const [addBookMutation, { addBookData }] = useMutation(ADD_BOOK_MUTATION);

  const displayAuthors = () => {
    if (loading) {
      return <option disabled>Loading authors</option>;
    } else {
      return data.authors.map((author) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    addBookMutation({
      variables: {
        name: pageData.name,
        genre: pageData.genre,
        authorID: pageData.authorID,
      },
      refetchQueries: [{ query: GET_BOOKS }],
    });
    console.log(pageData);
  };
  return (
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label>Book name:</label>
        <input
          type="text"
          onChange={(text) => (pageData.name = text.target.value)}
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          onChange={(text) => (pageData.genre = text.target.value)}
        />
      </div>
      <div className="field">
        <label>Author:</label>
        <select onChange={(text) => (pageData.authorID = text.target.value)}>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default AddBook;
