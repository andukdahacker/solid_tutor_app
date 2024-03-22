import { FiSearch } from "solid-icons/fi";
import { Accessor, Setter } from "solid-js";
import { ExploreType } from "../../common/types/explore_type";

interface ExploreSearchBarProps {
  exploreType: ExploreType;
  onChangeExploreType: (type: ExploreType) => void;
  searchInput: Accessor<string>;
  setSearchInput: Setter<string>;
}

const ExploreSearchBar = (props: ExploreSearchBarProps) => {
  return (
    <label class="input input-bordered flex items-center sm:input-lg">
      <input
        type="text"
        class="grow"
        placeholder="Search"
        value={props.searchInput()}
        onInput={(e) => {
          props.setSearchInput(e.target.value);
        }}
      />
      <select
        class="select select-bordered select-md w-full max-w-xs"
        value={props.exploreType}
        onChange={(e) => {
          switch (e.target.value) {
            case "jobs":
              props.onChangeExploreType("jobs");
              break;
            case "tutors":
              props.onChangeExploreType("tutors");
              break;
            default:
              break;
          }
        }}
      >
        <option value={"jobs"} selected={props.exploreType == "jobs"}>
          Jobs
        </option>
        <option value={"tutors"} selected={props.exploreType == "tutors"}>
          Tutors
        </option>
      </select>
    </label>
  );
};

export default ExploreSearchBar;
