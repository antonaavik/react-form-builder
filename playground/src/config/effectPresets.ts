import type { EffectRule } from "@team-good-io/react-form-builder"

export const effectPresets = {
  "disable-last-name-for-john": {
    id: "disable-last-name-for-john",
    when: {
      field: "firstName",
      operator: "===",
      value: "John",
    },
    actions: [
      {
        type: "setFieldProps",
        targets: ["lastName"],
        value: { disabled: true },
        skipOnInit: true,
      },
      {
        type: "setValue",
        targets: ["lastName"],
        value: "Doe",
        skipOnInit: true,
      },
    ],
  },
  "enable-last-name-for-non-john": {
    id: "enable-last-name-for-non-john",
    when: {
      field: "firstName",
      operator: "!==",
      value: "John",
    },
    actions: [
      {
        type: "setFieldProps",
        targets: ["lastName"],
        value: { disabled: false },
      },
    ],
  },
  "show-middle-name": {
    id: "show-middle-name",
    when: {
      field: "hasMiddleName",
      operator: "===",
      value: true,
    },
    actions: [
      {
        type: "showField",
        targets: ["middleName"],
      },
    ],
  },
  "hide-middle-name": {
    id: "hide-middle-name",
    when: {
      field: "hasMiddleName",
      operator: "===",
      value: false,
    },
    actions: [
      {
        type: "hideField",
        targets: ["middleName"],
        unregister: true,
      },
      {
        type: "resetField",
        targets: ["middleName"],
      },
      {
        type: "clearErrors",
        targets: ["middleName"],
      },
    ],
  },
  "reset-city-on-country-change": {
    id: "reset-city-on-country-change",
    when: {
      field: "country",
      operator: "!==",
      value: "",
    },
    actions: [
      {
        type: "resetField",
        targets: ["city"],
        skipOnInit: true,
      },
    ],
  },
  "show-email-when-subscribed": {
    id: "show-email-when-subscribed",
    when: {
      field: "subscribe",
      operator: "===",
      value: true,
    },
    actions: [
      {
        type: "showField",
        targets: ["email"],
      },
    ],
  },
  "hide-email-when-unsubscribed": {
    id: "hide-email-when-unsubscribed",
    when: {
      field: "subscribe",
      operator: "===",
      value: false,
    },
    actions: [
      {
        type: "hideField",
        targets: ["email"],
        unregister: true,
      },
      {
        type: "resetField",
        targets: ["email"],
      },
      {
        type: "clearErrors",
        targets: ["email"],
      },
    ],
  },
} satisfies Record<string, EffectRule>
