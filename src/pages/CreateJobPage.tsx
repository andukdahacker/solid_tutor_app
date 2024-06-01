import { useNavigate } from "@solidjs/router";
import dayjs from "dayjs";
import { FiX, FiDelete } from "solid-icons/fi";
import { createSignal, Show, For } from "solid-js";
import toast from "solid-toast";
import createForm from "../common/hooks/createForm";
import createMutation from "../common/hooks/createMutation";
import DatetimeUtils from "../common/utils/datetime_utils";
import CreateJobButton from "../features/Job/CreateJobButton";
import SelectSubjectField from "../features/Job/SelectSubjectField";
import { Subject } from "../schema/entities";
import { CreateJobInput } from "../schema/inputs";
import JobService from "../services/job_service";

const CreateJobPage = () => {
  const [selectedSubject, setSelectedSubject] = createSignal<Subject | null>(
    null,
  );

  const [schedules, setSchedules] = createSignal<
    {
      date: Date;
      startTime: string;
      endTime: string;
    }[]
  >([]);

  const { register, handleSubmit } = createForm<
    Omit<CreateJobInput, "subjectId" | "schedules">
  >({
    title: "",
    description: "",
    fee: 0,
    jobMethod: "BOTH",
    numberOfSessions: 1,
  });

  const navigate = useNavigate();

  const { mutate, isLoading } = createMutation({
    mutate: async (input: CreateJobInput) => await JobService.createJob(input),
    onSuccess: (result) => {
      toast.success("Created job successfully");
      navigate("/job/" + result.id);
      return result;
    },
    onError: (error) => {
      toast.error("Failed to create job");
      return error;
    },
  });
  return (
    <>
      <form
        class="w-80"
        onSubmit={async (e) => {
          e.preventDefault();

          await handleSubmit(async (values) => {
            mutate({
              ...values,
              subjectId: selectedSubject()?.id ?? "",
              numberOfSessions: 1,
              schedules: schedules().map((e) => {
                const { startDate, endDate } =
                  DatetimeUtils.contructStartEndDate(
                    e.date,
                    e.startTime,
                    e.endTime,
                  );

                console.log(startDate, endDate);

                return {
                  startTime: startDate.toISOString(),
                  endTime: endDate.toISOString(),
                };
              }),
            });
          });
        }}
      >
        <div class="form-control w-full">
          <label>
            <span class="label-text mr-4">Subject</span>
            <Show when={selectedSubject()}>
              <div class="badge badge-primary badge-outline badge-lg">
                {selectedSubject()?.name}
                <div
                  class="ml-2 cursor-pointer"
                  onClick={() => setSelectedSubject(null)}
                >
                  <FiX />
                </div>
              </div>
            </Show>
          </label>
          <Show when={!selectedSubject()}>
            <SelectSubjectField
              onSelect={(subject) => setSelectedSubject(subject)}
            />
          </Show>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Topic</span>
          </label>
          <input
            type="text"
            ref={(el) => register(el, "title")}
            class="input input-bordered"
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Location</span>
          </label>
          <select
            ref={(el) => register(el, "jobMethod")}
            class="select select-bordered"
          >
            <option value={"BOTH"}>BOTH</option>
            <option value={"ONLINE"}>ONLINE</option>
            <option value={"OFFLINE"}>OFFLINE</option>
          </select>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Fee</span>
          </label>
          <input
            type="number"
            min="0"
            max="1000000"
            step={100000}
            ref={(el) => register(el, "fee")}
            class="input input-bordered w-full"
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Description</span>
          </label>

          <textarea
            class="textarea textarea-bordered"
            ref={(el) => register(el, "description")}
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Schedules</span>
          </label>

          <button
            class="btn btn-outline"
            type="button"
            onClick={() => {
              const newSchedule = {
                date: new Date(),
                startTime: "",
                endTime: "",
              };
              setSchedules([...schedules(), newSchedule]);
            }}
          >
            Add Schedule
          </button>

          <For each={schedules()}>
            {(schedule, index) => (
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Schedule {index() + 1}</span>
                </label>
                <div class="flex flex-row items-center justify-center gap-10">
                  <div class="flex flex-row items-center justify-center gap-4">
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">Date</span>
                      </label>
                      <input
                        type="date"
                        class="input input-sm input-bordered"
                        value={dayjs(schedules()[index()].date).format(
                          "YYYY-MM-DD",
                        )}
                        onChange={(e) =>
                          setSchedules(
                            schedules().map((s, i) =>
                              i === index()
                                ? {
                                    ...s,
                                    date: new Date(e.currentTarget.value),
                                  }
                                : s,
                            ),
                          )
                        }
                      />
                      <label class="label">
                        <span class="label-text">Start time</span>
                      </label>

                      <input
                        type="time"
                        class="input input-sm input-bordered max-w-xs"
                        value={schedule.startTime}
                        onChange={(e) =>
                          setSchedules(
                            schedules().map((s, i) =>
                              i === index()
                                ? {
                                    ...s,
                                    startTime: e.currentTarget.value,
                                  }
                                : s,
                            ),
                          )
                        }
                      />
                    </div>
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">End time</span>
                      </label>
                      <input
                        type="time"
                        class="input input-sm input-bordered max-w-xs"
                        value={schedule.endTime}
                        onChange={(e) =>
                          setSchedules(
                            schedules().map((s, i) =>
                              i === index()
                                ? {
                                    ...s,
                                    endTime: e.currentTarget.value,
                                  }
                                : s,
                            ),
                          )
                        }
                      />
                    </div>
                  </div>
                  <button
                    class="btn btn-error btn-sm"
                    type="button"
                    onClick={() => {
                      setSchedules(schedules().filter((s, i) => i !== index()));
                    }}
                  >
                    <FiDelete />
                  </button>
                </div>
              </div>
            )}
          </For>
        </div>

        <div class="mt-10 flex w-full flex-row items-center justify-center gap-4">
          <button type="submit" class="btn btn-primary" disabled={isLoading()}>
            {isLoading() ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateJobPage;
