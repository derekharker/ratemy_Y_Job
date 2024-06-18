import React, { useEffect, useState } from "react";

const SearchResults = () => {
  const [jobs, setJobs] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fake job data
    const fakeJobs = [
      {
        id: 1,
        title: "Software Engineer",
        description: "Develop and maintain software applications.",
      },
      {
        id: 2,
        title: "Data Analyst",
        description: "Analyze and interpret complex data sets.",
      },
      {
        id: 3,
        title: "Project Manager",
        description: "Plan, execute, and close projects.",
      },
    ];

    // Fake review data
    const fakeReviews = [
      {
        id: 1,
        job_id: 1,
        department: "Engineering",
        rating: 4.5,
        supervisor_rating: 4.0,
        pay: 85000,
        comment: "Great place to work!",
      },
      {
        id: 2,
        job_id: 1,
        department: "Engineering",
        rating: 3.8,
        supervisor_rating: 3.5,
        pay: 80000,
        comment: "Good work-life balance.",
      },
      {
        id: 3,
        job_id: 2,
        department: "Data Science",
        rating: 4.2,
        supervisor_rating: 4.1,
        pay: 70000,
        comment: "Challenging but rewarding.",
      },
      {
        id: 4,
        job_id: 3,
        department: "Management",
        rating: 4.0,
        supervisor_rating: 3.9,
        pay: 90000,
        comment: "Well-organized projects.",
      },
    ];

    // Set the state with fake data
    setJobs(fakeJobs);
    setReviews(fakeReviews);
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
