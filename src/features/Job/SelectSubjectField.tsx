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
import createMutation from "../../common/hooks/createMutation";
import { CreateSubjectInput } from "../../schema/inputs";
import toast from "solid-toast";

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

  const { mutate, isLoading } = createMutation({
    mutate: async (input: CreateSubjectInput) =>
      await SubjectService.createSubject(input),
    onSuccess: (data) => {
      props.onSelect(data);
      return data;
    },
    onError: (error) => {
      toast.error("Failed to create new subject");
      return error;
    },
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
          <Show when={data() && data()?.nodes?.length == 0}>
            <div class="flex h-10 w-full cursor-pointer flex-row items-center bg-base-200 p-2">
              <div>{input()}</div>
              <div class="grow"></div>
              <button
                class="btn btn-outline btn-primary btn-sm"
                onClick={async () => {
                  await mutate({
                    name: input(),
                  });
                }}
                disabled={isLoading()}
              >
                {isLoading() ? "Creating..." : "Create new subject"}
              </button>
            </div>
          </Show>
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
