import {
  FormBuilder,
  OptionsSourceType,
} from "@team-good-io/react-form-builder"

import { effectPresets } from "./config"
import { createEffectsConfigFromPresets } from "./utils/effectsConfig"

const cityOptionsByCountry: Record<string, { label: string; value: string }[]> = {
  us: [
    { label: "New York", value: "new-york" },
    { label: "Austin", value: "austin" },
    { label: "San Francisco", value: "san-francisco" },
  ],
  ee: [
    { label: "Tallinn", value: "tallinn" },
    { label: "Tartu", value: "tartu" },
    { label: "Pärnu", value: "parnu" },
  ],
  fi: [
    { label: "Helsinki", value: "helsinki" },
    { label: "Tampere", value: "tampere" },
    { label: "Turku", value: "turku" },
  ],
}

export function App() {
  const handleSubmit = (values: Record<string, unknown>) => {
    console.log(values)
  }

  return (
    <FormBuilder
      defaultValues={{
        firstName: "Jane",
        hasMiddleName: false,
        country: "",
        city: "",
        subscribe: false,
        email: "",
      }}
      fields={[
        { id: "firstName" },
        { id: "lastName", fieldProps: { placeholder: "Last Name" }, registerProps: { required: true } },
        { id: "hasMiddleName", kind: "checkbox" },
        { id: "middleName" },
        {
          id: "country",
          kind: "select",
          options: [
            { label: "United States", value: "us" },
            { label: "Estonia", value: "ee" },
            { label: "Finland", value: "fi" },
          ],
        },
        { id: "city", kind: "select" },
        { id: "subscribe", kind: "checkbox" },
        { id: "email", kind: "email" },
      ]}
      optionsConfig={{
        city: {
          type: OptionsSourceType.REMOTE_DYNAMIC,
          path: "/api/cities?country={country}",
          dependencies: ["country"],
        },
      }}
      optionsLoader={async ({ sourceName, values }) => {
        if (sourceName !== "city") return []

        const country = values.country
        if (typeof country !== "string") return []

        return cityOptionsByCountry[country] || []
      }}
      effectsConfig={createEffectsConfigFromPresets({
        presets: effectPresets,
        presetKeys: [
          "disable-last-name-for-john",
          "enable-last-name-for-non-john",
          "show-middle-name",
          "hide-middle-name",
          "reset-city-on-country-change",
          "show-email-when-subscribed",
          "hide-email-when-unsubscribed",
        ],
      })}
      onSubmit={handleSubmit}
    />
  )
}
