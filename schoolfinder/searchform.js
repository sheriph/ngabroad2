import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Collapse,
  Container,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import {
  LanguageOutlined,
  LibraryBooksOutlined,
  SchoolOutlined,
  SearchOutlined,
} from "@mui/icons-material";

import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRecoilState } from "recoil";
import { Autocomplete, Skeleton } from "@mui/material";
import { updateData } from "../component/utilityfx";
import { schools_, isloading_ } from "../state/recoil";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const styles = makeStyles((theme) => ({
  /*  skeleton: {
    width: "500px",
    [theme.breakpoints.down("xs")]: { width: "300px" },
  }, */
  gridItem: {
    display: "initial",
  },
}));

const SearchForm = ({ isAmp }) => {
  const classes = styles();
  const { register, handleSubmit, watch, errors, control } = useForm();
  const [school, setschools] = useRecoilState(schools_);

  const [isloading, setisloading] = useRecoilState(isloading_);
  const [enter, setenter] = useState(false);

  const [options, setOptions] = useState(null);

  const onSubmit = (data) => {
    setisloading(true);
    const { country, field, level } = data;
    if (country.length === 0 || field.length === 0 || level.length === 0) {
      toast.error("Please select options in country, field and level");
      setisloading(false);

      return;
    }

    console.log(data);
    axios
      .post("/api/getschools", data)
      .then((response) => {
        setisloading(false);
        console.log(response);
        const { error, results } = response.data;
        if (results) {
          setschools(results);
        } else {
          throw new Error(error);
        }
      })
      .catch((error) => {
        setisloading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    let isloading = true;
    axios
      .get("/api/getfilter")
      .then((response) => {
        console.log(response);
        if (response.data.results) {
          if (isloading) setOptions(response.data.results);
        } else {
          throw new Error(response.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      isloading = false;
    };
  }, []);

  if (!options)
    return (
      <Grid container justifyContent="center">
        <Grid item component={Paper} xs={12}>
          <Skeleton animation="wave" variant="rectangular" height={140} />
        </Grid>
      </Grid>
    );

  const getDegreeOptions = (option) => {
    return Array.from(new Set(option.map((data) => updateData(data))))
      .map((data) => ({
        academiclevel: data,
      }))
      .filter((item) => item.academiclevel !== "null");
  };

  return (
    <Container maxWidth={false} disableGutters>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Autocomplete
              options={options[0]}
              getOptionLabel={(option) => option.country}
              onChange={(e, value, action) => {
                if (action === "selectOption") {
                  // getfilter();
                }
              }}
              noOptionsText="Please select a country from the list"
              renderInput={(params) => (
                <TextField
                  // className={classes.textField}
                  {...params}
                  label="Select a Country"
                  variant="outlined"
                  inputRef={register}
                  name="country"
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              //  disabled={field.length === 0}
              options={options[1]
                .map((item) => {
                  if (item.level.length > 1) {
                    return item;
                  } else {
                    return { level: "Others" };
                  }
                })
                .filter((item) => item.level !== "Others")}
              getOptionLabel={(option) => option.level}
              onChange={(e, value, action) => {
                if (action === "selectOption") {
                }
              }}
              noOptionsText="Please Select a Field of Study"
              renderInput={(params) => (
                <TextField
                  // className={classes.textField}
                  {...params}
                  label="Select a Field"
                  variant="outlined"
                  inputRef={register}
                  name="field"
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              // disabled={level.length === 0}
              options={getDegreeOptions(options[2])}
              getOptionLabel={(option) => option.academiclevel}
              onChange={(e, value, action) => {
                if (action === "selectOption") {
                }
              }}
              noOptionsText="Please select a level from the list"
              renderInput={(params) => (
                <TextField
                  // className={classes.textField}
                  {...params}
                  label="Select a Level"
                  variant="outlined"
                  inputRef={register}
                  name="level"
                />
              )}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              type="submit"
              variant="contained"
              startIcon={<SearchOutlined />}
              size="large"
              style={{ height: "55px" }}
              color="primary"
            >
              SEARCH
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SearchForm;
