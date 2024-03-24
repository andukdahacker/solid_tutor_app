import { createEffect, createSignal } from "solid-js";
import { FiSun, FiMoon } from "solid-icons/fi";

const ThemeController = () => {
  const [theme, setTheme] = createSignal<"synthwave" | "fantasy">("fantasy");

  createEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", "dim");
  });

  return (
    <>
      <label class="swap swap-rotate">
        <input
          type="checkbox"
          onClick={() =>
            setTheme((theme) => (theme == "fantasy" ? "synthwave" : "fantasy"))
          }
        />

        <FiSun class="swap-on h-8 w-8 fill-current" />

        <FiMoon class="swap-off h-8 w-8 fill-current" />
      </label>
    </>
  );
};

export default ThemeController;
