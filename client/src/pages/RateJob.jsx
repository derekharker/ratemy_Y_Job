import { useState } from "react";
import { TextField, Button, Box, Stack, Autocomplete } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RateMyJobReview = () => {
  const [jobTitle, setJobTitle] = useState(null);
  const [department, setDepartment] = useState(null);
  const [rating, setRating] = useState(1);
  const [supervisorRating, setSupervisorRating] = useState(1);
  const [comment, setComment] = useState("");
  const [pay, setPay] = useState("");
  const jobs = [
    "Software Engineer",
    "Data Analyst",
    "Product Manager",
    "UX Designer",
  ];
  const departments = ["Engineering", "Data Science", "Product", "Design"];

  const handleSubmit = (event) => {
    event.preventDefault();
    const reviewData = {
      jobTitle,
      department,
      rating,
      supervisorRating,
      comment,
      pay,
    };
    // Send review data to the server
    console.log("Review submitted:", reviewData);
  };

  return (
    <>
      <Navbar />
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <h1>Job Review</h1>
        <form onSubmit={handleSubmit}>
          <Stack direction="column" spacing={2}>
            <Autocomplete
              id="job_title"
              options={jobs}
              value={jobTitle}
              onChange={(event, newValue) => setJobTitle(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Job Title"
                  helperText="Please select or type your job title"
                />
              )}
              freeSolo
            />

            <Autocomplete
              id="department"
              options={departments}
              value={department}
              onChange={(event, newValue) => setDepartment(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Department"
                  helperText="Please select or type your department"
                />
              )}
              freeSolo
            />

            <TextField
              id="rating"
              label="Rating"
              type="number"
              InputProps={{ inputProps: { min: 1, max: 5 } }}
              value={rating}
              onChange={(event) => setRating(Number(event.target.value))}
            />

            <TextField
              id="supervisor_rating"
              label="Supervisor Rating"
              type="number"
              InputProps={{ inputProps: { min: 1, max: 5 } }}
              value={supervisorRating}
              onChange={(event) => setSupervisorRating(Number(event.target.value))}
            />

            <TextField
              id="comment"
              label="Comment"
              multiline
              rows={4}
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />

            <TextField
              id="pay"
              label="Pay"
              type="number"
              InputProps={{ inputProps: { step: "0.01" } }}
              value={pay}
              onChange={(event) => setPay(Number(event.target.value))}
            />

            <Button variant="contained" type="submit">
              Submit Review
            </Button>
          </Stack>
        </form>
      </Box>
      <Footer />
    </>
  );
};

export default RateMyJobReview;
