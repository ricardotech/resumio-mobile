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
  DevotionalProgress,
  ProgressChapter,
  progressChapterSchema,
} from "../firestore/models/Progress";
import { useAuth } from "./auth.context";
import { Devotional } from "../firestore/models/Devotional";
import { UserStreak } from "../firestore/models/Streak";
import moment from "moment";

type ServiceContextData = {
  loadingServices: boolean;
  userStreak: UserStreak | undefined;
  coinsEarned: number | undefined;
  devotionals: Devotional[] | undefined;
  devotionalsProgress: DevotionalProgress[] | undefined;
  getDevotionals: () => Promise<DocumentData[] | undefined>;
  userChaptersProgress: ProgressChapter[] | undefined;
  getUserChaptersProgress: (uid: string) => Promise<DocumentData[] | undefined>;
  getUserDevotionalProgress: (
    uid: string
  ) => Promise<DevotionalProgress[] | undefined>;
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
  const [loadingServices, setLoadingServices] = useState(false);

  const [userChaptersProgress, setUserChaptersProgress] =
    useState<ProgressChapter[]>();

  const [userStreak, setUserStreak] = useState<UserStreak>();
  const [coinsEarned, setCoinsEarned] = useState(0);

  const [devotionals, setDevotionals] = useState<Devotional[]>();
  const [devotionalsProgress, setDevotionalsProgress] =
    useState<DevotionalProgress[]>();

  const { user } = useAuth();

  useEffect(() => {
    async function loadServices() {
      if (user) {
        setLoadingServices(true);
        await getDevotionals().then(async () => {
          await getUserChaptersProgress(user.id).then(async () => {
            await getUserDevotionalProgress(user.id).then(
              async (devotionalProgresses) => {
                await getUserCoins(devotionalProgresses).then(async () => {
                  await updateUserStreak(user.id).then(() => {
                    getUserStreak(user.id).then((userStreakData) => {
                      setUserStreak(userStreakData);
                    });
                  });
                });
              }
            );
          });
        });
        setLoadingServices(false);
      }
    }
    loadServices();
  }, [user]);

  async function getUserStreak(uid: string) {
    const q = query(collection(db, "userStreaks"), where("userId", "==", uid));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      setUserStreak(querySnapshot.docs[0].data() as UserStreak);
      return querySnapshot.docs[0].data() as UserStreak;
    }

    return undefined;
  }

  const updateUserStreak = async (uid: string) => {
    const userStreakData = await getUserStreak(uid);
    const today = moment().startOf("day");
    const now = moment()

    if (userStreakData) {
      // the reason why this code is not working is because the userStreakData.lastActiveDate is returning a Firebase Timestamp { nanoseconds, seconds }
      const lastActiveDate = new Date(
        userStreakData.lastActiveDate.seconds * 1000
      );
      const lastActive = moment(lastActiveDate).startOf("day");
      const diffInDays = today.diff(lastActive, "days");
      console.log(diffInDays);

      if (diffInDays == 1) {
        // If last active was yesterday, increment current streak
        userStreakData.currentStreak += 1;
      } else if (diffInDays > 1) {
        // If last active was more than a day ago, reset current streak
        userStreakData.currentStreak = 1;
      }

      // Update longest streak if necessary
      userStreakData.longestStreak = Math.max(
        userStreakData.currentStreak,
        userStreakData.longestStreak
      );

      // Update last active date and streak history
      userStreakData.lastActiveDate = now.toDate();
      userStreakData.streakHistory.push({
        date: now.toDate(),
        streakCount: userStreakData.currentStreak,
      });

      // Update Firestore document
      const userStreakDocRef = doc(db, "userStreaks", uid);
      await updateDoc(userStreakDocRef, { ...userStreakData });
    } else {
      // Create a new streak record for new user
      const newUserStreak = {
        userId: uid,
        currentStreak: 1,
        longestStreak: 1,
        lastActiveDate: today.toDate(),
        streakHistory: [{ date: today.toDate(), streakCount: 1 }],
      };
      await setDoc(doc(db, "userStreaks", uid), newUserStreak);
    }
  };

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

  async function getUserDevotionalProgress(uid: string) {
    const q = query(
      collection(db, "ProgressDevotional"),
      where("userId", "==", uid)
    );

    const querySnapshot = await getDocs(q);
    const devotionalsProgressData = querySnapshot.docs.map((doc) => doc.data());

    setDevotionalsProgress(devotionalsProgressData as DevotionalProgress[]);
    return devotionalsProgressData as DevotionalProgress[];
  }

  async function getUserCoins(devotionalsProgress: DevotionalProgress[]) {
    if (devotionalsProgress) {
      const coins = devotionalsProgress.reduce((acc, item) => {
        return acc + item.coinsEarned;
      }, 0);

      setCoinsEarned(coins);
      return coins;
    }
  }

  return (
    <ServiceContext.Provider
      value={{
        userStreak,
        loadingServices,
        coinsEarned,
        devotionals,
        devotionalsProgress,
        getDevotionals,
        userChaptersProgress,
        getUserChaptersProgress,
        getUserDevotionalProgress,
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
