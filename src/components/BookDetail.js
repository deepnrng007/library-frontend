import React from "react";
import { GET_BOOK } from "../queries/queries";
import { useQuery } from "@apollo/client";

const BookDetail = ({ bookId }) => {
  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: {
      id: bookId,
    },
  });

  return loading ? (
    <div id="book-details">Loading...</div>
  ) : (
    <div id="book-details">
      {data?.book ? (
        <div>
          <h2>{data?.book.name}</h2>
          <p>{data?.book.genre}</p>
          <p>{data?.book.author.name}</p>
          <p>All books by this author</p>
          <ul className="other-books">
            {data?.book.author.books.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>No Book selected...</div>
      )}
    </div>
  );
};

export default BookDetail;
