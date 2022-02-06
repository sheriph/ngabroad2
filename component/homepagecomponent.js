import { Container, Grid,  Typography } from "@mui/material";
import React from "react";
import FeatureCard from "./featurescard";
import { useRouter } from "next/router";


const Homepage = () => {
  const router = useRouter();
  const features = [
    {
      p2: "Unbeatable flight deals to all destinations",
      p1: "Flight Booking",
      src: "/images/flight.svg",
    },
    {
      p1: "Hotel Booking",
      p2: "Get your confirmed hotel reservation online",
      src: "/images/hotel.svg",
    },
    {
      p1: "Travel Insurance",
      p2: "Get your travel insurance online within 5 minutes",
      src: "/images/insurance.svg",
    },
    {
      p1: "Study Abroad",
      p2: "Let our admission and visa experts make your dreams come true",
      src: "/images/school.svg",
    },
    {
      p1: "Visa Consultaion",
      p2: "Get expert help with your short-stay & long-stay visa processing",
      src: "/images/consultation.svg",
    },
  ];

  const tools = [
    {
      p1: "Embassy Finder",
      p2: "All embassies/consulates updated contact details",
      src: "/images/contactus.svg",
    },
    {
      p1: "School Finder",
      p2: "Find study programs with admission and visa processing info",
      src: "/images/schoolfinder.svg",
    },
    {
      p1: "Visa Eligibility",
      p2: "Get instant assessment on your eligibility for visa",
      src: "/images/vet.svg",
    },
  ];
  return (
    <Grid
      container
      component={Container}
      sx={{
        marginTop: "20px",
        marginBottom: "50px",
      }}
    >
      <Grid item xs={12} style={{ marginTop: "20px", marginBottom: "30px" }}>
        <Typography align="center">Services</Typography>
      </Grid>
      <Grid item container spacing={3}>
        {features.map(({ p1, p2, src }, index) => (
          <Grid
            onClick={(e) => {
              e.preventDefault();
              if (p1 === "Flight Booking") router.push("/contactus");
              if (p1 === "Hotel Booking") router.push("/contactus");
              if (p1 === "Travel Insurance")
                router.push("/interactive-order-platform");
              if (p1 === "Study Abroad") router.push("/studyabroad");
              if (p1 === "Visa Consultaion") router.push("/contactus");
            }}
            item
            key={index}
            xs={12}
            sm={6}
            style={{ cursor: "pointer" }}
          >
            <FeatureCard p1={p1} p2={p2} src={src} />
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12} style={{ marginTop: "40px", marginBottom: "30px" }}>
        <Typography align="center">Travel Tools</Typography>
      </Grid>
      <Grid item container spacing={3}>
        {tools.map(({ p1, p2, src }, index) => (
          <Grid
            onClick={(e) => {
              e.preventDefault();
              if (p1 === "Embassy Finder") router.push("/embassycontact");
              if (p1 === "School Finder") router.push("/studyabroad");
              if (p1 === "Visa Eligibility")
                router.push("/visa-eligibility-test");
            }}
            item
            key={index}
            xs={12}
            sm={6}
            style={{ cursor: "pointer" }}
          >
            <FeatureCard p1={p1} p2={p2} src={src} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Homepage;
