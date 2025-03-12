import * as yup from "yup";

export const getValidationSchema = (isLogin: boolean) =>
  yup.object().shape({
    username: isLogin
      ? yup.string().notRequired()
      : yup
          .string()
          .min(5, "Username should be of minimum 5 characters length")
          .required("Username is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });
