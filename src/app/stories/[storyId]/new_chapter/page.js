import NewChapterPage from "@/components/NewChapterPage";
import React, { use } from "react";

const Page = ({ params }) => {
  const { storyId } = use(params);

  console.log("storyId: ", storyId);

  return <NewChapterPage storyId={storyId} />;
};

export default Page;
