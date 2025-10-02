import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import path from 'path'
// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: path.resolve(__dirname),
      },
    },
    rules: {
      // 自定义规则：限制只能使用RGB格式的颜色
      'no-restricted-syntax': [
        'error',
        {
          selector: 'Literal[value=/#([a-f0-9]{3}){1,2}\b/i]',
          message: '只允许使用RGB格式的颜色，禁止使用十六进制颜色值',
        },
        {
          selector: 'Literal[value=/\b(hsl|rgba|hsla)\(/i]',
          message: '只允许使用RGB格式的颜色，禁止使用HSL、RGBA或HSLA格式',
        },
        {
          selector:
            'Literal[value=/\b(black|white|red|green|blue|yellow|purple|orange|pink|brown|gray|grey|cyan|magenta|lime|navy|teal|maroon|olive|coral|silver|gold|indigo|violet|turquoise|salmon|plum|khaki|crimson|tan|azure|beige|lavender|ivory|chocolate|orchid|aquamarine|bisque|darkgray|darkgrey|lightgray|lightgrey)\b/i]',
          message: '只允许使用RGB格式的颜色，禁止使用颜色名称',
        },
      ],
    },
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  skipFormatting,
)
