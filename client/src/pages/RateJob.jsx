import { useState } from "react";
import { Select, MenuItem, TextField, Button, Box, Stack } from "@mui/material";

const RateMyJobReview = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [department, setDepartment] = useState("");
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
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <h1>Rate My Job Review</h1>
      <form onSubmit={handleSubmit}>
        <Stack direction="column" spacing={2}>
          <TextField
            id="job_title"
            select
            label="Job Title"
            value={jobTitle}
            onChange={(event) => setJobTitle(event.target.value)}
            helperText="Please select your job title"
          >
            {jobs.map((job) => (
              <MenuItem key={job} value={job}>
                {job}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="department"
            select
            label="Department"
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
            helperText="Please select your department"
          >
            {departments.map((department) => (
              <MenuItem key={department} value={department}>
                {department}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="rating"
            label="Rating"
            type="number"
            InputProps={{ inputProps: { min: 1, max: 5 } }}
            value={rating}
            onChange={(event) => setRating(event.target.value)}
          />

          <TextField
            id="supervisor_rating"
            label="Supervisor Rating"
            type="number"
            InputProps={{ inputProps: { min: 1, max: 5 } }}
            value={supervisorRating}
            onChange={(event) => setSupervisorRating(event.target.value)}
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
            onChange={(event) => setPay(event.target.value)}
          />

          <Button variant="contained" type="submit">
            Submit Review
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default RateMyJobReview;
