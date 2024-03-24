import { useSearchParams } from "@solidjs/router";
import { Match, Switch, createEffect, createSignal, onMount } from "solid-js";
import { ExploreType } from "../common/types/explore_type";
import ExploreJob from "../features/Explore/ExploreJob";
import ExploreSearchBar from "../features/Explore/ExploreSearchBar";
import ExploreTutor from "../features/Explore/ExploreTutor";
import ExploreJobProvider from "../features/Explore/context/ExploreJobContext";
import ExploreTutorProvider from "../features/Explore/context/ExploreTutorContext";

const ExplorePage = () => {
  const [searchInput, setSearchInput] = createSignal("");

  const [searchParams, setSearchParams] = useSearchParams<{
    page: ExploreType;
  }>();
  const [exploreType, setExploreType] = createSignal<ExploreType>(
    searchParams.page ?? "tutors",
  );
  onMount(() => {
    setSearchParams({ page: exploreType() });
  });

  createEffect(() => {
    setSearchParams({ page: exploreType() });
  });

  return (
    <div class="flex flex-col items-center justify-center">
      <div class="flex flex-col items-center justify-center">
        <span class="mb-4 text-2xl font-bold text-primary">
          Finding{" "}
          <Switch>
            <Match when={exploreType() == "jobs"}>Jobs</Match>
            <Match when={exploreType() == "tutors"}>Tutors</Match>
          </Switch>
        </span>
        <ExploreSearchBar
          exploreType={exploreType()}
          onChangeExploreType={(type) => {
            setExploreType(type);
          }}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />

        <div class="mt-10">
          <Switch>
            <Match when={exploreType() == "jobs"}>
              <ExploreJobProvider searchInput={searchInput}>
                <ExploreJob />
              </ExploreJobProvider>
            </Match>
            <Match when={exploreType() == "tutors"}>
              <ExploreTutorProvider searchInput={searchInput}>
                <ExploreTutor />
              </ExploreTutorProvider>
            </Match>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
