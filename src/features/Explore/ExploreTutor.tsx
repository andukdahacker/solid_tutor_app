import { debounce } from "@solid-primitives/scheduled";
import { Accessor, For, Match, Show, Switch, createEffect } from "solid-js";
import { createStore, unwrap } from "solid-js/store";
import Loading from "../../common/components/LoadingIndicator/Loading";
import createPaginatedQuery from "../../common/hooks/createPaginatedQuery";
import { FindManyTutorsInput } from "../../schema/inputs";
import ExploreService from "../../services/explore_service";
import ExploreTutorFilter from "./ExploreTutorFilter";
import TutorCard from "./TutorCard";

interface ExploreTutorProps {
  searchInput: Accessor<string>;
}

const ExploreTutor = (props: ExploreTutorProps) => {
  const initialInput = () => props.searchInput();
  const [params, setParams] = createStore<FindManyTutorsInput>({
    searchString: initialInput(),
    take: 10,
  });

  const { data, error, loading, refetch, fetchMore } = createPaginatedQuery({
    params: params,
    queryFn: async (input) =>
      await ExploreService.findManyTutors(input as FindManyTutorsInput),
  });

  const handleFetchMore = async (e: Event) => {
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
            >
              Load more
            </button>
          </Show>
        </Match>
      </Switch>
    </div>
  );
};

export default ExploreTutor;
