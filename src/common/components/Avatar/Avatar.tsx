import { Show } from "solid-js";

interface AvatarProps {
  src?: string;
  name: string;
  size: "sm" | "md" | "lg";
}

const Avatar = (props: AvatarProps) => {
  return (
    <div class="avatar placeholder">
      <div
        class="rounded-full ring ring-primary ring-offset-2 ring-offset-base-100"
        classList={{
          "w-6": props.size == "sm",
          "w-10": props.size == "md",
          "w-16": props.size == "lg",
        }}
      >
        <Show when={props.src}>
          <img src={props.src} />
        </Show>
        <Show when={!props.src}>
          <span>{props.name.charAt(0)}</span>
        </Show>
      </div>
    </div>
  );
};

export default Avatar;
