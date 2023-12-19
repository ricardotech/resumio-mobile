import * as yup from "yup";

export type UserData = {
  email: string;
  given_name: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
};

export const userDataSchema = yup.object().shape({
  email: yup.string().email().required(),
  given_name: yup.string().required(),
  id: yup.string().required(),
  locale: yup.string().required(),
  name: yup.string().required(),
  picture: yup.string().required(),
  verified_email: yup.boolean().required(),
});
