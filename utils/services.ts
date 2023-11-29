import * as ImagePicker from "expo-image-picker";
import data from "../assets/acf.json"
import removeAcentos from "./removeAcentos";

export const pickProfileImage = async (changeProfileImage: any) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [10, 10],
    quality: 1,
  });

  if (!result.canceled) {
    changeProfileImage(result.assets[0].uri);
  }
};

// Pegar os dados do JSON da biblia
const books: string[] = [
  'genesis',
  'exodo',
  'levitico',
  'numeros',
  'deuteronomio',
  'josue',
  'juizes',
  'rute',
  '1samuel',
  '2samuel',
  '1reis',
  '2reis',
  '1cronicas',
  '2cronicas',
  'esdras',
  'neemias',
  'ester',
  'jo',
  'salmos',
  'proverbios',
  'eclesiastes',
  'cantares',
  'isaias',
  'jeremias',
  'lamentacoes',
  'ezequiel',
  'daniel',
  'oseias',
  'joel',
  'amos',
  'obadias',
  'jonas',
  'miqueias',
  'naum',
  'habacuque',
  'sofonias',
  'ageu',
  'zacarias',
  'malaquias',
  'mateus',
  'marcos',
  'lucas',
  'joao',
  'atos',
  'romanos',
  '1corintios',
  '2corintios',
  'galatas',
  'efesios',
  'filipenses',
  'colossenses',
  '1tessalonicenses',
  '2tessalonicenses',
  '1timoteo',
  '2timoteo',
  'tito',
  'filemom',
  'hebreus',
  'tiago',
  '1pedro',
  '2pedro',
  '1joao',
  '2joao',
  '3joao',
  'judas',
  'apocalipse'
]

const bookToNumber = (book: string): number => {
  return books.indexOf(removeAcentos(book)) + 1;
}

export const fetchData = (book: string, chapter: number, verse?: number): any => {
  const number = bookToNumber(book.toLowerCase());
  if( verse === undefined ) {
      return data[number - 1].chapters[chapter - 1];
  }
  return data[number - 1].chapters[chapter - 1][verse - 1];
}