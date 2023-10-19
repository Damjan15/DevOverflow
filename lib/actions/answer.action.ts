"use server";
import Answer from "@/database/answer.modal";
import { connectToDatabase } from "../mongoose";
import { CreateAnswerParams } from "./shared.types";
import Question from "@/database/question.modal";
import { revalidatePath } from "next/cache";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();

    const { content, author, question, path } = params;

    const newAnswer = new Answer({
      content,
      author,
      question,
    });

    // Add answer to the question's answers array
    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    // @todo -> Add interaction

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
