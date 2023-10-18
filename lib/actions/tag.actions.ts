"use server";
import Tag from "@/database/tag.modal";
import { connectToDatabase } from "../mongoose";
import { GetAllTagsParams } from "./shared.types";

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();

    const tags = await Tag.find({});

    return { tags };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
