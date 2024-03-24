import {
  Accessor,
  ParentProps,
  createContext,
  createEffect,
  useContext,
} from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";
import { FindManyTutorsInput } from "../../../schema/inputs";
import createPaginatedQuery from "../../../common/hooks/createPaginatedQuery";
import ExploreService from "../../../services/explore_service";
import { debounce } from "@solid-primitives/scheduled";
import { Paginated, Job, TutorProfile } from "../../../schema/entities";

interface IExploreJobContext {
  params: FindManyTutorsInput;
  error: Accessor<Error | undefined>;
  loading: Accessor<boolean>;
  setParams: SetStoreFunction<FindManyTutorsInput>;
  data: Paginated<TutorProfile>;
  handleFetchMore: (e: Event) => Promise<void>;
  isFetchingMore: Accessor<boolean>;
}

const ExploreTutorContext = createContext<IExploreJobContext>();

interface ExploreTutorProviderProps {
  searchInput: () => string;
}

const ExploreTutorProvider = (
  props: ParentProps<ExploreTutorProviderProps>,
) => {
  const initialInput = () => props.searchInput();
  const [params, setParams] = createStore<FindManyTutorsInput>({
    searchString: initialInput(),
    take: 10,
  });

  const { data, error, loading, fetchMore, isFetchingMore } =
    createPaginatedQuery({
      params: params,
      queryFn: async (input) => {
        if (!input) throw Error("input is not provided");
        return await ExploreService.findManyTutors(input);
      },
    });

  const handleFetchMore = async (e: Event) => {
    if (data.pageInfo?.hasNextPage) {
      await fetchMore({
        ...params,
        stringCursor: (data.pageInfo?.cursor as string) ?? "",
      });
    }
  };

  const trigger = debounce((input: string) => {
    setParams("searchString", input);
  }, 500);

  createEffect(() => {
    trigger(props.searchInput());
  });
  return (
    <ExploreTutorContext.Provider
      value={{
        data,
        error,
        loading,
        params,
        setParams,
        handleFetchMore,
        isFetchingMore,
      }}
    >
      {props.children}
    </ExploreTutorContext.Provider>
  );
};

export function useExploreTutor() {
  const value = useContext(ExploreTutorContext);
  if (!value) {
    throw new Error(
      "useExploreTutor must be used within an ExploreTutorProvider",
    );
  }
  return value;
}

export default ExploreTutorProvider;
