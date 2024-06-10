import dayjs from "dayjs";
import Calendar from "../common/components/Calendar/Calendar";
import Schedule from "../common/components/Schedule/Schedule";
import { For, Match, Switch, createEffect, createSignal } from "solid-js";
import LearnerDashboardAllTab from "../features/LearnerDashboard/LearnerDashboardAllTab";

const LearnerDashboardTabs = [
  "All",
  "Upcoming lessons",
  "Requests",
  "Your requests",
] as const;

type LearnerDashboardTab = (typeof LearnerDashboardTabs)[number];

const LearnerDashboard = () => {
  const [activeTab, setActiveTab] = createSignal<LearnerDashboardTab>("All");

  createEffect(() => {
    switch (activeTab()) {
    }
  });

  return (
    <div class="flex flex-col justify-center p-6">
      <div class="flex flex-wrap gap-6">
        <For each={LearnerDashboardTabs}>
          {(tab) => (
            <button
              class={activeTab() == tab ? "btn btn-primary" : "ghost btn"}
              type="button"
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          )}
        </For>
      </div>

      <div class="mt-4">
        <Switch>
          <Match when={activeTab() == "All"}>
            <LearnerDashboardAllTab />
          </Match>
          <Match when={activeTab() == "Upcoming lessons"}>
            Upcoming lessons
          </Match>
          <Match when={activeTab() == "Requests"}>Requests</Match>
          <Match when={activeTab() == "Your requests"}>Your requests</Match>
        </Switch>
      </div>
    </div>
  );
};

export default LearnerDashboard;
