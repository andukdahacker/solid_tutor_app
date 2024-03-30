import { Accessor, ParentProps, createContext, useContext } from "solid-js";
import createQuery from "../../../common/hooks/createQuery";
import { useParams } from "@solidjs/router";
import UserService from "../../../services/user_service";
import { User } from "../../../schema/entities";
import { useAuth } from "../../../providers/AuthProvider";

type ProfileContextType = {
  data: Accessor<User | undefined>;
  error: Accessor<Error | undefined>;
  loading: Accessor<boolean>;
};

const ProfileContext = createContext<ProfileContextType>();

const ProfileContextProvider = (props: ParentProps) => {
  const params = useParams();

  const { data, error, loading } = createQuery({
    params: () => params.id,
    queryFn: async (input) => {
      console.log("input", input);
      if (!input) throw new Error("Cannot get user id from params");
      return await UserService.getUserProfileById(input);
    },
  });
  return (
    <ProfileContext.Provider value={{ data, error, loading }}>
      {props.children}
    </ProfileContext.Provider>
  );
};

export function useProfileContext() {
  const value = useContext(ProfileContext);

  if (!value)
    throw new Error(
      "useProfileContext must be used within a ProfileContextProvider",
    );

  return value;
}

export default ProfileContextProvider;
