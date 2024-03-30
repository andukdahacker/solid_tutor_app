import { Match, Switch } from "solid-js";
import ProfileDetails from "../features/Profile/ProfileDetails";
import ProfileSummaryCard from "../features/Profile/ProfileSummaryCard";
import ProfileContextProvider, {
  useProfileContext,
} from "../features/Profile/context/ProfileContextProvider";
import Loading from "../common/components/LoadingIndicator/Loading";
import ProfilePageLayout from "../features/Profile/ProfilePageLayout";

const ProfilePage = () => {
  return (
    <ProfileContextProvider>
      <ProfilePageLayout />
    </ProfileContextProvider>
  );
};

export default ProfilePage;
