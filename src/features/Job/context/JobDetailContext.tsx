import { useParams, useSearchParams } from "@solidjs/router";
import {
  Accessor,
  Match,
  ParentProps,
  Switch,
  createContext,
  useContext,
} from "solid-js";
import createQuery from "../../../common/hooks/createQuery";
import JobService from "../../../services/job_service";
import { Job, JobConnection } from "../../../schema/entities";

export interface IJobDetailContextMethods {
  handleOnApplySuccess: (result: JobConnection) => void;
  handleOnUndoSuccess: () => void;
}

type IJobDetailContext = ReturnType<typeof createQuery<Job, string>> &
  IJobDetailContextMethods;

export const JobDetailContext = createContext<IJobDetailContext>();

const JobDetailProvider = (props: ParentProps) => {
  const params = useParams();

  const { data, error, loading, refetch, setData } = createQuery<Job, string>({
    params: () => params.id,
    queryFn: async (jobId) => {
      if (!jobId) throw Error("jobId is not provided");
      return await JobService.findJobById(jobId);
    },
  });

  const handleOnApplySuccess = (result: JobConnection) => {
    if (data()) {
      setData((prev) => ({ ...prev!, jobConnections: [result] }));
    }
  };

  const handleOnUndoSuccess = () => {
    if (data()) {
      setData((prev) => ({ ...prev!, jobConnections: [] }));
    }
  };

  return (
    <JobDetailContext.Provider
      value={{
        data,
        error,
        loading,
        refetch,
        setData,
        handleOnApplySuccess,
        handleOnUndoSuccess,
      }}
    >
      {props.children}
    </JobDetailContext.Provider>
  );
};

export function useJobDetail() {
  const value = useContext(JobDetailContext);

  if (!value) throw new Error("Cannot find JobDetailContext");

  return value;
}

export default JobDetailProvider;
