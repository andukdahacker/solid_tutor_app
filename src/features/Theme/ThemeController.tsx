import { createEffect, createSignal } from "solid-js";
import { FiSun, FiMoon } from "solid-icons/fi";

const ThemeController = () => {
  const [theme, setTheme] = createSignal<"night" | "nord">("nord");

  createEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", theme());
  });

  return (
    <>
      <label class="swap swap-rotate">
        <input
          type="checkbox"
          onClick={() =>
            setTheme((theme) => (theme == "night" ? "nord" : "night"))
          }
        />

        <FiSun class="swap-on h-8 w-8 fill-current" />

        <FiMoon class="swap-off h-8 w-8 fill-current" />
      </label>
    </>
  );
};

export default ThemeController;
