import * as React from "react";
import { useState } from "react";
import Navbar from "../home/Navbar";
import CategoryTab from "../components/CategoryTab";
import Footer from "../components/Footer";
import { Formik, Form, Field, isInteger } from "formik";
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
import { Redirect } from "react-router-dom";

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
  alert: {
    display: "flex",
    width: "50ch",
    margin: theme.spacing(2),
  },
}));

function AddProduct() {
  const classes = useStyles();

  const [image, setImage] = useState(undefined);
  const [alertMessage, setAlertMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [subCat, setSubCat] = useState("");

  const initialValues = {
    name: "",
    price: "",
    stock: "",
    desc: "",
    image: undefined,
    category: undefined,
    subcategory: undefined,
    brand: "",
    discount: 0,
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    } else if (values.name.length < 3) {
      errors.name = "Name is too short";
    }

    if (!values.price) {
      errors.price = "Required";
    }

    // else if (!isInteger(values.price)) {
    //   errors.price = "Price must be a number";
    // } else if (values.price < 1) {
    //   errors.price = "Products must have a positive price";
    // }

    if (!values.stock) {
      errors.stock = "Required";
    } else if (!isInteger(values.stock)) {
      errors.stock = "This field must be a number";
    } else if (values.stock < 1) {
      errors.stock = "This field must have a positive value";
    }

    if (!values.desc) {
      errors.desc = "Required";
    } else if (values.desc.length < 10) {
      errors.desc = "Description is too short";
    } else if (values.desc.length > 499) {
      errors.desc = "Description is too long. Maximum limit is 500 characters.";
    }

    if (!values.category) {
      errors.category = "Required";
    } else {
      setSubCat(values.category);
    }

    if (!values.subcategory) {
      errors.subcategory = "Required";
    }

    if (!values.brand) {
      errors.brand = "Required";
    }

    return errors;
  };

  function handleResponse(res, setSubmitting) {
    try {
      const success = res.success;
      console.log(res);
      if (success) {
        console.log(res);
        setSuccessMessage("Product successfully created");
        setAlertMessage("");
      } else {
        setAlertMessage("Some error has occured");
      }
    } catch (error) {
      setAlertMessage("Connection problem");
    }
    setSubmitting(false);
  }

  const onSubmit = (values, { setSubmitting }) => {
    if (!image) {
      setAlertMessage("Image Required");
      setSubmitting(false);
      return;
    }
    const url = serverUrl + "api/products/opts/add/";
    const data = {
      name: values.name,
      price: values.price,
      stock: values.stock,
      description: values.desc,
      image_file: image,
      category_name: values.category,
      subcategory_name: values.subcategory,
      brand: values.brand,
      discount: values.discount,
    };

    postDataToken(url, data, localStorage.getItem("token"))
      .then((res) => handleResponse(res, setSubmitting))
      .catch((rej) => {
        setAlertMessage("Some error has occured");
        console.log(rej);
        setSubmitting(false);
      });

    setTimeout(() => {}, 500);
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
      value: "Personal",
      label: "Personal",
    },
    {
      value: "Sports&Outdoors",
      label: "Sports&Outdoors",
    },
    {
      value: "Hobbies&Books",
      label: "Hobbies",
    },
  ];

  const subCategories = {
    Electronics: [
      {
        label: "PC&Tablet",
        value: "PC&Tablet",
      },
      {
        label: "Smartphone",
        value: "Smartphone",
      },
      {
        label: "WhiteAppliances",
        value: "WhiteAppliances",
      },
      {
        label: "Photo&Camera",
        value: "Photo&Camera",
      },
      {
        label: "Game&GameConsole",
        value: "Game&GameConsole",
      },
    ],
    Fashion: [
      {
        label: "WomanClothing",
        value: "WomanClothing",
      },
      {
        label: "Accessory",
        value: "Accessory",
      },
      {
        label: "Sportswear",
        value: "Sportswear",
      },
      {
        label: "ManClothing",
        value: "ManClothing",
      },
      {
        label: "Shoes&Bags",
        value: "Shoes&Bags",
      },
    ],
    "Home&Kitchen": [
      {
        label: "Kitchenware",
        value: "Kitchenware",
      },
      {
        label: "Beds",
        value: "Beds",
      },
      {
        label: "Decoration",
        value: "Decoration",
      },
      {
        label: "OfficeFurniture",
        value: "OfficeFurniture",
      },
    ],
    "Personal": [
      {
        label: "Perfume",
        value: "Perfume",
      },
      {
        label: "Makeup",
        value: "Makeup",
      },
      {
        label: "SkinCare",
        value: "SkinCare",
      },
      {
        label: "OralCare",
        value: "OralCare",
      },
      {
        label: "HairCare",
        value: "HairCare",
      },
    ],
    "Sports&Outdoors": [
      {
        label: "SportClothing",
        value: "SportClothing",
      },
      {
        label: "Fitness",
        value: "Fitness",
      },
    ],
    "Hobbies&Books": [
      {
        label: "Book&Magazine",
        value: "Book&Magazine",
      },
      {
        label: "MusicalInstrument",
        value: "MusicalInstrument",
      },
      {
        label: "Art",
        value: "Art",
      },
    ],
  };

  const upload = (event, setImage) => {
    setImage(event.target.files[0]);
  };

  if (successMessage) {
    return <Redirect to="/" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Navbar />
        <CategoryTab />
        <Grid container direction="row" justify="center">
          <Grid item xs={8}>
            <Paper className={classes.paper}>
              {alertMessage && (
                <Alert className={classes.alert} severity="error">
                  {alertMessage}
                </Alert>
              )}
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
                      // onChange={(event) => setSubCat(event.target.value)}
                    >
                      {categories.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                    {subCat && (
                      <Field
                        component={TextField}
                        name="subcategory"
                        label="Subcategory"
                        select
                        variant="filled"
                        helperText="Please select a subcategory"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      >
                        {subCategories[subCat].map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Field>
                    )}
                    <Field
                      component={TextField}
                      label="Brand Name"
                      name="brand"
                      variant="filled"
                    />
                    <Field
                      component={TextField}
                      label="Discount Rate"
                      name="discount"
                      variant="filled"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">%</InputAdornment>
                        ),
                      }}
                    />
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
              {successMessage && (
                <Alert className={classes.alert} severity="success">
                  {successMessage}
                </Alert>
              )}
            </Paper>
          </Grid>
        </Grid>
        <Footer />
      </React.Fragment>
    </ThemeProvider>
  );
}

export default AddProduct;
