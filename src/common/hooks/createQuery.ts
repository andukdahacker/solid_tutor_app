import { Accessor, createEffect, createSignal, onMount } from "solid-js";
import { Result } from "../../services/result";

type QueryOptions<Response, Params> = {
  params?: Params;
  queryFn: (params?: Params) => Promise<Result<Response>>;
  onSuccess?: (result: Response) => Response;
  onError?: (error: Error) => Error;
  enabled?: () => boolean;
};

function createQuery<Response, Params>(
  options: QueryOptions<Response, Params>,
) {
  const [data, setData] = createSignal<Response | undefined>(undefined);
  const [error, setError] = createSignal<Error | undefined>(undefined);
  const [loading, setLoading] = createSignal(false);

  const enabled = () => {
    if (!options.enabled) return true;

    return options.enabled();
  };

  const refetch = async (params?: Params) => {
    if (!enabled()) return;
    setLoading(true);
    const result = await options.queryFn(params);
    setLoading(false);

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

  onMount(async () => {
    await refetch(options.params ?? undefined);
  });

  if (options.params) {
    createEffect(async () => {
      await refetch(options.params ?? undefined);
    });
  }

  return { data, error, loading, refetch };
}

export default createQuery;
