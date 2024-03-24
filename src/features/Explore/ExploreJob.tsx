import { For, Match, Show, Switch, batch } from "solid-js";
import { unwrap } from "solid-js/store";
import Loading from "../../common/components/LoadingIndicator/Loading";
import ExploreJobFilter from "./ExploreJobFilter";
import JobCard from "./JobCard";
import { useExploreJob } from "./context/ExploreJobContext";

const ExploreJob = () => {
  const { handleFetchMore, loading, error, data, isFetchingMore } =
    useExploreJob();

  return (
    <div class="flex flex-col items-center justify-center">
      <div class="mb-6 flex w-full justify-end">
        <ExploreJobFilter />
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
            <button
              class="btn btn-primary mb-10"
              onClick={handleFetchMore}
              disabled={isFetchingMore()}
            >
              {isFetchingMore() ? (
                <span class="loading loading-ring loading-sm text-base-content" />
              ) : (
                "Load more"
              )}
            </button>
          </Show>
        </Match>
      </Switch>
    </div>
  );
};

export default ExploreJob;
