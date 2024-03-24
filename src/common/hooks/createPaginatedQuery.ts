import { Accessor, batch, createEffect, createSignal, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { PageInfo, Paginated } from "../../schema/entities";
import { Result } from "../../services/result";

type QueryOptions<Response, Params> = {
  params?: Params;
  queryFn: (params?: Params) => Promise<Result<Paginated<Response>>>;
  onSuccess?: (result: Paginated<Response>) => Paginated<Response>;
  onError?: (error: Error) => Error;
  enabled?: () => boolean;
};

function createPaginatedQuery<Response, Params>(
  options: QueryOptions<Response, Params>,
) {
  const [data, setData] = createStore<Paginated<Response>>({
    nodes: undefined,
    pageInfo: undefined,
  });

  const [error, setError] = createSignal<Error | undefined>(undefined);
  const [loading, setLoading] = createSignal(false);
  const [isFetchingMore, setIsFetchingMore] = createSignal(false);

  const enabled = () => {
    if (!options.enabled) return true;

    return options.enabled();
  };

  const refetch = async (params?: Params) => {
    if (!enabled()) return;
    setLoading(true);
    const result = await options.queryFn(params);

    await new Promise((resolve) =>
      setTimeout(() => {
        setLoading(false);
        resolve(null);
      }, 1000),
    );

    if (result.ok) {
      let finalValue = result.value;

      if (options.onSuccess) {
        finalValue = options.onSuccess(result.value);
      }

      batch(() => {
        setData("nodes", finalValue.nodes);
        setData("pageInfo", finalValue.pageInfo);
        setError((_err) => undefined);
      });
    } else {
      let finalError = result.error;

      if (options.onError) {
        finalError = options.onError(result.error);
      }
      setError((_err) => finalError);
    }
  };

  const fetchMore = async (params?: Params) => {
    if (!enabled()) return;
    setIsFetchingMore(true);
    const result = await options.queryFn(params);
    await new Promise((resolve) =>
      setTimeout(() => {
        setIsFetchingMore(false);
        resolve(null);
      }, 1000),
    );

    if (result.ok) {
      let finalValue = result.value;

      if (options.onSuccess) {
        finalValue = options.onSuccess(result.value);
      }

      batch(() => {
        setData("nodes", [...(data.nodes ?? []), ...(finalValue?.nodes ?? [])]);
        setData("pageInfo", finalValue.pageInfo);
        setError((_err) => undefined);
      });
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

  return { data, setData, error, loading, refetch, fetchMore, isFetchingMore };
}

export default createPaginatedQuery;
