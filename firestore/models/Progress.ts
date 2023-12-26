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

export type DevotionalTask = {
  coins: string;
  value: string;
};

export type DevotionalProgress = {
  coinsEarned: number;
  devotionalId: string;
  userId: string;
  tasksDone: DevotionalTask[];
};

export const devotionalProgressSchema = yup.object().shape({
  coinsEarned: yup.number().integer().min(0).required(),
  devotionalId: yup.string().required(),
  userId: yup.string().required(),
  tasksDone: yup.array().of(
    yup.object().shape({
      coins: yup.string().required(),
      value: yup.string().required(),
    })
  ),
});
