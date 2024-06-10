import { For, Match, Switch, createSignal } from "solid-js";
import createQuery from "../../common/hooks/createQuery";
import { FindJobsByLearnerInput } from "../../schema/inputs";
import LearnerDashboardService from "../../services/dashboard_service";
import { Job, Paginated } from "../../schema/entities";
import Loading from "../../common/components/LoadingIndicator/Loading";
import LearnerJobRequest from "./LearnerJobRequest";

const LearnerJobRequestList = () => {
  const { loading, data, error } = createQuery<
    Paginated<Job>,
    FindJobsByLearnerInput
  >({
    params: () => ({ take: 5, jobStatus: "OPEN" }),
    queryFn: async (input) => LearnerDashboardService.getLearnerJobs(input!),
    onSuccess: (result) => {
      return result;
    },
    onError: (error) => {
      return error;
    },
  });
  return (
    <>
      <Switch>
        <Match when={loading()}>
          <Loading />
        </Match>
        <Match when={error()}>
          <div>{error()?.message}</div>
        </Match>
        <Match when={data()}>
          <div class="flex w-full flex-row gap-4 overflow-x-auto p-2">
            <For each={data()?.nodes ?? []} fallback={<div>No data</div>}>
              {(job) => <LearnerJobRequest job={job} />}
            </For>
          </div>
        </Match>
      </Switch>
    </>
  );
};

export default LearnerJobRequestList;
