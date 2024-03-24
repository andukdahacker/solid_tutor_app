import { Accessor, JSX, Match, Switch } from "solid-js";
import { Job, JobConnection } from "../../schema/entities";
import ApplyButton from "./ApplyButton";
import RequestedButton from "./RequestedButton";

interface JobActionButtonProps {
  job: Job;
  onApplySuccess: (result: JobConnection) => void;
  onUndoSuccess: () => void;
  applyBtnClass?: JSX.HTMLElementTags["button"]["class"];
  requestedBtnClass?: JSX.HTMLElementTags["button"]["class"];
}

const JobActionButton = (props: JobActionButtonProps) => {
  const jobConnection = () =>
    props.job.jobConnections ? props.job.jobConnections[0] : undefined;
  return (
    <Switch>
      <Match when={jobConnection()?.status == undefined}>
        <ApplyButton
          onApplySuccess={props.onApplySuccess}
          job={props.job}
          buttonClass={props.applyBtnClass}
        />
      </Match>
      <Match when={jobConnection()?.status == "REQUESTED"}>
        <RequestedButton
          job={props.job}
          requestedButtonClass={props.requestedBtnClass}
          onUndoSuccess={props.onUndoSuccess}
        />
      </Match>
      <Match when={jobConnection()?.status == "ACCEPTED"}>
        <button class="btn btn-primary">Accepted</button>
      </Match>
      <Match when={jobConnection()?.status == "DECLINED"}>
        <button class="btn btn-primary">Declined</button>
      </Match>
    </Switch>
  );
};

export default JobActionButton;
