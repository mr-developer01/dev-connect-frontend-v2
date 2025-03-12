import { Button, Paper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { getValidationSchema } from "./YupValidation";
import registerUser from "../../hooks/authentication/useRegister";
import { useAppDispatch } from "../../store/hooks";
import { toggleModel } from "../../store/slices/toggleSlice";

const AuthForm = () => {
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
            formik.resetForm();
            dispatch(toggleModel(false));
          }
        });
      }

      if (!values.username) {
        registerUser({
          name: values.username,
          email: values.email,
          password: values.password,
        }).then((data) => {
          console.log(data);
          if (data.token) {
            formik.resetForm();
            dispatch(toggleModel(false));
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
