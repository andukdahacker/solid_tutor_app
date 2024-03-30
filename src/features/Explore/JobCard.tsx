import { A } from "@solidjs/router";
import CurrencyUtils from "../../common/utils/currency_utils";
import DatetimeUtils from "../../common/utils/datetime_utils";
import { Job } from "../../schema/entities";
import { useAuth } from "../../providers/AuthProvider";
import JobActionButton from "../Job/JobActionButton";
import { useExploreJob } from "./context/ExploreJobContext";
import { Switch, Match } from "solid-js";
import ApplyButton from "../Job/ApplyButton";
import RequestedButton from "../Job/RequestedButton";

interface JobCardProps {
  job: Job;
}

const JobCard = (props: JobCardProps) => {
  const { handleOnJobApplySuccess, handleOnJobUndoApplySuccess } =
    useExploreJob();
  const latestUpdate =
    props.job.createdAt == props.job.updatedAt
      ? `Posted ${DatetimeUtils.ago(props.job.createdAt)} ago`
      : `Updated ${DatetimeUtils.ago(props.job.updatedAt)} ago`;

  const jobConnection = () =>
    props.job.jobConnections.length > 0
      ? props.job.jobConnections[0]
      : undefined;
  return (
    <div class="bg-base card w-80 shadow-xl">
      <div class="card-body">
        <div class="flex flex-col gap-2">
          <span class="text-lg font-semibold">{props.job.title}</span>
          <span class="text-xs font-thin">{latestUpdate}</span>
          <div class="flex flex-row justify-between">
            <div class="flex flex-col">
              <span class="text-xs font-semibold">
                {CurrencyUtils.format(props.job.fee)}/hour
              </span>
              <span class="text-xs font-thin">Fee</span>
            </div>
            <div class="flex flex-col">
              <span class="text-xs font-semibold">{props.job.jobMethod}</span>
              <span class="text-xs font-thin">Location</span>
            </div>
            <div class="flex flex-col">
              <span class="text-xs font-semibold">
                {props.job.numberOfSessions}
              </span>
              <span class="text-xs font-thin">Session(s)</span>
            </div>
          </div>
          <span class="text-sm font-normal">
            {props.job.description ?? "No description"}
          </span>
          <div class="badge badge-accent badge-sm mt-2">
            {props.job.subject.name}
          </div>
        </div>
        <div class="card-actions mt-6 justify-end">
          <A href={`/job/${props.job.id}`} class="btn btn-outline btn-sm w-24">
            See more
          </A>
          <Switch>
            <Match when={jobConnection()?.status == undefined}>
              <ApplyButton
                onApplySuccess={(result) => {
                  handleOnJobApplySuccess(props.job.id, result);
                }}
                job={props.job}
                buttonClass={"btn btn-primary w-24 btn-sm"}
              />
            </Match>
            <Match when={jobConnection()?.status == "REQUESTED"}>
              <RequestedButton
                job={props.job}
                requestedButtonClass={"btn btn-primary w-24 btn-sm"}
                onUndoSuccess={() => {
                  handleOnJobUndoApplySuccess(props.job.id);
                }}
              />
            </Match>
            <Match when={jobConnection()?.status == "ACCEPTED"}>
              <button class="btn btn-primary">Accepted</button>
            </Match>
            <Match when={jobConnection()?.status == "DECLINED"}>
              <button class="btn btn-primary">Declined</button>
            </Match>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
