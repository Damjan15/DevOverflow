import React from "react";
import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import { IQuestion } from "@/database/question.modal";
import { getQuestionsByTagId } from "@/lib/actions/tag.actions";
import { URLProps } from "@/types";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";

const TagDetails = async ({ params, searchParams }: URLProps) => {
  const result = await getQuestionsByTagId({
    tagId: params.id,
    page: 1,
    searchQuery: searchParams.q,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{result.tagTitle}</h1>

      <div className="mt-11 w-full">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question: IQuestion) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="Theres no tag question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
          discussion. Your query could be the next big thing others learn from.
          Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask Question"
          />
        )}
      </div>
    </>
  );
};

export default TagDetails;
