import * as React from "react";
import toast from "react-hot-toast";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import login from "../images/login.jpg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        GymMaster
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  let navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = (values) => {
    if(values.email=="admin@gmail.com"&& values.password=="1234"){
      navigate("./dashboard");
    }
    else{
      const responses = axios

      .post(`http://localhost:8020/user/login`, {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        navigate("/home");
      });
    }
    
   
  };

  return (
    <section className="flex  h-screen">
      <div className="w-2/3">
        <img className="h-screen" src={login} alt="Login image" />
      </div>
      <div className="w-1/3 ">
        <div className="p-10">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="flex-col w-full">
                  <div className="ll">
                    {" "}
                    <p className="font-semibold">Email</p>
                  </div>
                  <div className="ll">
                    {" "}
                    <Field
                      className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                      type="email"
                      name="email"
                    />
                  </div>

                  <ErrorMessage
                    component="div"
                    className="text-red-500 text-xs"
                    name="email"
                  />
                </div>

                <div className="flex-col">
                  <div className="ll">
                    {" "}
                    <p className="font-semibold">Password</p>
                  </div>
                  <div className="ll">
                    {" "}
                    <Field
                      className="border border-grey-dark text-sm p-3 my-1 rounded-md w-full"
                      type="password"
                      name="password"
                    />
                  </div>

                  <ErrorMessage
                    component="div"
                    className="text-red-500 text-xs italic"
                    name="password"
                  />
                </div>

                <button
                  className="bg-black text-white w-full py-2 mt-2 hover:bg-white hover:text-black border-2
                "
                  type="submit"
                >
                  Login
                </button>
                <div className="text-center mt-3">
                  <a
                    href="/register"
                    variant="body2"
                    className="text-black underline"
                  >
                    {"Don't have an account? Sign Up"}
                  </a>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
}
