import toast from "solid-toast";
import createForm from "../../common/hooks/createForm";
import createMutation from "../../common/hooks/createMutation";
import { TutorProfile } from "../../schema/entities";
import { UpdateTutorProfileInput } from "../../schema/inputs";
import ProfileService from "../../services/profile_service";
import { useProfileContext } from "./context/ProfileContextProvider";

interface ProfileSummaryEditProps {
  onClose: () => void;
  tutorProfile: TutorProfile;
}

const ProfileSummaryEdit = (props: ProfileSummaryEditProps) => {
  const { updateTutorProfile } = useProfileContext();
  const { handleSubmit, register } = createForm<UpdateTutorProfileInput>({
    bio: props.tutorProfile.bio ?? "",
    jobMethod: props.tutorProfile.jobMethod ?? "BOTH",
    tutorFee: props.tutorProfile.tutorFee ?? 0,
  });

  const { mutate, isLoading } = createMutation({
    mutate: async (input: UpdateTutorProfileInput) =>
      await ProfileService.updateTutorProfile(input),
    onSuccess: (result) => {
      toast.success("Updated profile summary successfully");
      updateTutorProfile(result);
      props.onClose();
      return result;
    },
    onError: (error) => {
      toast.error("Failed to update profile summary");
      return error;
    },
  });

  return (
    <form
      class="flex w-80 flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(async (values) => {
          await mutate(values);
        });
      }}
    >
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text text-base text-primary">Bio</span>
        </div>
        <textarea
          id="bio"
          class="textarea textarea-bordered textarea-primary"
          ref={(el) => {
            register(el, "bio");
          }}
        />
      </label>

      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text text-base text-primary">Tutor fee</span>
        </div>
        <input
          type="number"
          min="0"
          max="1000000"
          step={100000}
          ref={(el) => {
            register(el, "tutorFee");
          }}
          class="input-m input input-bordered"
        />
      </label>

      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text text-base text-primary">Tutor fee</span>
        </div>
        <select
          class="select select-bordered select-md"
          ref={(el) => {
            register(el, "jobMethod");
          }}
        >
          <option disabled>Location</option>
          <option value={"ONLINE"}>Online</option>
          <option value={"OFFLINE"}>Offline</option>
          <option value={"BOTH"}>Both</option>
        </select>
      </label>

      <button class="btn btn-primary mt-4" type="submit" disabled={isLoading()}>
        {isLoading() ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default ProfileSummaryEdit;
