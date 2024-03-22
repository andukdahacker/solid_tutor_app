import * as i18n from "@solid-primitives/i18n";
import {
  Accessor,
  ParentProps,
  Suspense,
  createContext,
  createResource,
  createSignal,
  useContext,
  useTransition,
} from "solid-js";
import { Locale, fetchDictionary } from "../i18n/i18n";
import { Dict } from "../i18n/translations/en";
import Loading from "../common/components/LoadingIndicator/Loading";

interface ILocaleContext {
  locale: Accessor<Locale>;
  t: i18n.NullableTranslator<Dict, string>;
  switchLocale: (locale: Locale) => Promise<void>;
}

export const LocaleContext = createContext<ILocaleContext>();

export const LocaleProvider = (props: ParentProps) => {
  const [locale, setLocale] = createSignal<Locale>("en");
  const [dict] = createResource(locale, fetchDictionary);
  const t = i18n.translator(dict);
  const [duringTransition, startTransition] = useTransition();
  const switchLocale = (locale: Locale) =>
    startTransition(() => setLocale(locale));
  return (
    <LocaleContext.Provider value={{ locale, t, switchLocale }}>
      <div style={{ opacity: duringTransition() ? 0.5 : 1 }}>
        <Suspense fallback={<Loading />}>{props.children}</Suspense>
      </div>
    </LocaleContext.Provider>
  );
};

export function useLocale() {
  const values = useContext(LocaleContext);

  if (!values) throw new Error("Cannot get LocaleContext");

  return values;
}
