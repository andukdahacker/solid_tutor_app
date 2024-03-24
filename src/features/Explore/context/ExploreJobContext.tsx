import { useSearchParams } from "@solidjs/router";
import {
  Accessor,
  ParentProps,
  createContext,
  createEffect,
  useContext,
} from "solid-js";
import {
  Job,
  JobConnection,
  JobMethod,
  JobType,
  Paginated,
  SortBy,
} from "../../../schema/entities";
import { FindManyJobsInput } from "../../../schema/inputs";
import { SetStoreFunction, createStore } from "solid-js/store";
import createPaginatedQuery from "../../../common/hooks/createPaginatedQuery";
import ExploreService from "../../../services/explore_service";
import { debounce } from "@solid-primitives/scheduled";

interface IExploreJobContext {
  params: FindManyJobsInput;
  error: Accessor<Error | undefined>;
  loading: Accessor<boolean>;
  setParams: SetStoreFunction<FindManyJobsInput>;
  searchInput: Accessor<string>;
  data: Paginated<Job>;
  handleFetchMore: () => Promise<void>;
  handleOnJobApplySuccess: (jobId: string, result: JobConnection) => void;
  handleOnJobUndoApplySuccess: (jobId: string) => void;
  isFetchingMore: Accessor<boolean>;
}

const ExploreJobContext = createContext<IExploreJobContext>();

interface ExploreJobProviderProps {
  searchInput: Accessor<string>;
}

const ExploreJobProvider = (props: ParentProps<ExploreJobProviderProps>) => {
  const initialInput = () => props.searchInput();

  const [searchParams, setSearchParams] = useSearchParams<{
    maxFee?: string;
    minFee?: string;
    searchString?: string;
    sortBy?: SortBy;
    take?: string;
    jobMethod?: JobMethod;
    jobType?: JobType;
  }>();

  const [params, setParams] = createStore<FindManyJobsInput>({
    maxFee: searchParams.maxFee ? Number.parseInt(searchParams.maxFee) : 200000,
    minFee: searchParams.minFee ? Number.parseInt(searchParams.minFee) : 0,
    searchString: searchParams.searchString ?? initialInput(),
    sortBy: searchParams.sortBy ?? "asc",
    take: searchParams.take ? Number.parseInt(searchParams.take) : 10,
    jobMethod: searchParams.jobMethod ?? "BOTH",
    jobType: searchParams.jobType ?? "TUTOR",
  });

  const { data, setData, error, loading, fetchMore, isFetchingMore } =
    createPaginatedQuery({
      params: params,
      queryFn: async (input) =>
        await ExploreService.findManyJobs(input as FindManyJobsInput),
    });

  const handleFetchMore = async () => {
    if (data.pageInfo?.hasNextPage) {
      await fetchMore({
        ...params,
        stringCursor: (data.pageInfo?.cursor as string) ?? "",
      });
    }
  };

  const handleOnJobApplySuccess = (jobId: string, result: JobConnection) => {
    const updatedJob = data.nodes?.find((job) => job.id === jobId);

    if (updatedJob) {
      const updatedJobClone = { ...updatedJob };

      updatedJobClone.jobConnections = [result];

      const updatedJobIndex = data.nodes?.indexOf(updatedJob);

      if (updatedJobIndex !== undefined) {
        setData("nodes", updatedJobIndex, updatedJobClone);
      }
    }
  };

  const handleOnJobUndoApplySuccess = (jobId: string) => {
    const updatedJob = data.nodes?.find((job) => job.id === jobId);
    if (updatedJob) {
      const updatedJobClone = { ...updatedJob };
      updatedJobClone.jobConnections = [];
      const updatedJobIndex = data.nodes?.indexOf(updatedJob);
      if (updatedJobIndex !== undefined) {
        setData("nodes", updatedJobIndex, updatedJobClone);
      }
    }
  };

  const trigger = debounce((input: string) => {
    setParams("searchString", input);
  }, 500);

  createEffect(() => {
    trigger(props.searchInput());
  });

  createEffect(() => {
    setSearchParams({ ...params });
  });

  return (
    <ExploreJobContext.Provider
      value={{
        data,
        error,
        loading,
        params,
        searchInput: () => props.searchInput(),
        setParams,
        handleFetchMore,
        handleOnJobApplySuccess,
        handleOnJobUndoApplySuccess,
        isFetchingMore,
      }}
    >
      {props.children}
    </ExploreJobContext.Provider>
  );
};

export function useExploreJob() {
  const value = useContext(ExploreJobContext);

  if (!value) throw new Error("Cannot find ExploreJobContext");

  return value;
}

export default ExploreJobProvider;
