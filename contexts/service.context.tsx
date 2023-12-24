import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app, db } from "../utils/firebaseConfig";
import {
  DocumentData,
  FieldValue,
  Timestamp,
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  ProgressChapter,
  progressChapterSchema,
} from "../firestore/models/Progress";
import { useAuth } from "./auth.context";
import { Devotional } from "../firestore/models/Devotional";

type ServiceContextData = {
  devotionals: Devotional[] | undefined;
  getDevotionals: () => Promise<DocumentData[] | undefined>;
  userChaptersProgress: ProgressChapter[] | undefined;
  getUserChaptersProgress: (uid: string) => Promise<DocumentData[] | undefined>;
  addProgress: (progress: ProgressChapter) => Promise<void>;
  addDevotionalTaskDone: (task: DevotionalTaskDone) => Promise<void>;
};

type ServiceProviderProps = {
  children: ReactNode;
};

export const ServiceContext = createContext({} as ServiceContextData);

type DevotionalTaskDone = {
  userId: string;
  devotionalId: string;
  task: "oracao" | "explicacao" | "aplicacao" | "texto" | "exemplos";
};

function ServicesProvider({ children }: ServiceProviderProps) {
  const [userChaptersProgress, setUserChaptersProgress] =
    useState<ProgressChapter[]>();

  const [devotionals, setDevotionals] = useState<Devotional[]>();

  const { user } = useAuth();

  useEffect(() => {
    async function loadServices() {
      if (user) {
        await getUserChaptersProgress(user.id);
        await getDevotionals();
      }
    }
    loadServices();
  }, [user]);

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

      const progressIndex = userChaptersProgress?.findIndex(
        (item) =>
          item.userId === progress.userId &&
          item.book === progress.book &&
          item.chapter === progress.chapter
      );

      if (progressIndex === -1) {
        setUserChaptersProgress((prevState) => [
          ...(prevState as ProgressChapter[]),
          progress,
        ]);
      }
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

  async function addDevotionalTaskDone(task: DevotionalTaskDone) {
    try {
      // Reference to the 'ProgressDevotional' collection
      const progressDevotionalColRef = collection(db, "ProgressDevotional");

      // Create a query to find the document based on userId and devotionalId
      const q = query(
        progressDevotionalColRef,
        where("userId", "==", task.userId),
        where("devotionalId", "==", task.devotionalId)
      );

      console.log("query", q);

      // Execute the query
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Assuming there's only one document that matches
        const documentRef = querySnapshot.docs[0].ref;

        // Update the document
        await updateDoc(documentRef, {
          // Assuming tasksDone is an array and coinsEarned is a number
          // Adjust based on your actual document structure
          tasksDone: arrayUnion(task.task),
          coinsEarned: 20,
        });
      } else {
        console.log("No matching document found");
      }
    } catch (error) {
      console.error(`Erro ao registrar devocional: ${error}`);
    }
  }
  async function getUserChaptersProgress(uid: string) {
    const q = query(
      collection(db, "ProgressChapter"),
      where("userId", "==", uid)
    );

    const querySnapshot = await getDocs(q);
    const chaptersProgressData = querySnapshot.docs.map((doc) => doc.data());

    setUserChaptersProgress(chaptersProgressData as ProgressChapter[]);
    return chaptersProgressData;
  }

  async function getDevotionals() {
    let q = query(collection(db, "Devotionals"));

    const querySnapshot = await getDocs(q);
    const devotionalsData = querySnapshot.docs.map((doc) => doc.data());

    setDevotionals(devotionalsData as Devotional[]);
    return devotionalsData;
  }

  return (
    <ServiceContext.Provider
      value={{
        devotionals,
        getDevotionals,
        userChaptersProgress,
        getUserChaptersProgress,
        addProgress,
        addDevotionalTaskDone,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
}

function useService() {
  const context = useContext(ServiceContext);

  return context;
}

export { ServicesProvider, useService };
