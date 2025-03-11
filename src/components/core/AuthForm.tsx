import { Button, Paper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { validationSchema } from "./YupValidation";
import { useState } from "react";

const AuthForm = () => {
  const [isLogin, setIslogin] = useState(true);
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
            <Button onClick={() => setIslogin((prev) => !prev)}>
              {isLogin ? "SignUp" : "Signin"}
            </Button>
          </Typography>
        </form>
      </Paper>
    </>
  );
};

export default AuthForm;
