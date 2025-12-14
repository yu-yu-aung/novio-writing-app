import React, { use } from "react";

const Page = ({ params }) => {
  const { bookshelfd } = use(params);

  return (
    <div>This is your bookshelf</div>
  );
};

export default Page;
