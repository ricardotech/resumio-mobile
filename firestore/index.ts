import { getUserChaptersProgress } from "./services/Progress";

export async function fetchFirestore(uid: string) {
  const userChaptersProgress = await getUserChaptersProgress(uid);

  return { userChaptersProgress };
}
