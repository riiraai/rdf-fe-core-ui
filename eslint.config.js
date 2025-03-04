import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintConfigPrettier from "eslint-config-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.plugins("prettier", "react"),
	...compat.extends("prettier"),
	...compat.config({
		rules: {
			// Prettier configuration
			"prettier/prettier": [
				"warn",
				{
					endOfLine: "auto",
					bracketSpacing: true,
					jsxBracketSameLine: false,
					tabWidth: 4,
					trailingComma: "all",
					useTabs: true,
					singleAttributePerLine: true,
					printWidth: 120,
				},
			],

			// React specific rules
			"react/jsx-boolean-value": ["error", "never"], // `<Button disabled />` bukan `<Button disabled={true} />`

			// Spacing and formatting
			"object-curly-spacing": ["error", "always"], // Spasi dalam objek { key: value }
			"arrow-spacing": ["error", { before: true, after: true }], // Spasi sebelum & sesudah `=>`
			"no-multi-spaces": "error", // Hindari spasi berlebih
			"comma-dangle": ["warn", "always"], // Tambah koma di akhir array & object

			// Code quality and best practices
			eqeqeq: ["error", "always"], // Pakai `===` bukan `==`
			"no-const-assign": "error", // Tidak boleh meng-assign variabel yang dideklarasikan dengan `const`
			"no-unused-vars": "error", // Hapus variabel yang tidak terpakai
			"no-var": "error", // Gunakan `const` atau `let` daripada `var`
			"prefer-const": "error", // Gunakan `const` daripada `let` jika nilainya tidak diubah
			"no-shadow": "error", // Hindari mendeklarasikan variabel dengan nama yang sama di dalam scope yang berbeda

			// Debugging and console usage
			"no-console": ["warn", { allow: ["warn", "error"] }], // Biarkan `console.warn` & `console.error`, lainnya peringatan
			"no-debugger": "warn", // Debugger hanya boleh dipakai saat development
		},
	}),
	{ files: ["**/*.{js,mjs,cjs,ts,tsx}"] },
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	eslintConfigPrettier,
	...tseslint.configs.recommended,
];

export default eslintConfig;
