import { For, Match, Switch } from "solid-js";
import { supportedLang } from "../../i18n/i18n";
import { useLocale } from "../../providers/LocaleProvider";

const LocaleController = () => {
  const localeProps = useLocale();

  return (
    <>
      <select class="select select-bordered w-full max-w-xs">
        <option disabled>Language</option>
        <For each={supportedLang}>
          {(lang, _index) => {
            return (
              <option
                onClick={() => localeProps.switchLocale(lang)}
                selected={localeProps.locale() == lang}
              >
                <Switch>
                  <Match when={lang == "en"}>English</Match>
                  <Match when={lang == "vn"}>Tiếng Việt</Match>
                </Switch>
              </option>
            );
          }}
        </For>
      </select>
    </>
  );
};

export default LocaleController;
