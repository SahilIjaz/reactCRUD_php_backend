import { useEffect, useState } from "react";
import axios from "axios";

export default function AllJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/all-jobs");
        setJobs(response.data.data);
        console.log("jobs are", response.data.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Available Jobs</h1>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
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
  );
}
