import { useState, useEffect} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Autocomplete, TextField, Button } from "@mui/material";
import JobsTable from "../components/JobsTable";




const SearchJobs = () => {
  const [jobName, setJobName] = useState("");
  const [jobList, setJobList] = useState([]);
  const [dropdownJobs, setDropdownJobs] = useState([])
  
  useEffect(() => {
    
    fetch(`http://127.0.0.1:8000/autocomplete?query=software`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        var mappedJobs = data.map(item => item.title);
        setDropdownJobs(mappedJobs);
      });
    
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({jobName});
    fetch(`http://127.0.0.1:8000/autocomplete?query=${jobName}`)
      .then((response) => response.json())
      .then((data) => {
        setJobList(data);
      });
  };

  return (
    <div>
      <Navbar/>
      <h1>Search Jobs</h1>
      <form onSubmit={handleSubmit}>
        <Autocomplete
              id="job_title"
              options={dropdownJobs}
              value={jobName}
              onChange={(event, newValue) => setJobName(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Job Title"
                  helperText="Please select or type your job title"
                  onChange={(e) => setJobName(e.target.value)} 
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
        <JobsTable jobList={jobList}/>
        <p style={{paddingBottom: "20px"}}></p>
        </>
      )}
      {jobList.length > 0 ? (<Footer/>) : (<Footer style={{position: "fixed", bottom:0, minWidth: "1420px",background: '#0D579C'}}/>) }
    </div>
  );
};

export default SearchJobs;
