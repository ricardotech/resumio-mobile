import { Timestamp } from "firebase/firestore";
import * as yup from "yup";

export type UserStreak = {
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: any;
  streakHistory: Array<{ date: Date; streakCount: number }>;
};

export const userStreakSchema = yup.object().shape({
  userId: yup.string().required(),
  currentStreak: yup.number().min(0).required(),
  longestStreak: yup.number().min(0).required(),
  lastActiveDate: yup.date().required(),
  streakHistory: yup
    .array()
    .of(
      yup.object().shape({
        date: yup.date().required(),
        streakCount: yup.number().min(0).required(),
      })
    )
    .required(),
});
