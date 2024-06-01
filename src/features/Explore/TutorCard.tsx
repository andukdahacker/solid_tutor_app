import { For, Show } from "solid-js";
import Avatar from "../../common/components/Avatar/Avatar";
import CurrencyUtils from "../../common/utils/currency_utils";
import { TutorProfile } from "../../schema/entities";
import { useNavigate } from "@solidjs/router";

interface TutorCardProps {
  tutor: TutorProfile;
}

const TutorCard = (props: TutorCardProps) => {
  const navigate = useNavigate();
  return (
    <div class="bg-base card card-bordered w-80 shadow-md">
      <div class="card-body">
        <div class="flex flex-col gap-2">
          <div class="flex flex-row gap-4">
            <Avatar
              size="sm"
              name={props.tutor.user?.username ?? ""}
              src={props.tutor.user?.avatar}
            />
            <div class="flex flex-col">
              <span>{props.tutor.user?.username}</span>
            </div>
          </div>
          <div class="flex flex-row justify-between">
            <Show when={props.tutor.tutorFee}>
              <div class="flex flex-col">
                <span class="text-xs font-semibold">
                  {CurrencyUtils.format(props.tutor.tutorFee!)}
                </span>
                <span class="text-xs font-thin">Tutor fee</span>
              </div>
            </Show>
            <Show when={props.tutor.jobMethod}>
              <div class="flex flex-col">
                <span class="text-xs font-semibold">
                  {props.tutor.jobMethod}
                </span>
                <span class="text-xs font-thin">Location</span>
              </div>
            </Show>
          </div>
          <span class="text-sm font-normal">{props.tutor.bio}</span>
          <div class="flex flex-row gap-2">
            <For each={props.tutor.tutorProfileSubject}>
              {(val) => (
                <div class="badge badge-accent badge-sm mt-2">
                  {val.subject?.name}
                </div>
              )}
            </For>
          </div>
        </div>
        <div class="card-actions justify-end">
          <button
            class="btn btn-primary"
            onClick={() => {
              navigate(`/profile/${props.tutor.user?.id}`);
            }}
          >
            See profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;
