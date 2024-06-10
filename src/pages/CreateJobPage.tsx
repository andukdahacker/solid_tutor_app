import { useNavigate } from "@solidjs/router";
import dayjs from "dayjs";
import { FiX } from "solid-icons/fi";
import { createSignal, Show, For, createEffect } from "solid-js";
import toast from "solid-toast";
import createForm from "../common/hooks/createForm";
import createMutation from "../common/hooks/createMutation";
import DatetimeUtils from "../common/utils/datetime_utils";
import SelectSubjectField from "../features/Job/SelectSubjectField";
import { Subject } from "../schema/entities";
import { CreateJobInput } from "../schema/inputs";
import JobService from "../services/job_service";
import Schedule from "../common/components/Schedule/Schedule";

const CreateJobPage = () => {
  const [currentTab, setCurrentTab] = createSignal(1);
  const [selectedSubject, setSelectedSubject] = createSignal<Subject | null>(
    null,
  );
  const [subjectError, setSubjectError] = createSignal<string | null>(null);

  const [schedules, setSchedules] = createSignal<
    {
      startTime: Date;
      endTime: Date;
    }[]
  >([]);

  const { register, handleSubmit, validate, fieldMap } = createForm<
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

  createEffect(() => {
    switch (currentTab()) {
      case 1:
        document.getElementById("step-1")?.classList.add("step-primary");
        document.getElementById("step-1-container")?.classList.remove("hidden");
        document.getElementById("step-2-container")?.classList.add("hidden");
        document.getElementById("step-3-container")?.classList.add("hidden");
        break;
      case 2:
        document.getElementById("step-2")?.classList.add("step-primary");
        document.getElementById("step-2-container")?.classList.remove("hidden");
        document.getElementById("step-1-container")?.classList.add("hidden");
        document.getElementById("step-3-container")?.classList.add("hidden");
        break;
      case 3:
        document.getElementById("step-3")?.classList.add("step-primary");
        document.getElementById("step-3-container")?.classList.remove("hidden");
        document.getElementById("step-1-container")?.classList.add("hidden");
        document.getElementById("step-2-container")?.classList.add("hidden");
        break;
      default:
    }
  });

  createEffect(() => {
    console.log(fieldMap());
  });
  return (
    <form
      class="flex flex-col items-center justify-center gap-4 p-6"
      onSubmit={async (e) => {
        e.preventDefault();

        await handleSubmit(async (values) => {
          mutate({
            ...values,
            subjectId: selectedSubject()?.id ?? "",
            numberOfSessions: 1,
            schedules: schedules().map((e) => {
              return {
                startTime: e.startTime.toISOString(),
                endTime: e.endTime.toISOString(),
              };
            }),
          });
        });
      }}
    >
      <ul class="steps steps-horizontal">
        <li class="step" id="step-1">
          General information
        </li>
        <li class="step" id="step-2">
          Schedule
        </li>
        <li class="step" id="step-3">
          Summary
        </li>
      </ul>

      <div
        id="step-1-container"
        class="flex max-w-md flex-col items-center justify-center"
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
              onSelect={(subject) => {
                setSubjectError(null);
                setSelectedSubject(subject);
              }}
            />
            <Show when={subjectError()}>
              <div class="label">
                <div class="label-text-alt text-error">{subjectError()}</div>
              </div>
            </Show>
          </Show>
        </div>
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Topic</span>
          </label>
          <input
            type="text"
            ref={(el) =>
              register(el, "title", (val) => {
                if (val == "") {
                  return "Topic is required";
                }

                return null;
              })
            }
            class="input input-bordered"
          />
          <Show when={fieldMap().get("title")?.errors}>
            <div class="label">
              <div class="label-text-alt text-error">
                {fieldMap().get("title")?.errors}
              </div>
            </div>
          </Show>
        </div>

        <div class="flex flex-row items-start justify-center gap-6">
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
        </div>

        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Description</span>
          </label>

          <textarea
            class="textarea textarea-bordered"
            ref={(el) => register(el, "description")}
          />
        </div>

        <div
          class="btn btn-primary mt-10"
          onClick={() => {
            const errMap = validate();
            if (errMap.size > 0 || selectedSubject() == null) {
              if (selectedSubject() == null) {
                setSubjectError("Subject is required");
              }
              return;
            }
            setCurrentTab(2);
          }}
        >
          Next
        </div>
      </div>

      <div
        id="step-2-container"
        class="flex w-full flex-col items-center justify-center p-10"
      >
        <div class="flex w-full items-center justify-between">
          <button
            class="btn-out btn"
            type="button"
            onClick={() => {
              document
                .getElementById("step-2")
                ?.classList.remove("step-primary");

              setCurrentTab(1);
            }}
          >
            Back
          </button>
          <Show when={schedules().length > 0}>
            <button
              class="btn btn-primary"
              type="button"
              onClick={() => {
                setCurrentTab(3);
              }}
            >
              Next
            </button>
          </Show>
        </div>
        <Schedule
          initialTime={dayjs()}
          onUpdateTimeBlocks={(timeBlocks) => {
            const schedules = timeBlocks.map((timeBlock) => {
              return {
                startTime: timeBlock.start.toDate(),
                endTime: timeBlock.end.toDate(),
              };
            });

            setSchedules(schedules);
          }}
        />
      </div>

      <div id="step-3-container" class="flex w-full flex-col">
        <div class="mt-4 flex w-full flex-row pl-6 pr-6">
          <div class="flex w-full flex-col gap-6">
            <div class="flex flex-col gap-4">
              <span class="text-2xl font-bold text-primary">
                {fieldMap().get("title")?.ref.value}
              </span>
              <span class="text-xl font-semibold">Details</span>
              <div class="flex flex-row gap-6">
                <div class="flex flex-col">
                  <span class="text-lg font-semibold">
                    {fieldMap().get("fee")?.ref.value}
                  </span>
                  <span class="text-lg font-light">Fee</span>
                </div>
                <div class="flex flex-col"></div>
                <span class="text-lg font-semibold">
                  {fieldMap().get("jobMethod")?.ref.value}
                </span>
                <span class="text-lg font-light">Location</span>
              </div>
            </div>
            <div class="flex flex-col">
              <span class="text-lg font-semibold">Description</span>
              <span class="text-lg font-light">
                {fieldMap().get("description")?.ref.value}
              </span>
            </div>
            <div class="flex flex-col">
              <span class="text-lg font-semibold">Availability</span>

              <div class="flex flex-wrap gap-2">
                <For each={schedules()}>
                  {(schedule) => (
                    <div class="badge badge-outline">
                      {dayjs(schedule.startTime).format("YYYY-MM-DD, HH:mm")} -{" "}
                      {dayjs(schedule.endTime).format("HH:mm")}
                    </div>
                  )}
                </For>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-10 flex w-full flex-row items-center justify-center gap-4">
          <button
            class="btn btn-outline"
            type="button"
            onClick={() => {
              document
                .getElementById("step-3")
                ?.classList.remove("step-primary");
              setCurrentTab(2);
            }}
          >
            Back
          </button>
          <button type="submit" class="btn btn-primary" disabled={isLoading()}>
            {isLoading() ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateJobPage;
