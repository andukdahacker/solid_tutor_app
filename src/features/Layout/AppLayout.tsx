import { ParentProps } from "solid-js";
import { useAuth } from "../../providers/AuthProvider";
import NavBar from "../NavBar/NavBar";
import SideNavBar from "../NavBar/SideNavBar";

const AppLayout = (props: ParentProps) => {
  const { auth } = useAuth();
  return (
    <div class="drawer" classList={{ "xl:drawer-open": auth.authenticated }}>
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-row items-start justify-center">
        <div class="w-full">
          <NavBar />
          {props.children}
        </div>
      </div>
      <div class="drawer-side z-10">
        <label
          for="my-drawer-2"
          aria-label="close sidebar"
          class="drawer-overlay"
        ></label>
        <SideNavBar />
      </div>
    </div>
  );
};

export default AppLayout;
