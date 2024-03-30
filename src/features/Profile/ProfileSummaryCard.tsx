import { Accessor, For } from "solid-js";
import Avatar from "../../common/components/Avatar/Avatar";
import { useProfileContext } from "./context/ProfileContextProvider";
import { User } from "../../schema/entities";
import CurrencyUtils from "../../common/utils/currency_utils";

interface ProfileSummaryCardProps {
  user: User;
}

const ProfileSummaryCard = (props: ProfileSummaryCardProps) => {
  return (
    <div class="m-4 flex w-80 flex-col items-center justify-start gap-2 rounded-lg bg-base-200 p-4">
      <Avatar name={props.user.username} size="md" src={props.user.avatar} />
      <span class="mt-2 text-lg font-bold">{props.user.username}</span>
      <div class="mt-2 flex flex-wrap gap-2">
        <For each={props.user.tutorProfile.tutorProfileSubject}>
          {(subject) => (
            <span class="badge badge-primary">{subject.subject?.name}</span>
          )}
        </For>
      </div>
      <div class="flex w-full flex-col items-start justify-center">
        <span class="text-md mt-4 font-semibold">Bio</span>
        <span class="text-md font-medium">{props.user.tutorProfile.bio}</span>
      </div>

      <div class="flex w-full flex-col items-start justify-center">
        <span class="text-md mt-4 font-semibold">Fee</span>
        <span class="text-md font-medium">
          {CurrencyUtils.format(props.user.tutorProfile.tutorFee ?? 0)}
        </span>

        <span class="text-md font-semibold">Location</span>
        <span class="text-md font-medium">
          {props.user.tutorProfile.jobMethod}
        </span>
      </div>
      <button class="btn btn-primary">Message</button>
    </div>
  );
};

export default ProfileSummaryCard;
