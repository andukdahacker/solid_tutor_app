import { FiFilter } from "solid-icons/fi";
import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import Modal from "../../common/components/Modal/Modal";
import { JobMethod } from "../../schema/entities";

interface JobFilter {
  minFee: number;
  jobMethod: JobMethod;
}

interface ExploreJobFilterProps {
  minFee?: number;
  jobMethod?: JobMethod;
  onApplyFilter: (params: JobFilter) => void;
}

const ExploreJobFilter = (props: ExploreJobFilterProps) => {
  const [isOpen, setIsOpen] = createSignal(false);

  const [localParams, setLocalParams] = createStore<JobFilter>({
    minFee: props.minFee ?? 0,
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
            <label class="label w-1/2">Minimum hourly rate</label>
            <input
              type="number"
              min="0"
              max="1000000"
              step={100000}
              value={localParams.minFee}
              onInput={(e) => {
                const numValue = Number.parseInt(e.target.value);
                if (numValue > 1000000) {
                  setLocalParams("minFee", 1000000);
                } else {
                  setLocalParams("minFee", numValue);
                }
              }}
              class="input input-bordered w-1/2"
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

export default ExploreJobFilter;
