import { FiSettings } from "solid-icons/fi";
import SignOutButton from "../Auth/SignOutButton";
import ThemeController from "../Theme/ThemeController";

const SettingButton = () => {
  return (
    <div class="flex-2 dropdown dropdown-end dropdown-top">
      <div tabindex="0" role="button" class="btn btn-ghost m-1">
        <FiSettings class="h-6 w-6" />
      </div>
      <ul
        tabindex="0"
        class="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
      >
        <li>
          <ThemeController />
        </li>
        <li>
          <SignOutButton />
        </li>
      </ul>
    </div>
  );
};

export default SettingButton;
