import { useState, useEffect } from "react";
import { TextField, Button, Box, Stack, Autocomplete } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const RateMyJobReview = () => {
  const [jobTitle, setJobTitle] = useState(null);
  const [department, setDepartment] = useState(null);
  const [rating, setRating] = useState(1);
  const [supervisorRating, setSupervisorRating] = useState(1);
  const [comment, setComment] = useState("");
  const [pay, setPay] = useState("");
  const navigate = useNavigate()
  const [dropdownJobs, setDropdownJobs] = useState([])
  const [dropdownDepartments, setDropdownDepartments] = useState([])

  
  useEffect(() => {
    
    fetch(`http://127.0.0.1:8000/autocomplete?query=software`)
      .then((response) => response.json())
      .then((data) => {
        var mappedDepartments = data.map(item => item.department);
        setDropdownDepartments(mappedDepartments);
        var mappedJobWithDepartment = data.map(item => (item.title +  " " + "(" + item.department + ")"));
        setDropdownJobs(mappedJobWithDepartment)
      
        
      });
    
  }, []);

  

  const handleSubmit = async (event) => {
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
    try {
      const response = await fetch(`http://127.0.0.1:8000/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });
      console.log("This is the response: ", response.json)

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      navigate("/success")
      
    } catch (error) {
      console.log("Error attempting to submit the review or recieve stuff afterwards", error);
    }
  };


  return (
    <>
      <Navbar />
      <Box sx={{ "& > :not(style)": { m: 1 }, paddingBottom:"20px" }}>
      <div style={{width: '100%', textAlign: 'center'}}>
        <span style={{color: 'black', fontSize: 48, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>
          Rate </span>
          <span style={{color: 'black', fontSize: 48, fontFamily: 'Inter', fontWeight: '400', textDecoration: 'underline', wordWrap: 'break-word'}}>
            your</span>
            <span style={{color: 'black', fontSize: 48, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>  Y-job</span></div>
        <form onSubmit={handleSubmit}>
          <Stack direction="column" spacing={2}>
            <Autocomplete
              id="job_title"
              options={dropdownJobs}
              value={jobTitle}
              onChange={(event, newValue) => setJobTitle(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Job Title"
                  helperText="Please select or type your job title"
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              )}
              freeSolo
            />

            <Autocomplete
              id="department"
              options={dropdownDepartments}  //Eventually have departments show up based on what job was input
              value={department}
              onChange={(event, newValue) => setDepartment(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Department"
                  helperText="Please select or type your department"
                  onChange={(e) => setDepartment(e.target.value)}
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

            <Button variant="contained" type="submit" disabled={!jobTitle || !department || !pay}>
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
