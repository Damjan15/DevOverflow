import { getUserAnswers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import React from "react";
import AnswerCard from "../cards/AnswerCard";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const AnswerTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserAnswers({
    userId,
    page: 1,
  });

  return (
    <>
      {result.answers.map((item) => (
        <AnswerCard
          key={item._id}
          _id={item._id}
          clerkId={clerkId}
          question={item.question}
          author={item.author}
          upvotes={item.upvotes.length}
          createdAt={item.createdAt}
        />
      ))}
    </>
  );
};

export default AnswerTab;
