import * as yup from "yup";

export type ProgressChapter = {
  userId: string;
  book: string;
  chapter: number;
  timestamp: Date;
};

export const progressChapterSchema = yup.object().shape({
  userId: yup.string().required(),
  book: yup.string().required(),
  chapter: yup.number().integer().min(1).required(),
  timestamp: yup.date().required(),
});