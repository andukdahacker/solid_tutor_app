import { A } from "@solidjs/router";
import { Show } from "solid-js";
import Avatar from "../../common/components/Avatar/Avatar";
import { RoutesPath } from "../../common/constants";
import { useAuth } from "../../providers/AuthProvider";
import SettingButton from "./SettingButton";
import Logo from "../../common/components/Logo/Logo";

const SideNavBar = () => {
  const { auth } = useAuth();

  return (
    <>
      <Show when={!auth.authenticated}>
        <ul class="w-54 menu min-h-full bg-base-200 p-4 text-base-content">
          <li>Item 1</li>
          <li>Item 1</li>
          <li>Item 1</li>
        </ul>
      </Show>
      <Show when={auth.authenticated}>
        <div class="w-54 menu z-20 min-h-full bg-base-200 p-4 text-base-content">
          <div class="mb-10 flex flex-row items-center justify-start gap-2">
            <Logo />
            <span class="text-center text-lg font-bold text-primary sm:text-xl md:text-2xl lg:text-3xl">
              studybean
            </span>
          </div>

          <div class="flex flex-col gap-10">
            <A
              href={RoutesPath.explorePage}
              class="text-md btn h-16"
              activeClass="btn-primary"
              inactiveClass="btn-outline"
              onClick={() => {
                document.getElementById("my-drawer-2")?.click();
              }}
            >
              Explore
            </A>
            <A
              href={RoutesPath.learnerDashboardPage}
              class="text-md btn h-16"
              activeClass="btn-primary"
              inactiveClass="btn-outline"
              onClick={() => {
                document.getElementById("my-drawer-2")?.click();
              }}
            >
              Learner Dashboard
            </A>
            <A
              href={RoutesPath.tutorDashboardPage}
              class="text-md btn h-16"
              activeClass="btn-primary"
              inactiveClass="btn-outline"
              onClick={() => {
                document.getElementById("my-drawer-2")?.click();
              }}
            >
              Tutor Dashboard
            </A>
          </div>

          <div class="grow"></div>
          <div class="flex flex-row items-center justify-between">
            <A
              href={"/profile/" + auth.user?.id}
              class="flex-3 btn btn-ghost flex flex-row items-center justify-center p-2"
              onClick={() => {
                document.getElementById("my-drawer-2")?.click();
              }}
            >
              <Avatar
                src={auth.user?.avatar}
                name={auth.user?.username ?? ""}
                size="sm"
              />
              <span class="ml-2 text-sm font-bold">{auth.user?.username}</span>
            </A>
            <SettingButton />
          </div>
        </div>
      </Show>
    </>
  );
};

export default SideNavBar;
