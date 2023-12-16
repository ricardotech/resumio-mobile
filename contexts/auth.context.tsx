import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { Axios, AxiosInstance, AxiosStatic } from "axios";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { app } from "../utils/firebaseConfig";
import Toast from "react-native-toast-message";

type User = {
  uid?: string;
  email?: string;
  emailVerified?: boolean;
  displayName?: string;
  isAnonymous?: boolean;
  photoURL?: string;
  providerData?: {
    providerId: string;
    uid: string;
    displayName: string;
    email: string;
    phoneNumber: string | null;
    photoURL: string;
  }[];
  stsTokenManager?: {
    refreshToken: string;
    accessToken: string;
    expirationTime: number;
  };
  createdAt?: string;
  lastLoginAt?: string;
  apiKey?: string;
  appName?: string;
};

type Error = {
  error: string;
  status: string;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type SignUpCredentials = {
  name: string;
  username?: string;
  email: string;
  thumbnail?: string;
  password: string;
};

type AuthContextData = {
  user: User | undefined | null;
  error: Error | undefined | null;
  signIn: (credentials: SignInCredentials) => Promise<any>;
  signUp: (credentials: SignUpCredentials) => Promise<any>;
  signOut: () => Promise<void>;
  changeProfileImage: (image: string) => Promise<void>;
  loadUser: () => Promise<void>;
  updateUser: (nome: string, email: string, senha: string) => Promise<void>;
  verificationEmail: () => void;
  loading: boolean;
  token: string;
  api: AxiosInstance;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const USER = "@Auth:user";
export const TOKEN = "@Auth:token";

export const AuthContext = createContext({} as AuthContextData);

async function signOut() {
  await AsyncStorage.removeItem(TOKEN);
  await AsyncStorage.removeItem(USER);
}

const api = axios.create();
const API_URL = "https://membros-375000.rj.r.appspot.com";
api.defaults.baseURL = API_URL;

async function handleApi() {
  const storaged_token = await AsyncStorage.getItem(TOKEN);

  api.defaults.headers.common["Authorization"] = `Bearer ${storaged_token}`;
  api.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (
        typeof error.response === "undefined" ||
        [401, 419].includes(error.response.status)
      ) {
        signOut();
      }
      return Promise.reject(error);
    }
  );
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>();
  const [token, setToken] = useState<string>("");

  const [error, setError] = useState<Error | null>(null);

  const [loading, setLoading] = useState(false);

  const auth = getAuth(app);

  useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = await AsyncStorage.getItem(USER);
      const storagedToken = await AsyncStorage.getItem(TOKEN);
      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        setToken(JSON.stringify(TOKEN));
      }

      loadUser();
    }

    loadStoragedData();
  }, []);

  useEffect(() => {
    if (error !== null) {
      setTimeout(() => {
        setError(null);
      }, 1250);
    }
  }, [error]);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      setLoading(true);

      const res = await signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;

          AsyncStorage.setItem(TOKEN, user.refreshToken);
          AsyncStorage.setItem(USER, JSON.stringify(user));
          setToken(user.refreshToken);
          setUser({
            uid: String(user.uid),
            displayName: String(user.displayName),
            email: String(user.email),
            photoURL: String(user.photoURL),
          });
          setLoading(false);
          return user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          return {
            errorCode,
            errorMessage,
          };
        });

      return res;
    } catch (error: any) {
      setLoading(false);
      return error;
    }
  }

  async function signUp({
    name,
    username,
    thumbnail,
    email,
    password,
  }: SignUpCredentials) {
    try {
      setLoading(true);

      const res = await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          console.log(JSON.stringify(user));

          await updateProfile(user, {
            displayName: name,
            photoURL: thumbnail,
          });

          AsyncStorage.setItem(TOKEN, user.refreshToken);
          AsyncStorage.setItem(USER, JSON.stringify(user));
          setToken(user.refreshToken);
          setUser({
            uid: user.uid,
            displayName: String(user.displayName),
            email: String(user.email),
          });
          setLoading(false);
          return user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          return {
            errorCode,
            errorMessage,
          };
        });

      return res;
    } catch (error: any) {
      setLoading(false);
      return error;
    }
  }

  async function signOut() {
    AsyncStorage.removeItem(USER).then(() => {
      setUser(null);
    });
    AsyncStorage.removeItem(TOKEN).then(() => {
      setUser(null);
    });
    await auth.signOut();
  }

  async function updateUser(nome: string, email: string, senha: string) {
    const user = getAuth().currentUser;

    if (user) {
      try {
        updateProfile(user, {
          displayName: nome,
        });
        updateEmail(user, email);
        updatePassword(user, senha);
      } catch (error) {
        console.log(error);
      }
    }
  }
  function checkEmailVerified() {
    const user = getAuth().currentUser;
    if (user) {
      return user.emailVerified;
    }
  }
  function verificationEmail() {
    const user = getAuth().currentUser;
    const isVerified = checkEmailVerified();
    if (user && !isVerified) {
      sendEmailVerification(user)
        .then(() => {
          console.log("Email enviado");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  async function loadUser() {
    const user = getAuth().currentUser;

    if (user) {
      console.log(JSON.stringify(user));
      setUser({
        uid: user.uid,
        displayName: String(user.displayName),
        email: String(user.email),
        photoURL: String(user.photoURL),
      });
    }
  }

  async function changeProfileImage(image: string) {
    const user = getAuth().currentUser;

    if (user) {
      await updateProfile(user, {
        photoURL: image,
      });
      setUser({
        uid: user.uid,
        displayName: String(user.displayName),
        email: String(user.email),
        photoURL: image,
      });
    }
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        error,
        signIn,
        signUp,
        signOut,
        changeProfileImage,
        loadUser,
        updateUser,
        verificationEmail,
        loading,
        api,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth, signOut, handleApi };
