import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Blue Logo V2.svg"; // Adjust the path if necessary

const SearchJobs = () => {
  const [jobName, setJobName] = useState("");
  const [jobList, setJobList] = useState([]);

  const handleInputChange = (e) => {
    setJobName(e.target.value);
  };

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
      <header>
        <a href="/">
          <img src={logo} alt="Logo" width="350" height="350" />
        </a>
      </header>
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
    </div>
  );
};

export default SearchJobs;
