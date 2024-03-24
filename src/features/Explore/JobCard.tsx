import { A } from "@solidjs/router";
import CurrencyUtils from "../../common/utils/currency_utils";
import DatetimeUtils from "../../common/utils/datetime_utils";
import { Job } from "../../schema/entities";
import { useAuth } from "../../providers/AuthProvider";
import JobActionButton from "../Job/JobActionButton";
import { useExploreJob } from "./context/ExploreJobContext";

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
          <JobActionButton
            job={props.job}
            onApplySuccess={(result) =>
              handleOnJobApplySuccess(props.job.id, result)
            }
            onUndoSuccess={() => handleOnJobUndoApplySuccess(props.job.id)}
            applyBtnClass="btn btn-primary btn-sm w-24"
            requestedBtnClass="btn btn-primary btn-sm w-24"
          />
        </div>
      </div>
    </div>
  );
};

export default JobCard;
