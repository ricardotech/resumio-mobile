import { Journey, JourneyCollection } from "./utils/types";

export const genesis = {
  resume: `No começo, Deus criou tudo: luz, terra, mar, estrelas e muitos animais. Ele também criou Adão e Eva e os colocou num lindo jardim chamado Éden. Mas eles desobedeceram a Deus comendo um fruto proibido e tiveram que sair do jardim.

Depois as pessoas no mundo ficaram muito más, Deus decidiu mandar um grande dilúvio para limpar a Terra. Mas Deus escolheu Noé porque ele era um homem bom e justo. Noé respeitava e obedecia a Deus, mesmo quando ninguém mais fazia isso. Por isso, Deus disse a Noé para construir uma arca grande para salvar sua família e dois de cada tipo de animal. Assim, mesmo com o dilúvio, Noé, sua família e os animais poderiam viver e começar tudo de novo. A história de Noé mostra que Deus cuida das pessoas que são boas e obedecem a Ele.
  
Depois do dilúvio, as pessoas começaram a construir uma cidade com uma torre muito alta, chamada Torre de Babel. Elas queriam que a torre chegasse até o céu para serem famosas e para não se separarem umas das outras. Mas Deus não gostou disso porque elas estavam tentando ser poderosas como Ele e não estavam espalhando pelo mundo como Deus queria. Então, Deus fez com que elas começassem a falar línguas diferentes. Como não conseguiam mais entender umas às outras, pararam de construir a torre e se espalharam pelo mundo. Isso mostra que Deus queria que as pessoas se espalhassem e enchessem a Terra, e não ficassem todas juntas num só lugar.
  
Então vem a história de Abraão, que é descendente de Noé. Deus escolheu Abraão para começar um povo especial. Deus prometeu que Abraão teria muitos descendentes e uma terra só para eles. Abraão confiou em Deus, mesmo quando era difícil. Depois de Abraão, vieram Isaque e Jacó, que também seguiram Deus. Jacó teve doze filhos, e um deles, José, viveu uma aventura grande. Seus irmãos o venderam, e ele foi parar no Egito. Mas Deus cuidou de José, e ele acabou ajudando muita gente, incluindo sua própria família.

Essas histórias de Gênesis mostram como Deus sempre cuida das pessoas e cumpre suas promessas. Mesmo quando as coisas parecem ruins, Deus tem um plano bom. Cada história nos ensina sobre confiar em Deus e viver do jeito certo.`,
  title: "O Começo de Tudo",
};

export const exodus = {
  resume: `A narrativa do Livro de Êxodo é uma jornada épica, começando nas sombrias sombras da escravidão no Egito e culminando na gloriosa liberdade sob a aliança de Deus com Israel no Monte Sinai. Esta saga começa com o povo de Israel, descendentes de Jacó, sofrendo sob o jugo da escravidão egípcia. O faraó, temendo o crescente número dos israelitas, ordena o assassinato de todos os recém-nascidos hebreus do sexo masculino.
  
Neste cenário sombrio, nasce Moisés, um bebê hebreu destinado à grandeza. Salvo providencialmente da morte e criado na corte egípcia, Moisés cresce entre duas culturas. Após matar um egípcio que maltratava um hebreu, ele foge para o deserto de Midiã, onde encontra refúgio e uma nova vida. É lá, diante de uma sarça ardente que não se consome, que Moisés encontra Deus, que o chama para libertar seu povo da escravidão.
  
Moisés, relutantemente, retorna ao Egito para confrontar o faraó com a demanda de Deus: "Deixe meu povo ir". O faraó, de coração endurecido, recusa-se, levando Deus a enviar uma série de dez pragas devastadoras sobre o Egito. Desde águas transformadas em sangue até a morte dos primogênitos egípcios, cada praga demonstra o poder de Deus e a impotência dos deuses egípcios. Finalmente, após a décima praga, o faraó cede, libertando os israelitas.
  
A fuga dos israelitas do Egito é marcada pelo milagre da travessia do Mar Vermelho, onde Deus divide as águas, permitindo que seu povo passe em terra seca, enquanto destrói o exército egípcio que os perseguia. Este evento se torna um símbolo central da redenção e poder divinos na tradição judaico-cristã.
  
No deserto, o povo de Israel enfrenta desafios e provações, incluindo a falta de comida e água. Deus milagrosamente provê maná do céu e água da rocha, mas o povo frequentemente murmura e questiona a liderança de Moisés e a bondade de Deus.
  
O ponto culminante do Êxodo ocorre no Monte Sinai, onde Deus estabelece Sua aliança com Israel. Ele dá a Moisés os Dez Mandamentos e instruções detalhadas para a construção do Tabernáculo, um lugar de adoração e presença divina no meio do povo. Durante este tempo, Israel comete um grande pecado ao construir e adorar um bezerro de ouro, demonstrando a contínua luta entre fidelidade e infidelidade a Deus.
  
O Livro de Êxodo é uma história de redenção, revelando um Deus que ouve o clamor de Seu povo e intervém de maneira poderosa para libertá-los. Mostra a formação de uma nação sob Deus, estabelecendo os alicerces da identidade, lei, e adoração de Israel. Êxodo não é apenas uma história do passado, mas um eco contínuo de esperança, lembrando-nos de que Deus é um libertador que chama seu povo para uma relação de aliança com Ele.`,
  title: "Da Escravidão à Liberdade",
};

const initialJourneysForOldTestament: Journey[] = [
  {
    id: "1",
    collectionId: "1",
    title: "Jornada pelos Livros da Lei",
    progress: 1,
    iconColor: "#4fc3f7",
    icon: "book-open-page-variant",
    description:
      "Explore os cinco primeiros livros da Bíblia para entender a fundação da fé judaico-cristã...",
  },
  {
    id: "2",
    collectionId: "1",
    progress: 0.1,
    iconColor: "#ffa726",
    icon: "book-open-page-variant",
    title: "Jornada pelos Profetas Maiores",
    description:
      "Mergulhe na vida e nas profecias dos profetas maiores do Antigo Testamento...",
  },
  {
    id: "3",
    collectionId: "1",
    progress: 0.1,
    iconColor: "#e57373",
    icon: "book-open-page-variant",
    title: "Jornada pelos Profetas Menores",
    description:
      "Explore as mensagens dos profetas menores do Antigo Testamento...",
  },
  {
    id: "4",
    collectionId: "1",
    progress: 0.1,
    iconColor: "#ffeb3b",
    icon: "book-open-page-variant",
    title: "Jornada pelos Salmos e Provérbios",
    description:
      "Aprofunde-se nos Salmos para descobrir canções de louvor e adoração...",
  },
  {
    id: "5",
    collectionId: "1",
    progress: 0.1,
    iconColor: "#4fc3f7",
    icon: "book-open-page-variant",
    title: "Jornada pela História de Davi",
    description:
      "Siga a vida de Davi desde sua unção como rei até sua jornada como salmista...",
  },
  {
    id: "6",
    collectionId: "1",
    progress: 0.1,
    iconColor: "#ffa726",
    icon: "book-open-page-variant",
    title: "Jornada pela História de Abraão",
    description:
      "Viaje com Abraão desde sua chamada por Deus para deixar sua terra até as promessas de Deus...",
  },
  {
    id: "7",
    collectionId: "1",
    progress: 0.1,
    iconColor: "#e57373",
    icon: "book-open-page-variant",
    title: "Jornada pelo Êxodo e a Páscoa",
    description:
      "Relembre a história do êxodo do povo de Israel do Egito, liderado por Moisés...",
  },
  {
    id: "8",
    collectionId: "1",
    progress: 0.1,
    iconColor: "#ffeb3b",
    icon: "book-open-page-variant",
    title: "Jornada pela Vida de José",
    description:
      "Siga a história de José, desde sua venda como escravo até se tornar governador do Egito...",
  },
  {
    id: "9",
    collectionId: "1",
    progress: 0.1,
    iconColor: "#4fc3f7",
    icon: "book-open-page-variant",
    title: "Jornada pelos Milagres do Antigo Testamento",
    description: "Estude os milagres registrados no Antigo Testamento...",
  },
  {
    id: "10",
    collectionId: "1",
    progress: 0.1,
    iconColor: "#ffa726",
    icon: "book-open-page-variant",
    title: "Jornada pelos Dez Mandamentos",
    description:
      "Explore os Dez Mandamentos dados por Deus a Moisés no Monte Sinai...",
  },
  {
    id: "11",
    collectionId: "1",
    progress: 0.1,
    iconColor: "#e57373",
    icon: "book-open-page-variant",
    title: "Jornada pelo Livro de Jó",
    description:
      "Analise a história de Jó e as questões teológicas e existenciais levantadas por seu sofrimento...",
  },
  {
    id: "12",
    collectionId: "1",
    progress: 0.1,
    iconColor: "#ffeb3b",
    icon: "book-open-page-variant",
    title: "Jornada pelos Reis de Israel e Judá",
    description:
      "Estude os reis de Israel e Judá, incluindo suas realizações e quedas...",
  },
  {
    id: "13",
    collectionId: "1",
    progress: 0.1,
    iconColor: "#4fc3f7",
    icon: "book-open-page-variant",
    title: "Jornada pela Criação e o Dilúvio",
    description: "Explore a narrativa da criação e o dilúvio global...",
  },
  {
    id: "14",
    collectionId: "1",
    progress: 0.1,
    iconColor: "#ffa726",
    icon: "book-open-page-variant",
    title: "Jornada pelo Livro de Rute",
    description:
      "Siga a história de Rute e Noemi, destacando temas de lealdade, providência divina e redenção...",
  },
  {
    id: "15",
    collectionId: "1",
    progress: 0.1,
    iconColor: "#e57373",
    icon: "book-open-page-variant",
    title: "Jornada pela Construção do Templo de Salomão",
    description:
      "Aprofunde-se na construção do Templo de Salomão e seu significado espiritual na história de Israel...",
  },
];

export const collectionOldTestament: JourneyCollection = {
  id: "1",
  name: "Jornada pelo Antigo Testamento",
  description:
    "Uma série de jornadas que abordam livros, profetas e eventos específicos do Antigo Testamento.",
  journeys: initialJourneysForOldTestament,
};

export const initialJourneysForPsalmsAndProverbs: Journey[] = [
  {
    id: "1",
    collectionId: "2",
    progress: 0.1,
    iconColor: "#4fc3f7",
    icon: "book-open-page-variant",
    title: "Jornada pelos Salmos de Louvor",
    description:
      "Explore os Salmos para momentos de louvor e adoração a Deus...",
  },
  {
    id: "2",
    collectionId: "2",
    progress: 0.1,
    iconColor: "#ffa726",
    icon: "book-open-page-variant",
    title: "Jornada pelos Salmos de Lamentação",
    description:
      "Reflicta sobre os Salmos que expressam lamentos e buscam consolo...",
  },
  {
    id: "3",
    collectionId: "2",
    progress: 0.1,
    iconColor: "#e57373",
    icon: "book-open-page-variant",
    title: "Jornada pelos Provérbios de Sabedoria",
    description:
      "Aprofunde-se nos Provérbios para obter sabedoria prática para a vida cotidiana...",
  },
  {
    id: "4",
    collectionId: "2",
    progress: 0.1,
    iconColor: "#ffeb3b",
    icon: "book-open-page-variant",
    title: "Jornada pelos Provérbios sobre Relacionamentos",
    description:
      "Estude os Provérbios que oferecem orientações para relacionamentos saudáveis...",
  },
  {
    id: "5",
    collectionId: "2",
    progress: 0.1,
    iconColor: "#4fc3f7",
    icon: "book-open-page-variant",
    title: "Jornada pelos Salmos de Gratidão",
    description:
      "Explore os Salmos que expressam gratidão e reconhecimento pelas bênçãos de Deus...",
  },
  {
    id: "6",
    collectionId: "2",
    progress: 0.1,
    iconColor: "#ffa726",
    icon: "book-open-page-variant",
    title: "Jornada pelos Salmos de Confiança",
    description:
      "Mergulhe nos Salmos que enfatizam a confiança em Deus em tempos de dificuldade...",
  },
  {
    id: "7",
    collectionId: "2",
    progress: 0.1,
    iconColor: "#e57373",
    icon: "book-open-page-variant",
    title: "Jornada pelos Salmos de Sabedoria",
    description:
      "Examine os Salmos que oferecem ensinamentos e conselhos práticos...",
  },
];

export const collectionPsalmsAndProverbs: JourneyCollection = {
  id: "2",
  name: "Jornada pelos Salmos e Provérbios",
  description:
    "Explore os Salmos para momentos de louvor e adoração, e os Provérbios para sabedoria prática.",
  journeys: initialJourneysForPsalmsAndProverbs,
};

export const allCollections: JourneyCollection[] = [
  collectionOldTestament,
  collectionPsalmsAndProverbs,
];
