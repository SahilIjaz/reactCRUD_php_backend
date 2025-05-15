import { useEffect, useState } from "react";
import axios from "axios";

export default function AllJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/all-jobs");
        console.log("WHLE RESPONSE IS : ", response);
        setJobs(response.data.jobs);
        console.log("jobs are", response.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-10">
      <div className="w-full max-w-6xl px-6 py-10 bg-white shadow-lg rounded-xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
          Available Jobs
        </h1>

        {jobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs found.</p>
        ) : (
          <div className="space-y-6">
            {jobs.map((job, index) => (
              <div
                key={job.id}
                className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  <span className="text-blue-600">{index + 1}.</span>{" "}
                  {job.jobTitle}
                </h2>
                <p className="text-gray-600 mb-1">
                  <strong>Type:</strong> {job.employmentType}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Location:</strong> {job.location}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Salary:</strong> {job.salary}
                </p>
                <p className="text-gray-500 text-sm mt-2 line-clamp-3">
                  {job.description}
                </p>
                <div className="mt-4">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                    {job.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
