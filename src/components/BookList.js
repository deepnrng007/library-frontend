import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { GET_BOOKS } from "../queries/queries";
import BookDetail from "./BookDetail";

function BookList() {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          data.books.map((item) => (
            <li
              id="book-list-item"
              key={item.id}
              onClick={() => setSelected(item.id)}
            >
              {item.name}
            </li>
          ))
        )}
      </div>
      <BookDetail bookId={selected} />
    </>
  );
}

export default BookList;
