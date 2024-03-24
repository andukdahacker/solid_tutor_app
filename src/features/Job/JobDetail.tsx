import { Match, Switch } from "solid-js";
import { useJobDetail } from "./context/JobDetailContext";
import Loading from "../../common/components/LoadingIndicator/Loading";
import CurrencyUtils from "../../common/utils/currency_utils";
import Avatar from "../../common/components/Avatar/Avatar";
import ApplyButton from "./ApplyButton";
import { useAuth } from "../../providers/AuthProvider";
import { produce, unwrap } from "solid-js/store";
import { JobConnection } from "../../schema/entities";
import JobActionButton from "./JobActionButton";
import { useParams } from "@solidjs/router";

const JobDetail = () => {
  const { data, error, loading, handleOnApplySuccess, handleOnUndoSuccess } =
    useJobDetail();

  return (
    <Switch>
      <Match when={error()}>
        <div>{error() ? `${error()}` : "Unexpected error"}</div>
      </Match>
      <Match when={loading()}>
        <div class="flex items-center justify-center">
          <Loading />
        </div>
      </Match>
      <Match when={data()}>
        <div class="mt-4 flex w-full flex-row pl-6 pr-6">
          <div class="flex w-full flex-col gap-6">
            <div class="flex flex-col gap-4">
              <span class="text-2xl font-bold text-primary">
                {data()?.title}
              </span>
              <span class="text-xl font-semibold">Details</span>
              <div class="flex flex-row gap-6">
                <div class="flex flex-col">
                  <span class="text-lg font-semibold">
                    {data()?.fee ? CurrencyUtils.format(data()!.fee) : ""}
                  </span>
                  <span class="text-lg font-light">Fee</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-lg font-semibold">{data()?.jobMethod}</span>
                  <span class="text-lg font-light">Location</span>
                </div>
              </div>
              <div class="flex flex-col">
                <span class="text-lg font-semibold">Description</span>
                <span class="text-lg font-light">
                  {data()?.description} Description
                </span>
              </div>
              <div class="flex flex-col">
                <span class="text-lg font-semibold">Availability</span>
              </div>
            </div>
          </div>

          <div class="fixed right-0 top-0 mt-20 h-full w-80 bg-base-200 p-4 shadow-sm">
            <span class="text-lg font-semibold">About the learner</span>
            <div class="mt-4 flex flex-col items-center justify-center gap-4">
              <Avatar
                name={data()?.learner?.user?.username ?? ""}
                src={data()?.learner?.user?.avatar}
                size="md"
              />
              <span class="text-lg font-bold">
                {data()?.learner?.user?.username}
              </span>
            </div>
            <div class="divider"></div>
            <Switch>
              <Match when={data()?.jobStatus == "OPEN"}>
                <div class="flex flex-col items-center justify-center gap-4">
                  <button class="btn btn-outline w-full">Message</button>
                  <JobActionButton
                    job={data()!}
                    onApplySuccess={handleOnApplySuccess}
                    applyBtnClass="btn btn-primary w-full"
                    onUndoSuccess={handleOnUndoSuccess}
                    requestedBtnClass="btn btn-primary w-full"
                  />
                </div>
              </Match>
              <Match when={data()?.jobStatus == "EMPLOYED"}>
                <button disabled class="btn disabled btn-primary w-full">
                  Not available
                </button>
              </Match>
              <Match when={data()?.jobStatus == "DONE"}>
                <button disabled class="btn disabled btn-primary w-full">
                  Done
                </button>
              </Match>
            </Switch>
          </div>
        </div>
      </Match>
    </Switch>
  );
};

export default JobDetail;
