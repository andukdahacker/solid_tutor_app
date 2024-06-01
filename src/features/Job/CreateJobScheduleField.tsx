import { createSignal } from "solid-js";
import { CreateJobScheduleInput } from "../../schema/inputs";

interface CreateJobScheduleFieldProps {
  onDelete: () => void;
}

const CreateJobScheduleField = (props: CreateJobScheduleFieldProps) => {
  const [schedule, setSchedule] = createSignal<CreateJobScheduleInput>({
    startTime: "",
    endTime: "",
  });
  return (
    <div class="flex flex-row gap-4">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Start time</span>
        </label>
        <input
          type="time"
          class="input input-bordered w-full"
          value={schedule().startTime}
          onChange={(e) =>
            setSchedule({
              ...schedule(),
              startTime: e.currentTarget.value,
            })
          }
        />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">End time</span>
        </label>
        <input
          type="time"
          class="input input-bordered w-full"
          value={schedule().endTime}
          onChange={(e) =>
            setSchedule({
              ...schedule(),
              endTime: e.currentTarget.value,
            })
          }
        />
      </div>

      <button
        class="btn btn-primary"
        type="button"
        onClick={() => {
          props.onDelete();
        }}
      >
        Add
      </button>
    </div>
  );
};

export default CreateJobScheduleField;
