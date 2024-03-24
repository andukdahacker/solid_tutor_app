interface LoadingProps {
  size?: "sm" | "md" | "lg";
}
const Loading = (props: LoadingProps) => {
  const loadingSm = "loading loading-ring loading-sm text-primary";
  const loadingMd = "loading loading-ring loading-md text-primary";
  const loadingLg = "loading loading-ring loading-lg text-primary";
  return (
    <span
      class={
        props.size == "sm"
          ? loadingSm
          : props.size == "md"
            ? loadingMd
            : loadingLg
      }
    ></span>
  );
};

export default Loading;
