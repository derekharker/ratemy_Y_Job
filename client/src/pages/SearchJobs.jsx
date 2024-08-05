import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Autocomplete, TextField, Button } from "@mui/material";
import JobsTable from "../components/JobsTable";



const SearchJobs = () => {
  const [jobName, setJobName] = useState("");
  const [jobList, setJobList] = useState([]);
  const jobs = [
    "Software Engineer",
    "Data Analyst",
    "Product Manager",
    "UX Designer",
  ];



  useEffect(() => {
    if (jobName) {
      fetch(`http://127.0.0.1:8000/autocomplete?query=${jobName}`)
        .then((response) => response.json())
        .then((data) => {
          setJobList(data);
        });
    } else {
      setJobList([]);
    }
  }, [jobName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:8000/search?job_name=${jobName}`)
      .then((response) => response.json())
      .then((data) => {
        setJobList(data);
      });
  };

  return (
    <div>
      <Navbar/>
      <header>
      </header>
      <h1>Search Jobs</h1>
      <form onSubmit={handleSubmit}>
        <Autocomplete
              id="job_title"
              options={jobs}
              value={jobName}
              onChange={(event, newValue) => setJobName(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Job Title"
                  helperText="Please select or type your job title"
                />
              )}
              freeSolo
            />
        <Button variant="contained" type="submit">
              Search
            </Button>
      </form>
      
      {jobList.length > 0 && (
        <>
        <h2>All Jobs</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Overall Rating</th>
              <th>Total Ratings</th>
              <th>Department</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {jobList.map((job) => (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.average_rating}</td>
                <td>{job.total_ratings}</td>
                <td>{job.department}</td>
                <td>
                  <Link to={`/job/${job.id}`}>View Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <JobsTable/>
        </>
      )}
      
      <Footer/>
    </div>
  );
};

export default SearchJobs;
