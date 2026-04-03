import { EffectRule, EffectsConfig } from "@team-good-io/react-form-builder"
export type EffectPresetMap = Record<string, EffectRule>

export interface CreateEffectsConfigFromPresetsInput<TPresetKey extends string> extends Omit<EffectsConfig, "rules"> {
  presets: Record<TPresetKey, EffectRule>
  presetKeys: readonly TPresetKey[]
  rules?: EffectRule[]
}

export function getEffectRulesFromPresets<TPresetKey extends string>(
  presets: Record<TPresetKey, EffectRule>,
  presetKeys: readonly TPresetKey[],
): EffectRule[] {
  return presetKeys.map((presetKey) => {
    const rule = presets[presetKey]

    if (!rule) {
      throw new Error(`Unknown effect preset: "${presetKey}"`)
    }

    return rule
  })
}

export function createEffectsConfigFromPresets<TPresetKey extends string>({
  presets,
  presetKeys,
  rules = [],
  ...config
}: CreateEffectsConfigFromPresetsInput<TPresetKey>): EffectsConfig {
  return {
    ...config,
    rules: [...getEffectRulesFromPresets(presets, presetKeys), ...rules],
  }
}
