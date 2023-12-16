import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../utils/firebaseConfig";
import { DocumentData } from "firebase/firestore";
import { getUserChaptersProgress } from "../firestore/services/Progress";
import { ProgressChapter } from "../firestore/models/Progress";

type ServiceContextData = {
  userChaptersProgress: ProgressChapter[] | undefined;
};

type ServiceProviderProps = {
  children: ReactNode;
};

export const ServiceContext = createContext({} as ServiceContextData);

function ServicesProvider({ children }: ServiceProviderProps) {
  const [userChaptersProgress, setUserChaptersProgress] =
    useState<ProgressChapter[]>();

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userChaptersProgress = await getUserChaptersProgress(user.uid);
        setUserChaptersProgress(userChaptersProgress as ProgressChapter[]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <ServiceContext.Provider
      value={{
        userChaptersProgress,
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
