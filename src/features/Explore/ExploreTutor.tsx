import { debounce } from "@solid-primitives/scheduled";
import { Accessor, For, Match, Show, Switch, createEffect } from "solid-js";
import { createStore, unwrap } from "solid-js/store";
import Loading from "../../common/components/LoadingIndicator/Loading";
import createPaginatedQuery from "../../common/hooks/createPaginatedQuery";
import { FindManyTutorsInput } from "../../schema/inputs";
import ExploreService from "../../services/explore_service";
import ExploreTutorFilter from "./ExploreTutorFilter";
import TutorCard from "./TutorCard";
import { useExploreTutor } from "./context/ExploreTutorContext";

const ExploreTutor = () => {
  const { data, loading, error, handleFetchMore, isFetchingMore } =
    useExploreTutor();

  return (
    <div class="flex flex-col items-center justify-center">
      <div class="mb-6 flex w-full justify-end">
        <ExploreTutorFilter onApplyFilter={(values) => {}} />
      </div>

      <Switch>
        <Match when={loading()}>
          <Loading />
        </Match>
        <Match when={error()}>{error()?.message}</Match>
        <Match when={data}>
          <div class="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <For each={data.nodes}>{(val) => <TutorCard tutor={val} />}</For>
          </div>
          <div id="anchor"></div>
          <Show when={data.pageInfo?.hasNextPage}>
            <button
              class="btn btn-primary btn-sm mb-10"
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

export default ExploreTutor;
