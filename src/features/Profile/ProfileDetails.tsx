import { User } from "../../schema/entities";
import ProfileEducation from "./ProfileEducation";

interface ProfileDetailsProps {
  user: User;
}

const ProfileDetails = (props: ProfileDetailsProps) => {
  return (
    <div class="mr-4 mt-4 w-full">
      <div role="tablist" class="tabs tabs-lifted">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          class="tab"
          aria-label="Education"
          checked
        />
        <div
          role="tabpanel"
          class="tab-content rounded-box border-base-300 bg-base-100 p-6"
        >
          <ProfileEducation user={props.user} />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          class="tab"
          aria-label="Work Experience"
        />
        <div
          role="tabpanel"
          class="tab-content rounded-box border-base-300 bg-base-100 p-6"
        >
          Tab content 2
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          class="tab"
          aria-label="Subjects"
        />
        <div
          role="tabpanel"
          class="tab-content rounded-box border-base-300 bg-base-100 p-6"
        >
          Tab content 3
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          class="tab"
          aria-label="Ratings"
        />
        <div
          role="tabpanel"
          class="tab-content rounded-box border-base-300 bg-base-100 p-6"
        >
          Tab content 4
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
