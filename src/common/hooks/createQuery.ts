import { Accessor, createEffect, createSignal, onMount } from "solid-js";
import { Result } from "../../services/result";
import { debounce } from "@solid-primitives/scheduled";

type QueryOptions<Response, Params> = {
  params?: Accessor<Params>;
  queryFn: (params?: Params) => Promise<Result<Response>>;
  onSuccess?: (result: Response) => Response;
  onError?: (error: Error) => Error;
  enabled?: () => boolean;
  debounce?: number;
};

function createQuery<Response, Params>(
  options: QueryOptions<Response, Params>,
) {
  const [data, setData] = createSignal<Response>();
  const [error, setError] = createSignal<Error>();
  const [loading, setLoading] = createSignal(false);

  const params = () => options.params ?? undefined;
  const enabled = () => {
    if (!options.enabled) return true;

    return options.enabled();
  };

  const refetch = async (params?: Params) => {
    if (!enabled()) return;
    setLoading(true);
    const result = await options.queryFn(params);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    if (result.ok) {
      let finalValue = result.value;

      if (options.onSuccess) {
        finalValue = options.onSuccess(result.value);
      }

      setData((_data) => finalValue);
      setError((_err) => undefined);
    } else {
      let finalError = result.error;

      if (options.onError) {
        finalError = options.onError(result.error);
      }
      setError((_err) => finalError);
    }
  };

  const trigger = debounce(
    (params?: Params) => refetch(params),
    options.debounce ?? 0,
  );

  onMount(async () => {
    await refetch(options.params?.() ?? undefined);
  });

  if (params()) {
    createEffect(async () => {
      trigger(options.params?.() ?? undefined);
    });
  }

  return { data, setData, error, loading, refetch };
}

export default createQuery;
