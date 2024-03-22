import { useLocation, useNavigate } from "@solidjs/router";
import {
  ParentProps,
  createContext,
  createEffect,
  onMount,
  useContext,
} from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";
import { ACCESS_TOKEN_KEY, RoutesPath } from "../common/constants";
import createQuery from "../common/hooks/createQuery";
import { User } from "../schema/entities";
import AuthService from "../services/auth_service";

interface IAuthContext {
  authenticated: boolean;
  user: User | null;
}

const AuthContext = createContext<{
  auth: IAuthContext;
  setAuth: SetStoreFunction<IAuthContext>;
}>();

export const AuthProvider = (props: ParentProps) => {
  const [auth, setAuth] = createStore<IAuthContext>({
    authenticated: localStorage.getItem(ACCESS_TOKEN_KEY) ? true : false,
    user: null,
  });

  const navigate = useNavigate();
  const location = useLocation();

  createQuery({
    queryFn: async () => await AuthService.me(),
    onSuccess: (result) => {
      setAuth("authenticated", true);
      setAuth("user", result);
    },
    onError: (_error) => {
      setAuth("authenticated", false);
      setAuth("user", null);
    },
  });

  onMount(() => {
    if (auth.authenticated && location.pathname == RoutesPath.landingPage) {
      navigate(RoutesPath.explorePage);
    }
  });

  createEffect(() => {
    if (!auth.authenticated) {
      if (location.pathname == "/") return;
      navigate("/");
    }
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const values = useContext(AuthContext);

  if (!values) throw new Error("Cannot get AuthContext");

  return values;
};
