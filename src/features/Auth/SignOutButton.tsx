import { useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";
import toast from "solid-toast";
import Loading from "../../common/components/LoadingIndicator/Loading";
import Modal from "../../common/components/Modal/Modal";
import { ACCESS_TOKEN_KEY, RoutesPath } from "../../common/constants";
import createMutation from "../../common/hooks/createMutation";
import { useAuth } from "../../providers/AuthProvider";
import AuthService from "../../services/auth_service";

const SignOutButton = () => {
  const [signOutModalOpen, setSignOutModalOpen] = createSignal(false);
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const { mutate, isLoading } = createMutation({
    mutate: async () => await AuthService.logOut(),
    onSuccess: () => {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      setAuth({ authenticated: false, user: null });
      navigate(RoutesPath.landingPage);
      toast.success("Signed out successfully");
    },
    onError: (error) => {
      toast.error(`Failed to sign out`);
    },
  });
  return (
    <>
      <button
        onClick={() => {
          setSignOutModalOpen(true);
        }}
      >
        Sign Out
      </button>

      <Modal
        isOpen={signOutModalOpen()}
        onClose={() => setSignOutModalOpen(false)}
      >
        <div>
          <span class="mt-6">Are you sure you want to sign out?</span>

          <div class="mt-6 flex flex-row items-center justify-center">
            <button
              class="btn btn-neutral mr-6"
              onClick={() => setSignOutModalOpen(false)}
            >
              No
            </button>

            <button
              class="btn btn-error"
              disabled={isLoading()}
              onClick={() => mutate()}
            >
              {isLoading() ? <Loading /> : "Sign Out"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default SignOutButton;
