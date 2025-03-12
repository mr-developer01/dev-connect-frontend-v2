import { Button, Paper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { getValidationSchema } from "./YupValidation";
import registerUser from "../../utils/registerUser";
import { useAppDispatch } from "../../store/hooks";
import { toggleModel, toggleSnack } from "../../store/slices/toggleSlice";
import {
  setErrorState,
  setResMessage,
} from "../../store/slices/apiResponseSlice";
import { addUser } from "../../store/slices/userSlice";
import { useCookies } from "react-cookie";

const AuthForm = () => {
  const [cookies, setCookie] = useCookies(["user"]);
  const [isLogin, setIslogin] = useState(true);
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: getValidationSchema(isLogin),
    onSubmit: (values) => {
      if (values.username) {
        registerUser({
          name: values.username,
          email: values.email,
          password: values.password,
        }).then((data) => {
          console.log(data);
          if (data.token) {
            dispatch(toggleSnack(true));
            dispatch(setResMessage(`${data.name} welcome to Dev Team`));
            dispatch(addUser({name: data.name, email: data.email, _id: data._id}));
            setCookie("user", data.token);
            setTimeout(() => {
              formik.resetForm();
              dispatch(toggleModel(false));
            }, 2000);
          }
        });
      }

      if (!values.username) {
        registerUser({
          name: values.username,
          email: values.email,
          password: values.password,
        }).then((data) => {
          if (data.token) {
            console.log(data);
            dispatch(toggleSnack(true));
            dispatch(setResMessage(`${data.name} welcome to Dev Team`));
            dispatch(addUser({name: data.name, email: data.email, _id: data._id}));
            setCookie("user", data.token);
            setTimeout(() => {
              formik.resetForm();
              dispatch(toggleModel(false));
            }, 2000);
          }
          if (data.message) {
            dispatch(toggleSnack(true));
            dispatch(setErrorState(false));
            dispatch(setResMessage(data.message));
            setTimeout(() => {
              dispatch(setErrorState(true));
            }, 1500);
          }
        });
      }
    },
  });
  return (
    <>
      <Paper sx={{ px: 4, py: 4 }}>
        <Typography variant="h2" textAlign="center" gutterBottom>
          Login As Dev
        </Typography>
        <form className="auth-form" onSubmit={formik.handleSubmit}>
          {!isLogin && (
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          )}
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
          <Typography textAlign={"center"}>
            {isLogin ? "New to DEV Community ?" : "Already a Dev ?"}{" "}
            <Button
              onClick={() => {
                setIslogin((prev) => !prev);
                formik.resetForm();
              }}
            >
              {isLogin ? "SignUp" : "Signin"}
            </Button>
          </Typography>
        </form>
      </Paper>
    </>
  );
};

export default AuthForm;
