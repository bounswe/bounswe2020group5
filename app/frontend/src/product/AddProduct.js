import * as React from "react";
import { useState } from "react";
import Navbar from "../home/Navbar";
import CategoryTab from "../components/CategoryTab";
import Footer from "../components/Footer";
import { Formik, Form, Field } from "formik";
import {
  Button,
  createMuiTheme,
  Grid,
  InputAdornment,
  LinearProgress,
  makeStyles,
  MenuItem,
  Paper,
  ThemeProvider,
} from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { serverUrl } from "../common/ServerUrl";
import { postDataToken } from "../common/Requests";
import Alert from "@material-ui/lab/Alert";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#A71425",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  formRoot: {
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "center",
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "50ch",
    },
  },
  Button: {
    margin: theme.spacing(4),
    width: "50ch",
  },
  paper: {
    // display: "flex",
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(2),
    alignItems: "center",
    flexDirection: "column",
    display: "flex",
  },
  text: {
    margin: theme.spacing(1),
    height: "56px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    fontSize: 24,
  },
  progress: {
    width: "50ch",
  },
  image: {
    width: "50ch",
    margin: theme.spacing(2),
  },
  alert1: {
    display: "flex",
    width: "50ch",
    margin: theme.spacing(2),
  },
}));

function AddProduct() {
  const classes = useStyles();

  const [image, setImage] = useState(undefined);
  const [alertMessage, setAlertMessage] = useState("some");

  const initialValues = {
    name: "",
    price: "",
    stock: "",
    desc: "",
    image: undefined,
    category: undefined,
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    } else if (values.name.length < 3) {
      errors.name = "Name is too short";
    }

    // if (!values.image) {
    //   errors.image = "Required";
    //   console.log(errors);
    //   console.log(values);
    // }
    return errors;
  };

  function handleResponse(res) {
    try {
      const token = true;
      if (token) {
        console.log("Response: ");
        console.log(res);
      } else {
        console.log("Invalid credentials");
      }
    } catch (error) {
      console.log("Some error has occured");
    }
  }

  const onSubmit = (values, image, { setSubmitting }) => {
    const url = serverUrl + "api/products/opts/add/";
    const data = {
      name: values.name,
      price: values.price,
      stock: values.stock,
      description: values.desc,
      image_file: image,
      category_name: values.category,
    };

    postDataToken(url, data, localStorage.getItem("token"))
      .then(handleResponse)
      .catch((rej) => {
        console.log("Some error has occured");
        console.log(rej);
      });

    setTimeout(() => {
      setSubmitting(false);
    }, 500);
  };

  const categories = [
    {
      value: "Electronics",
      label: "Electronics",
    },
    {
      value: "Fashion",
      label: "Fashion",
    },
    {
      value: "Home&Kitchen",
      label: "Home&Kitchen",
    },
    {
      value: "Personal Care",
      label: "Personal Care",
    },
    {
      value: "Sports&Outdoors",
      label: "Sports&Outdoors",
    },
    {
      value: "Hobbies&Books",
      label: "Hobbies&Books",
    },
  ];

  const upload = (event, setImage) => {
    setImage(event.target.files[0]);
  };

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Navbar />
        <CategoryTab />
        <Grid container direction="row" justify="center">
          <Grid item xs={8}>
            <Paper className={classes.paper}>
              {alertMessage && (
                <Alert className={classes.alert1} severity="error">
                  {alertMessage}
                </Alert>
              )}
              <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={(values, { setSubmitting }) =>
                  onSubmit(values, image, { setSubmitting })
                }
              >
                {({ submitForm, isSubmitting }) => (
                  <Form className={classes.formRoot} autoComplete="off">
                    <Field
                      component={TextField}
                      label="Name"
                      name="name"
                      variant="filled"
                    />
                    <Field
                      component={TextField}
                      label="Price"
                      name="price"
                      variant="filled"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                    />
                    <Field
                      component={TextField}
                      label="Number of available products"
                      name="stock"
                      variant="filled"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">Piece</InputAdornment>
                        ),
                      }}
                    />
                    <Button
                      variant="contained"
                      component="label"
                      className={classes.Button}
                      onChange={(event) => upload(event, setImage)}
                    >
                      Upload Image
                      <input type="file" hidden />
                    </Button>
                    {image && (
                      <img
                        className={classes.image}
                        src={image ? URL.createObjectURL(image) : null}
                      />
                    )}
                    <Field
                      component={TextField}
                      label="Description"
                      name="desc"
                      variant="filled"
                      multiline
                      rows={4}
                    />
                    <Field
                      component={TextField}
                      name="category"
                      label="Category"
                      select
                      variant="filled"
                      helperText="Please select category"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    >
                      {categories.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                    {isSubmitting && (
                      <LinearProgress className={classes.progress} />
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      onClick={submitForm}
                      className={classes.Button}
                    >
                      Submit
                    </Button>
                  </Form>
                )}
              </Formik>
            </Paper>
          </Grid>
        </Grid>
        <Footer />
      </React.Fragment>
    </ThemeProvider>
  );
}

export default AddProduct;
