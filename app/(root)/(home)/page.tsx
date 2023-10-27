import Link from "next/link";
import HomeFilters from "@/components/home/HomeFilters";
import NoResult from "@/components/shared/NoResult";
import Filter from "@/components/shared/Filter";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import QuestionCard from "@/components/cards/QuestionCard";
import {
  getQuestions,
  getRecommendedQuestions,
} from "@/lib/actions/question.action";
import { SearchParamsProps } from "@/types";
import Pagination from "@/components/shared/Pagination";
import type { Metadata } from "next";
import { auth } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Home | Dev Overflow",
  description:
    "A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate withe developers from around the world. Explore topics in web development, mobile app development, algorithms, data structures, and more.",
  icons: {
    icon: "/assets/images/site-logo.svg",
  },
};

export default async function Home({ searchParams }: SearchParamsProps) {
  const { userId } = auth();
  let result;

  if (searchParams?.filter === "recommended") {
    if (userId) {
      result = await getRecommendedQuestions({
        userId,
        searchQuery: searchParams.q,
        page: searchParams.page ? +searchParams.page : 1,
      });
    } else {
      result = {
        questions: [],
        isNext: false,
      };
    }
  } else {
    result = await getQuestions({
      searchQuery: searchParams.q,
      filter: searchParams.filter,
      page: searchParams.page ? +searchParams.page : 1,
    });
  }

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />

        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question) => (
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
            title="Theres no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
          discussion. Your query could be the next big thing others learn from.
          Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask Question"
          />
        )}
      </div>

      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </>
  );
}
