import { Switch, Match } from "solid-js";
import Loading from "../../common/components/LoadingIndicator/Loading";
import ProfileDetails from "./ProfileDetails";
import ProfileSummaryCard from "./ProfileSummaryCard";
import { useProfileContext } from "./context/ProfileContextProvider";

const ProfilePageLayout = () => {
  const { loading, error, data } = useProfileContext();

  return (
    <Switch>
      <Match when={error()}>
        <div>{error() ? `${error()}` : "Unexpected error"}</div>
      </Match>
      <Match when={loading()}>
        <div class="flex h-dvh w-full items-center justify-center">
          <Loading />
        </div>
      </Match>
      <Match when={data()}>
        <div class="flex w-full flex-row items-start justify-start gap-6">
          <ProfileSummaryCard user={data()!} />
          <ProfileDetails user={data()!} />
        </div>
      </Match>
    </Switch>
  );
};

export default ProfilePageLayout;
