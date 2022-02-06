import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { CloseRounded, SendOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CircularIntegration from "./animateprogress";
import { makeStyles } from "@mui/styles";



const EditEmbassy = ({ title, setOpenModal }) => {
  const [save, setSave] = useState(false);
  const { register, handleSubmit, watch, errors } = useForm();
  const [data, setData] = useState(null);
  const onSubmit = (data) => {
    console.log("embasydata", data);
    setData(data);
    setSave(true);
    setSubmitted(true);
  };
  const [submitted, setSubmitted] = useState(false);
  const theme = useTheme()
  const styles = makeStyles(() => ({
    box: {
      width: "80%",
      [theme.breakpoints.down('md')]: { width: "100%" },
    },
  }));
  const classes = styles();

  return (
    <Box
      sx={{ bgcolor: "background.paper", p: "10px", width: "80%" }}
      className={classes.box}
      component={Container}
    >
      <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={() => setOpenModal(false)} color="primary" size="large">
          <CloseRounded />
        </IconButton>
      </Box>
      {submitted ? (
        <Grid
          container
          style={{ paddingBottom: "20px" }}
          justifyContent="center"
          alignItems="center"
          alignContent="center"
        >
          <Grid
            item
            xs={12}
            style={{ marginBottom: "20px", minHeight: "300px" }}
          >
            <CircularIntegration
              save={save}
              setSave={setSave}
              data={data}
              title={title}
            />
          </Grid>
        </Grid>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container sx={{ paddingBottom: "20px" }}>
            <Grid item xs={12} sx={{ marginBottom: "20px" }}>
              <Typography>
                Has the <strong>{title}</strong> updated their contact details ?
              </Typography>
              <Typography>
                Please support us by providing the updated info below:
              </Typography>
            </Grid>
            <Grid item container spacing={3} justifyContent="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Address"
                  variant="outlined"
                  inputRef={register}
                  name="address"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  inputRef={register}
                  name="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Primary Phone Number"
                  variant="outlined"
                  inputRef={register}
                  name="phone1"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Secondary Phone Number"
                  variant="outlined"
                  inputRef={register}
                  name="phone2"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  multiline
                  rows={5}
                  fullWidth
                  label="More Information"
                  variant="outlined"
                  inputRef={register}
                  name="info"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  endIcon={<SendOutlined />}
                  variant="contained"
                  color="primary"
                >
                  SEND UPDATE REQUEST
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      )}
    </Box>
  );
};

export default EditEmbassy;
