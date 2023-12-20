import * as yup from "yup";

export type Devotional = {
  id: string;
  data: string;
  tema: string;
  passagem_biblica: string;
  texto: string;
  reflexao: string;
  aplicacao: string;
  oracao: string;
  exemplos_atuais: string[];
};

export const devotionalSchema = yup.object().shape({
  data: yup.string().required("A data é obrigatória."),
  tema: yup.string().required("O tema é obrigatório."),
  passagem_biblica: yup.string().required("A passagem bíblica é obrigatória."),
  texto: yup.string().required("O texto é obrigatório."),
  reflexao: yup.string().required("A reflexão é obrigatória."),
  aplicacao: yup.string().required("A aplicação é obrigatória."),
  oracao: yup.string().required("A oração é obrigatória."),
  exemplos_atuais: yup
    .array()
    .of(yup.string())
    .required("Exemplos atuais são obrigatórios."),
});
