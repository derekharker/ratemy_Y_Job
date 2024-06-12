import { useState, useEffect } from "react";

const SearchJobs = () => {
  //TODO: Actually fix this!

  const [jobName, setJobName] = useState("");
  const [jobs, setJobs] = useState([]);

  const handleInputChange = (event) => {
    setJobName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement the search functionality here
    // For example, you can fetch the jobs from an API based on jobName
    // fetch(`/search_results?job_name=${jobName}`)
    //     .then(response => response.json())
    //     .then(data => setJobs(data));
  };

  // Use useEffect to fetch all jobs when the component mounts
  useEffect(() => {
    // Fetch all jobs
    // fetch('/api/all_jobs')
    //     .then(response => response.json())
    //     .then(data => setJobs(data));
  }, []);

  return (
    <div>
      <h1>Search Jobs</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="job_name">Job Name:</label>
        <input
          type="text"
          id="job_name"
          name="job_name"
          value={jobName}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Search</button>
      </form>

      <h2>All Jobs</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => (
            <tr key={index}>
              <td>{job.title}</td>
              <td>{job.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchJobs;
