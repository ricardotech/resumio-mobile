import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import { ProgressChapter, progressChapterSchema } from "../models/Progress";

async function addProgress(progress: ProgressChapter) {
  try {
    await progressChapterSchema.validate(progress, { abortEarly: false });

    await setDoc(
      doc(
        db,
        "ProgressChapter",
        `${progress.userId}-${progress.book}-${progress.chapter}`
      ),
      progress
    );
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const validationErrors = error.inner.reduce((errors: any, err: any) => {
        errors[err.path] = err.message;
        return errors;
      }, {});

      console.error("Erro de validação:", validationErrors);
    } else {
      console.error(`Erro ao registrar progresso: ${error}`);
    }
  }
}

async function getUserChaptersProgress(uid: string) {
  const q = query(
    collection(db, "ProgressChapter"),
    where("userId", "==", uid)
  );

  const querySnapshot = await getDocs(q);
  const chaptersProgressData = querySnapshot.docs.map((doc) => doc.data());

  return chaptersProgressData;
}

export { addProgress, getUserChaptersProgress };
