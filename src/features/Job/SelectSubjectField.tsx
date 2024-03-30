import {
  For,
  Match,
  Show,
  Switch,
  createEffect,
  createSignal,
  onMount,
} from "solid-js";
import createQuery from "../../common/hooks/createQuery";
import SubjectService from "../../services/subject_service";
import Loading from "../../common/components/LoadingIndicator/Loading";
import { Subject } from "../../schema/entities";

interface ISelectSubjectFieldProps {
  onSelect: (subject: Subject) => void;
}

const SelectSubjectField = (props: ISelectSubjectFieldProps) => {
  const [input, setInput] = createSignal("");
  const [showSuggestions, setShowSuggestions] = createSignal(false);
  const [mouseAtSuggestions, setMouseAtSuggestions] = createSignal(false);

  const { data } = createQuery({
    params: input,
    queryFn: async (input) =>
      await SubjectService.findSubjects({ searchString: input!, take: 10 }),
    debounce: 500,
  });

  return (
    <div class="relative w-full">
      <input
        type="text"
        placeholder="Find subject"
        class="input input-bordered w-full"
        value={input()}
        onInput={(e) => setInput(e.currentTarget.value)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => {
          if (mouseAtSuggestions()) return;
          setShowSuggestions(false);
        }}
      />

      <Show when={showSuggestions()}>
        <div
          class="absolute left-0 top-full w-full"
          onMouseEnter={() => setMouseAtSuggestions(true)}
          onMouseLeave={() => setMouseAtSuggestions(false)}
        >
          <For each={data()?.nodes}>
            {(subject) => (
              <div
                class="flex h-10 w-full cursor-pointer items-center bg-base-200 p-2 hover:bg-base-300"
                onClick={(e) => {
                  props.onSelect(subject);
                }}
              >
                {subject.name}
              </div>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
};

export default SelectSubjectField;
