import { FiBell, FiMenu, FiMessageCircle } from "solid-icons/fi";

import { Show } from "solid-js";
import { useAuth } from "../../providers/AuthProvider";
import { useLocale } from "../../providers/LocaleProvider";
import JoinButton from "../Auth/JoinButton";
import SignInButton from "../Auth/SignInButton";
import SignUpButton from "../Auth/SignUpButton";
import LocaleController from "../Locale/LocaleController";
import ThemeController from "../Theme/ThemeController";
import CreateJobButton from "../Job/CreateJobButton";
import { RoutesPath } from "../../common/constants";
import { A } from "@solidjs/router";

const NavBar = () => {
  const { t } = useLocale();
  const { auth } = useAuth();

  return (
    <div class="sticky top-0 z-10 flex h-20 w-full flex-row items-center justify-between p-4 shadow-sm backdrop-blur">
      <label for="my-drawer-2" class="btn btn-primary drawer-button xl:hidden">
        <FiMenu class="h-6 w-6" />
      </label>

      <Show when={!auth.authenticated}>
        <h1 class="text-lg font-bold text-primary sm:text-xl md:text-2xl lg:text-3xl">
          StudyBean
        </h1>
        <ul class="hidden flex-row gap-20 lg:flex">
          <li class="cursor-pointer">{t("findTutors")}</li>
          <li class="cursor-pointer">{t("findLearners")}</li>
        </ul>
        <div class="hidden lg:flex lg:gap-6">
          <ThemeController />
          <LocaleController />
          <SignInButton />
          <SignUpButton />
        </div>
        <JoinButton />
      </Show>

      <Show when={auth.authenticated}>
        <div class=" flex w-full flex-row items-center justify-between p-2">
          <div class="grow"></div>
          <div class="flex flex-row items-center justify-center gap-6">
            <FiMessageCircle class="h-6 w-6" />
            <FiBell class="h-6 w-6" />
            <A href={RoutesPath.createJob} class="btn btn-primary">
              Create Job
            </A>
          </div>
        </div>
      </Show>
    </div>
  );
};

export default NavBar;
