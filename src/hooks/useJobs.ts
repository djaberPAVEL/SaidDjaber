import { useEffect, useState } from "react";
import jobService, { Job } from "../services/job-service";
import { CanceledError } from "../services/api-client";

const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [errorJob, setErrorJob] = useState("");
  const [isLoadingJob, setLoadingJob] = useState(false);

  useEffect(() => {
    setLoadingJob(true);
    const { request, cancel } = jobService.getAll<Job>();
    request
      .then((res) => {
        const updatedJobs = res.data;
        setJobs(updatedJobs);
        setLoadingJob(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setErrorJob(err.message);
        setLoadingJob(false);
      });
    return () => cancel();
  }, []);
  return {
    jobs,
    errorJob,
    isLoadingJob,
    setErrorJob,
    setJobs,
    setLoadingJob,
  };
};
export default useJobs;