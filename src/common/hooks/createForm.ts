import { ReactiveMap } from "@solid-primitives/map";
import { batch, createSignal } from "solid-js";

type FieldState = {
  ref: HTMLInputElement | HTMLSelectElement;
  errors: string | string[] | null;
  touched: boolean;
  validator?: (val: string) => string | null;
};

function createForm<T extends Record<string, any>>(initialValues: T) {
  const [fieldMap, setFieldMapState] = createSignal<
    ReactiveMap<keyof T, FieldState>
  >(new ReactiveMap());

  const register = (
    el: HTMLInputElement | HTMLSelectElement,
    field: keyof T,
    validator?: (val: string) => string | null,
  ) => {
    el.value = initialValues[field];

    setFieldMapState((map) =>
      map.set(field, {
        errors: null,
        ref: el,
        touched: false,
        validator,
      }),
    );

    const fieldValue = fieldMap().get(field);

    fieldValue?.ref.addEventListener("input", () => {
      const validateResult =
        fieldValue.validator && fieldValue.ref.value != ""
          ? fieldValue.validator(fieldValue.ref.value)
          : null;

      setFieldMapState((map) =>
        map.set(field, {
          ...fieldValue,
          errors: validateResult,
          touched: true,
        }),
      );
    });
  };

  const validate = () => {
    const errorResultMap = new Map<string, string>();

    batch(() => {
      const iter = fieldMap().entries();

      let field = iter.next();

      while (!field.done) {
        const key = field.value[0];
        const value = field.value[1];

        const validateResult = value.validator
          ? value.validator(value.ref.value)
          : null;

        if (validateResult) {
          errorResultMap.set(key as string, validateResult);
        }

        setFieldMapState((map) =>
          map.set(key, {
            ...value,
            errors: validateResult,
          }),
        );

        field = iter.next();
      }
    });

    return errorResultMap;
  };

  const handleSubmit = async (callback: (values: T) => Promise<void>) => {
    const validateResults = validate();

    if (validateResults.size > 0) {
      return;
    }

    let v: Record<string, any> = {};

    const iter = fieldMap().entries();
    let field = iter.next();

    while (!field.done) {
      const key = field.value[0] as string;
      const value = field.value[1];

      v[key] = value.ref.value;

      field = iter.next();
    }

    await callback(v as T);
  };

  const setError = (field: keyof T, error: string) => {
    const targetField = fieldMap().get(field);

    if (targetField) {
      setFieldMapState((map) =>
        map.set(field, {
          ...targetField,
          errors: error,
        }),
      );
    }
  };

  return { register, validate, handleSubmit, fieldMap, setError };
}

export default createForm;
