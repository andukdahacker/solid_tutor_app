import { ReactiveMap } from "@solid-primitives/map";
import { batch, createEffect, createSignal } from "solid-js";
import DatetimeUtils from "../utils/datetime_utils";

type FieldState = {
  ref: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
  errors: string | string[] | null;
  touched: boolean;
  validator?: (val: string) => string | null;
};

function createForm<T extends Record<string, any>>(initialValues: T) {
  const [fieldMap, setFieldMapState] = createSignal<
    ReactiveMap<keyof T, FieldState>
  >(new ReactiveMap());

  const register = (
    el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    field: keyof T,
    validator?: (val: string) => string | null,
  ) => {
    const isInputElement = el instanceof HTMLInputElement;
    if (isInputElement && el.type == "checkbox") {
      el.checked = initialValues[field];
    } else if (el.type == "date") {
      if (initialValues[field] == "") {
        el.value = "";
      } else {
        el.value = DatetimeUtils.formatYYYYMMDD(new Date(initialValues[field]));
      }
    } else {
      el.value = initialValues[field];
    }

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

      const targetField = value.ref;
      const isCheckBox =
        targetField instanceof HTMLInputElement &&
        targetField.type == "checkbox";

      if (isCheckBox) {
        v[key] = targetField.checked;
      } else {
        v[key] = targetField.value;
      }

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

  const setField = (field: keyof T, value: string) => {
    const targetField = fieldMap().get(field);

    if (targetField) {
      setFieldMapState((map) =>
        map.set(field, {
          ...targetField,
          ref: {
            ...targetField.ref,
            value,
          },
        }),
      );
    }
  };

  const resetFieldMap = (values: T) => {
    batch(() => {
      const iter = fieldMap().entries();
      let field = iter.next();

      while (!field.done) {
        const key = field.value[0];
        const value = field.value[1];

        const newValue = values[key];

        setFieldMapState((map) =>
          map.set(key, { ...value, ref: { ...value.ref, value: newValue } }),
        );
        field = iter.next();
      }
    });
  };

  const watch = (field: keyof T) => {
    const initialFieldValue = initialValues[field];
    const [value, setValue] = createSignal<typeof initialFieldValue>();

    createEffect(() => {
      const targetField = fieldMap().get(field)?.ref;
      const isInputElement = targetField instanceof HTMLInputElement;
      const isCheckBox = targetField?.type == "checkbox";
      if (isInputElement && isCheckBox) {
        setValue(targetField.checked as typeof initialFieldValue);
      } else {
        setValue(fieldMap().get(field)?.ref.value as typeof initialFieldValue);
      }
    });

    return value;
  };

  return {
    register,
    validate,
    handleSubmit,
    fieldMap,
    setError,
    setField,
    resetFieldMap,
    watch,
  };
}

export default createForm;
