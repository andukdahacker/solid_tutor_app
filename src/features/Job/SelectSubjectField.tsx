import { For, Match, Show, Switch, createSignal } from "solid-js";
import createQuery from "../../common/hooks/createQuery";
import SubjectService from "../../services/subject_service";
import Loading from "../../common/components/LoadingIndicator/Loading";
import { Subject } from "../../schema/entities";

interface ISelectSubjectFieldProps {
  onSelect: (subject: Subject) => void;
}

const SelectSubjectField = (props: ISelectSubjectFieldProps) => {
  const [input, setInput] = createSignal("");

  const { data, loading, error } = createQuery({
    params: input,
    queryFn: async (input) =>
      await SubjectService.findSubjects({ searchString: input!, take: 10 }),
    debounce: 500,
  });

  return (
    <div class="w-full">
      <input
        type="text"
        placeholder="Find subject"
        class="input input-bordered w-full"
        value={input()}
        onInput={(e) => setInput(e.currentTarget.value)}
      />

      <div class="mt-4">
        <Switch>
          <Match when={loading()}>
            <div class="flex items-center justify-center">
              <Loading />
            </div>
          </Match>
          <Match when={error()}>
            <div class="hover:bg-base-200">{error()?.message}</div>
          </Match>
          <Match when={data() && data()!.nodes && data()!.nodes!.length > 0}>
            <div class="flex w-full flex-wrap justify-center gap-2">
              <For each={data()?.nodes}>
                {(subject) => (
                  <div
                    class="badge badge-outline badge-md cursor-pointer"
                    onClick={() => {
                      props.onSelect(subject);
                    }}
                  >
                    {subject.name}
                  </div>
                )}
              </For>
            </div>
          </Match>
        </Switch>
      </div>
    </div>
  );
};

export default SelectSubjectField;
