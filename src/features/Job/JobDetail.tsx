import { Match, Show, Switch } from "solid-js";
import { useJobDetail } from "./context/JobDetailContext";
import Loading from "../../common/components/LoadingIndicator/Loading";
import CurrencyUtils from "../../common/utils/currency_utils";
import Avatar from "../../common/components/Avatar/Avatar";
import ApplyButton from "./ApplyButton";
import { useAuth } from "../../providers/AuthProvider";
import { produce, unwrap } from "solid-js/store";
import { JobConnection } from "../../schema/entities";
import JobActionButton from "./JobActionButton";
import { useParams } from "@solidjs/router";
import RequestedButton from "./RequestedButton";
import EditJobDetailButton from "./EditJobDetailButton";
import DeleteJobDetailButton from "./DeleteJobDetailButton";

const JobDetail = () => {
  const {
    data,
    error,
    loading,
    handleOnApplySuccess,
    handleOnUndoSuccess,
    setData,
  } = useJobDetail();

  const { auth } = useAuth();

  const isOwner = () => {
    if (auth.authenticated && auth.user) {
      return auth.user.id === data()?.learner.userId;
    }
    return false;
  };

  const jobConnection = () =>
    data()?.jobConnections ? data()!.jobConnections[0] : undefined;

  return (
    <Switch>
      <Match when={error()}>
        <div>{error() ? `${error()}` : "Unexpected error"}</div>
      </Match>
      <Match when={loading()}>
        <div class="flex items-center justify-center">
          <Loading />
        </div>
      </Match>
      <Match when={data()}>
        <div class="mt-4 flex w-full flex-row pl-6 pr-6">
          <div class="flex w-full flex-col gap-6">
            <div class="flex flex-col gap-4">
              <span class="text-2xl font-bold text-primary">
                {data()?.title}
              </span>
              <span class="text-xl font-semibold">Details</span>
              <div class="flex flex-row gap-6">
                <div class="flex flex-col">
                  <span class="text-lg font-semibold">
                    {data()?.fee ? CurrencyUtils.format(data()!.fee) : ""}
                  </span>
                  <span class="text-lg font-light">Fee</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-lg font-semibold">{data()?.jobMethod}</span>
                  <span class="text-lg font-light">Location</span>
                </div>
              </div>
              <div class="flex flex-col">
                <span class="text-lg font-semibold">Description</span>
                <span class="text-lg font-light">{data()?.description}</span>
              </div>
              <div class="flex flex-col">
                <span class="text-lg font-semibold">Availability</span>
              </div>
            </div>
          </div>

          <div class="fixed right-0 top-0 mt-20 hidden h-full w-80 bg-base-200 p-4 shadow-sm md:flex md:flex-col">
            <span class="text-lg font-semibold">About the learner</span>
            <div class="mt-4 flex flex-col items-center justify-center gap-4">
              <Avatar
                name={data()?.learner?.user?.username ?? ""}
                src={data()?.learner?.user?.avatar}
                size="md"
              />
              <span class="text-lg font-bold">
                {data()?.learner?.user?.username}
              </span>
            </div>
            <div class="divider"></div>
            <Show when={!isOwner()}>
              <Switch>
                <Match when={data()?.jobStatus == "OPEN"}>
                  <div class="flex flex-col items-center justify-center gap-4">
                    <button class="btn btn-outline w-full">Message</button>

                    <Switch>
                      <Match when={jobConnection()?.status == undefined}>
                        <ApplyButton
                          onApplySuccess={handleOnApplySuccess}
                          job={data()!}
                          buttonClass={"btn btn-primary w-full"}
                        />
                      </Match>
                      <Match when={jobConnection()?.status == "REQUESTED"}>
                        <RequestedButton
                          job={data()!}
                          requestedButtonClass={"btn btn-primary w-full"}
                          expand={true}
                          onUndoSuccess={handleOnUndoSuccess}
                        />
                      </Match>
                      <Match when={jobConnection()?.status == "ACCEPTED"}>
                        <button class="btn btn-primary">Accepted</button>
                      </Match>
                      <Match when={jobConnection()?.status == "DECLINED"}>
                        <button class="btn btn-primary">Declined</button>
                      </Match>
                    </Switch>
                  </div>
                </Match>
                <Match when={data()?.jobStatus == "EMPLOYED"}>
                  <button disabled class="btn disabled btn-primary w-full">
                    Not available
                  </button>
                </Match>
                <Match when={data()?.jobStatus == "DONE"}>
                  <button disabled class="btn disabled btn-primary w-full">
                    Done
                  </button>
                </Match>
              </Switch>
            </Show>
            <Show when={isOwner()}>
              <div class="flex flex-col gap-4">
                <EditJobDetailButton
                  job={data}
                  onEditSuccess={(job) => {
                    setData(job);
                  }}
                />
                <DeleteJobDetailButton job={data()!} />
              </div>
            </Show>
          </div>
        </div>

        <div class="fixed bottom-0 left-0 flex h-fit w-full flex-row items-center justify-around bg-base-200 p-4 md:hidden">
          <div class="flex flex-row items-center justify-center gap-4">
            <Avatar
              name={data()?.learner?.user?.username ?? ""}
              src={data()?.learner?.user?.avatar}
              size="md"
            />
            <span class="text-lg font-bold">
              {data()?.learner?.user?.username}
            </span>
          </div>

          <Show when={!isOwner()}>
            <Switch>
              <Match when={data()?.jobStatus == "OPEN"}>
                <div class="flex flex-row items-center justify-center gap-4">
                  <button class="btn btn-outline">Message</button>

                  <Switch>
                    <Match when={jobConnection()?.status == undefined}>
                      <ApplyButton
                        onApplySuccess={handleOnApplySuccess}
                        job={data()!}
                        buttonClass={"btn btn-primary"}
                      />
                    </Match>
                    <Match when={jobConnection()?.status == "REQUESTED"}>
                      <RequestedButton
                        job={data()!}
                        requestedButtonClass={"btn btn-primary"}
                        expand={true}
                        onUndoSuccess={handleOnUndoSuccess}
                      />
                    </Match>
                    <Match when={jobConnection()?.status == "ACCEPTED"}>
                      <button class="btn btn-primary">Accepted</button>
                    </Match>
                    <Match when={jobConnection()?.status == "DECLINED"}>
                      <button class="btn btn-primary">Declined</button>
                    </Match>
                  </Switch>
                </div>
              </Match>
              <Match when={data()?.jobStatus == "EMPLOYED"}>
                <button disabled class="btn disabled btn-primary w-full">
                  Not available
                </button>
              </Match>
              <Match when={data()?.jobStatus == "DONE"}>
                <button disabled class="btn disabled btn-primary w-full">
                  Done
                </button>
              </Match>
            </Switch>
          </Show>
          <Show when={isOwner()}>
            <div class="flex flex-col gap-4">
              <EditJobDetailButton
                job={data}
                onEditSuccess={(job) => {
                  setData(job);
                }}
              />
              <DeleteJobDetailButton job={data()!} />
            </div>
          </Show>
        </div>
      </Match>
    </Switch>
  );
};

export default JobDetail;
