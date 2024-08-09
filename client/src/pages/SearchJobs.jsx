import { useState, useEffect} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Autocomplete, TextField,} from "@mui/material";
import JobsTable from "../components/JobsTable";


const SearchJobs = () => {
  const [jobName, setJobName] = useState("");
  const [jobList, setJobList] = useState([]);
  const [dropdownJobs, setDropdownJobs] = useState([])
  
  useEffect(() => {
    
    fetch(`http://127.0.0.1:8000/autocomplete?query=a`)
      .then((response) => response.json())
      .then((data) => {
        var mappedJobWithDepartment = data.map(item => (item.title +  " " + "(" + item.department + ")"));
        setDropdownJobs(mappedJobWithDepartment) 
      });
    
  }, []);

  useEffect(() => {
    
    fetch(`http://127.0.0.1:8000/autocomplete?query=${jobName}`)
      .then((response) => response.json())
      .then((data) => {
        setJobList(data) 
        console.log(data);
      });
      
  }, [jobName]);

  return (
    <div>
      <Navbar/>
      <h1>Search Jobs</h1>
      <form onSubmit={() => console.log("Submitted")} style={{paddingBottom:"30px"}}>
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
      </form>
      
      {jobList.length > 0 && (
        <>
        <JobsTable jobList={jobList}/>
        <p style={{paddingBottom: "20px"}}></p>
        </>
      )}
      {jobList.length > 0 ? (<Footer/>) : (<Footer style={{position: "fixed", bottom:0, minWidth: "1300px",background: '#0D579C', borderRadius: "8px"}}/>) }
    </div>
  );
};

export default SearchJobs;
