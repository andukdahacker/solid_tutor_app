import { FiFilter } from "solid-icons/fi";
import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import Modal from "../../common/components/Modal/Modal";
import { JobMethod } from "../../schema/entities";

interface TutorFilter {
  maxFee: number;
  jobMethod: JobMethod;
}

interface ExploreTutorFilterProps {
  maxFee?: number;
  jobMethod?: JobMethod;
  onApplyFilter: (values: TutorFilter) => void;
}

const ExploreTutorFilter = (props: ExploreTutorFilterProps) => {
  const [isOpen, setIsOpen] = createSignal(false);

  const [localParams, setLocalParams] = createStore<TutorFilter>({
    maxFee: props.maxFee ?? 200000,
    jobMethod: props.jobMethod ?? "BOTH",
  });

  return (
    <>
      <button class="btn btn-primary" onClick={() => setIsOpen(true)}>
        <FiFilter />
      </button>

      <Modal isOpen={isOpen()} onClose={() => setIsOpen(false)}>
        <div class="flex flex-col gap-4">
          <div class="flex flex-row gap-4">
            <label class="label w-1/2">Maximum hourly rate</label>
            <input
              type="number"
              min="0"
              max="1000000"
              step={100000}
              value={localParams.maxFee}
              onInput={(e) => {
                const numValue = Number.parseInt(e.target.value);
                if (numValue > 1000000) {
                  setLocalParams("maxFee", 1000000);
                } else {
                  setLocalParams("maxFee", numValue);
                }
              }}
              class="input-m input input-bordered w-1/2"
            />
          </div>
          <div class="flex flex-row gap-4">
            <label class="label w-1/2 grow">Location</label>
            <select
              class="select select-bordered select-md w-1/2"
              value={localParams.jobMethod}
              onChange={(e) => {
                switch (e.target.value) {
                  case "ONLINE":
                    setLocalParams("jobMethod", "ONLINE");
                    break;
                  case "OFFLINE":
                    setLocalParams("jobMethod", "OFFLINE");
                    break;
                  case "BOTH":
                    setLocalParams("jobMethod", "BOTH");
                    break;
                  default:
                    break;
                }
              }}
            >
              <option disabled>Location</option>
              <option value={"ONLINE"}>Online</option>
              <option value={"OFFLINE"}>Offline</option>
              <option value={"BOTH"}>Both</option>
            </select>
          </div>

          <div class="flex flex-row justify-end gap-4">
            <button
              class="btn btn-outline"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Cancel
            </button>
            <button
              class="btn btn-primary"
              onClick={() => {
                setIsOpen(false);
                props.onApplyFilter(localParams);
              }}
            >
              Apply
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ExploreTutorFilter;
