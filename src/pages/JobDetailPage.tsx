import { useParams } from "@solidjs/router";
import createQuery from "../common/hooks/createQuery";
import JobService from "../services/job_service";
import JobDetailProvider from "../features/Job/context/JobDetailContext";
import JobDetail from "../features/Job/JobDetail";

const JobDetailPage = () => {
  const params = useParams();

  return (
    <JobDetailProvider>
      <JobDetail />
    </JobDetailProvider>
  );
};

export default JobDetailPage;
