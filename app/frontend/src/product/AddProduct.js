import * as React from "react";
import Navbar from "../home/Navbar";
import CategoryTab from "../components/CategoryTab";
import Footer from "../components/Footer";
import { Formik, Form, Field } from "formik";
import {
  Button,
  createMuiTheme,
  Grid,
  LinearProgress,
  makeStyles,
  MenuItem,
  Paper,
  ThemeProvider,
} from "@material-ui/core";
import { TextField } from "formik-material-ui";

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
}));

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
  return errors;
};

const onSubmit = (values, { setSubmitting }) => {
  setTimeout(() => {
    setSubmitting(false);
    alert(JSON.stringify(values, null, 2));
  }, 500);
};

const ranges = [
  {
    value: "Electornics",
    label: "Electronics",
  },
  {
    value: "0-20",
    label: "0 to 20",
  },
  {
    value: "21-50",
    label: "21 to 50",
  },
  {
    value: "51-100",
    label: "51 to 100",
  },
];

function AddProduct() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Navbar />
        <CategoryTab />
        <Grid container direction="row" justify="center">
          <Grid item xs={8}>
            <Paper className={classes.paper}>
              <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={onSubmit}
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
                    />
                    <Field
                      component={TextField}
                      label="Number of available products"
                      name="stock"
                      variant="filled"
                    />
                    <Button
                      variant="contained"
                      component="label"
                      className={classes.Button}
                    >
                      Upload File
                      <input type="file" hidden />
                    </Button>
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
                      name="select"
                      label="Category"
                      select
                      variant="standard"
                      helperText="Please select Range"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    >
                      {ranges.map((option) => (
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
