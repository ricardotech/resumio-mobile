import { addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import * as yup from "yup";

// Define a validation schema using yup
const progressChapterSchema = yup.object().shape({
  userId: yup.string().required(),
  book: yup.string().required(),
  chapter: yup.number().integer().min(1).required(),
  timestamp: yup.date().required(),
});

type ProgressChapter = {
  userId: string;
  book: string;
  chapter: number;
  timestamp: Date;
};

// Function to register reading progress
async function addProgress(progress: ProgressChapter) {
  try {
    // Validate the progress object with the yup schema
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
      // Handle validation errors
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

export { addProgress };
