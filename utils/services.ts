import * as ImagePicker from "expo-image-picker";
import data from "../assets/acf.json";
import removeAcentos from "./removeAcentos";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { app, storage } from "./firebaseConfig";

// export const pickProfileImage = async () => {
//   let result = await ImagePicker.launchImageLibraryAsync({
//     mediaTypes: ImagePicker.MediaTypeOptions.Images,
//     allowsEditing: true,
//     aspect: [10, 10],
//     quality: 1,
//     base64: true,
//   });

//   if (!result.canceled) {
//     return {
//       base64: result.assets[0].base64,
//       uri: result.assets[0].uri,
//       name: result.assets[0].uri.split("/").pop(),
//     };
//     // changeProfileImage(result.assets[0].uri);
//   }
// };

// // Upload image to firebase
// export async function uploadImageAsync(uri: string, path: string, name: string) {
//   const response = await fetch(uri);
//   const blob = await response.blob();

//   const storageRef = ref(storage, path + "/" + name);
//   const uploadTask = uploadBytesResumable(storageRef, blob);

//   uploadTask.on(
//     "state_changed",
//     (snapshot) => {
//       // Observe state change events such as progress, pause, and resume
//       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//       const progress =
//         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       console.log("Upload is " + progress + "% done");
//       switch (snapshot.state) {
//         case "paused":
//           console.log("Upload is paused");
//           break;
//         case "running":
//           console.log("Upload is running");
//           break;
//       }
//     },
//     (error) => {
//       // Handle unsuccessful uploads
//     },
//     () => {
//       // Handle successful uploads on complete
//       // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//       const url = getDownloadURL(uploadTask.snapshot.ref).then(
//         (downloadURL) => {
//           console.log("File available at", downloadURL);
//           return downloadURL;
//         }
//       );

//       return url;
//     }
//   );
// }

export const changeProfileImageFunc = async (
  usuario: any,
  setUploadProgress: any,
  loadUser: any,
  changeProfileImage: any
) => {
  let res = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [3, 4],
    quality: 0.1,
  });

  if (!res.canceled) {
    const response = await fetch(res.assets[0].uri);
    const blob = await response.blob();

    const storageRef = ref(storage, `users/${usuario?.id}/profile.jpg`);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          changeProfileImage(downloadURL);
          setUploadProgress(0);
        });
      }
    );
  }
};

// Pegar os dados do JSON da biblia
const books: string[] = [
  "genesis",
  "exodo",
  "levitico",
  "numeros",
  "deuteronomio",
  "josue",
  "juizes",
  "rute",
  "1samuel",
  "2samuel",
  "1reis",
  "2reis",
  "1cronicas",
  "2cronicas",
  "esdras",
  "neemias",
  "ester",
  "jo",
  "salmos",
  "proverbios",
  "eclesiastes",
  "cantares",
  "isaias",
  "jeremias",
  "lamentacoes",
  "ezequiel",
  "daniel",
  "oseias",
  "joel",
  "amos",
  "obadias",
  "jonas",
  "miqueias",
  "naum",
  "habacuque",
  "sofonias",
  "ageu",
  "zacarias",
  "malaquias",
  "mateus",
  "marcos",
  "lucas",
  "joao",
  "atos",
  "romanos",
  "1corintios",
  "2corintios",
  "galatas",
  "efesios",
  "filipenses",
  "colossenses",
  "1tessalonicenses",
  "2tessalonicenses",
  "1timoteo",
  "2timoteo",
  "tito",
  "filemom",
  "hebreus",
  "tiago",
  "1pedro",
  "2pedro",
  "1joao",
  "2joao",
  "3joao",
  "judas",
  "apocalipse",
];

const bookToNumber = (book: string): number => {
  return books.indexOf(removeAcentos(book)) + 1;
};

export const fetchData = (
  book: string,
  chapter: number,
  verse?: number
): any => {
  return new Promise((resolve, reject) => {
    const number = bookToNumber(book.toLowerCase());
    if (verse === undefined) {
      return resolve({
        chapter: data[number - 1].chapters[chapter - 1],
        chapternumber: data[number - 1].chapters.length,
      });
    }
    if (number === -1) {
      reject("Livro não encontrado");
    } else if (chapter > data[number - 1].chapters.length) {
      reject("Capítulo não encontrado");
    } else if (verse > data[number - 1].chapters[chapter - 1].length) {
      reject("Versículo não encontrado");
    }
    return resolve({
      data: data[number - 1].chapters[chapter - 1][verse - 1],
    });
  });
};

export function removeAccents(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
