import { Accessor, createSignal } from "solid-js";
import { Result } from "../../services/result";

type MutationOptions<Response, Params> = {
  mutate: (params: Params) => Promise<Result<Response>>;
  onSuccess: (result: Response) => void;
  onError: (error: Error) => void;
};

function createMutation<Response, Params>(
  options: MutationOptions<Response, Params>,
) {
  const [isLoading, setIsLoading] = createSignal(false);

  const mutate = async (params: Params) => {
    setIsLoading(true);
    const result = await options.mutate(params);

    await new Promise((resolve) =>
      setTimeout(() => {
        setIsLoading(false);
        resolve(null);
      }, 1000),
    );

    if (result.ok) {
      options.onSuccess(result.value);
    } else {
      options.onError(result.error);
    }
  };

  return { isLoading, mutate };
}

export default createMutation;
