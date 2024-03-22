import { debounce } from "@solid-primitives/scheduled";
import { useSearchParams } from "@solidjs/router";
import {
  Accessor,
  For,
  Match,
  Show,
  Switch,
  batch,
  createEffect,
} from "solid-js";
import { createStore, unwrap } from "solid-js/store";
import Loading from "../../common/components/LoadingIndicator/Loading";
import createPaginatedQuery from "../../common/hooks/createPaginatedQuery";
import { JobMethod, JobType, SortBy } from "../../schema/entities";
import { FindManyJobsInput } from "../../schema/inputs";
import ExploreService from "../../services/explore_service";
import ExploreJobFilter from "./ExploreJobFilter";
import JobCard from "./JobCard";

interface ExploreJobProps {
  searchInput: Accessor<string>;
}

const ExploreJob = (props: ExploreJobProps) => {
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

  const { data, error, loading, refetch, fetchMore } = createPaginatedQuery({
    params: params,
    queryFn: async (input) =>
      await ExploreService.findManyJobs(input as FindManyJobsInput),
  });

  const handleFetchMore = async () => {
    const left = window.scrollX;
    const top = window.scrollY;
    if (data.pageInfo?.hasNextPage) {
      await fetchMore({
        ...params,
        stringCursor: (data.pageInfo?.cursor as string) ?? "",
      });
    }
    window.scrollTo({ left, top, behavior: "instant" });
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
    <div class="flex flex-col items-center justify-center">
      <div class="mb-6 flex w-full justify-end">
        <ExploreJobFilter
          onApplyFilter={(values) => {
            batch(() => {
              setParams("jobMethod", values.jobMethod);
              setParams("minFee", values.minFee);
            });
          }}
          minFee={unwrap(params.minFee)}
          jobMethod={unwrap(params.jobMethod)}
        />
      </div>

      <Switch>
        <Match when={loading()}>
          <Loading />
        </Match>
        <Match when={error()}>{error()?.message}</Match>
        <Match when={data}>
          <div class="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <For each={data.nodes}>{(val) => <JobCard job={val} />}</For>
          </div>
          <div id="anchor"></div>
          <Show when={data.pageInfo?.hasNextPage}>
            <button class="btn btn-primary mb-10" onClick={handleFetchMore}>
              Load more
            </button>
          </Show>
        </Match>
      </Switch>
    </div>
  );
};

export default ExploreJob;
