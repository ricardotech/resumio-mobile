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
  Timestamp,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
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
};

type ServiceProviderProps = {
  children: ReactNode;
};

export const ServiceContext = createContext({} as ServiceContextData);

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
