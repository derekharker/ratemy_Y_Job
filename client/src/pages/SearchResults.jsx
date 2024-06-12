import { useEffect, useState } from "react";

const SearchResults = () => {
  //TODO: Actually fix this!

  const [jobs, setJobs] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch jobs and reviews from API or data source
    // Example fetch calls:
    // fetch('/api/jobs')
    //     .then(response => response.json())
    //     .then(data => setJobs(data));
    // fetch('/api/reviews')
    //     .then(response => response.json())
    //     .then(data => setReviews(data));
  }, []);

  return (
    <div>
      <h1>Search Results</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <h2>{job.title}</h2>
            <p>{job.description}</p>
            <ul>
              {reviews
                .filter((review) => review.job_id === job.id)
                .map((review) => (
                  <li key={review.id}>
                    <strong>Department:</strong> {review.department}
                    <br />
                    <strong>Overall Rating:</strong> {review.rating}
                    <br />
                    <strong>Supervisor Rating:</strong>{" "}
                    {review.supervisor_rating}
                    <br />
                    <strong>Pay:</strong> ${review.pay}
                    <br />
                    <strong>Comment:</strong> {review.comment}
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
