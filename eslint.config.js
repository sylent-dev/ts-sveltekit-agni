import comments from '@eslint-community/eslint-plugin-eslint-comments';
import prettier from 'eslint-config-prettier';
import path from 'node:path';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import { defineConfig, includeIgnoreFile } from 'eslint/config';
import globals from 'globals';
import ts from 'typescript-eslint';

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore');

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	{ ignores: ['docs/mockups/', '.claude/'] },
	js.configs.recommended,
	// The rules that read the types, for every file (see Strictness of the code in
	// docs/technical-choices.md). A rule too noisy is tuned below, with its reason.
	ts.configs.strictTypeChecked,
	ts.configs.stylisticTypeChecked,
	svelte.configs.recommended,
	prettier,
	svelte.configs.prettier,
	{
		// A comment that turns a rule off for nothing is removed with what it excused.
		linterOptions: { reportUnusedDisableDirectives: 'error' },
		plugins: { '@eslint-community/eslint-comments': comments },
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser
			}
		},
		rules: {
			// typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
			// see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
			'no-undef': 'off',
			// A number is written in a text as it is (a temperature, a rate of CO); anything else is
			// turned into a text by the code that knows how.
			'@typescript-eslint/restrict-template-expressions': [
				'error',
				{
					allowNumber: true,
					allowAny: false,
					allowBoolean: false,
					allowNever: false,
					allowNullish: false,
					allowRegExp: false
				}
			],
			// A callback typed as giving nothing may call, in one line, a function that gives nothing.
			'@typescript-eslint/no-confusing-void-expression': [
				'error',
				{ ignoreVoidReturningFunctions: true }
			],
			// In no set of typescript-eslint. A `switch` without `default` names every value: a new
			// kind of appliance or a new code of an error must then be placed everywhere.
			'@typescript-eslint/switch-exhaustiveness-check': [
				'error',
				{
					considerDefaultExhaustiveForUnions: true,
					requireDefaultForNonUnion: true,
					allowDefaultCaseForExhaustiveSwitch: false
				}
			],
			// An `as` checks nothing: what comes from outside (a form, a webhook) is checked before it
			// is given a type, never said to be of one.
			'@typescript-eslint/no-unsafe-type-assertion': 'error',
			// Without a function to compare, `sort` orders numbers as texts: 1, 10, 9.
			'@typescript-eslint/require-array-sort-compare': 'error',
			// `==` converts before it compares; `== null`, for `null` or `undefined`, stays.
			eqeqeq: ['error', 'always', { null: 'ignore' }],
			// An exception to a rule is one line and its reason: `eslint-disable-next-line <rule> --
			// <reason>`, never a rule turned off for a file or for the lines that follow.
			'@eslint-community/eslint-comments/require-description': 'error',
			'@eslint-community/eslint-comments/no-use': ['error', { allow: ['eslint-disable-next-line'] }]
		}
	},
	{
		files: ['**/*.svelte'],
		rules: {
			// typescript-eslint turns `no-var` and `prefer-const` on for the `.ts` files alone; the
			// rule of Svelte knows the runes (`let { title } = $props()`).
			'no-var': 'error',
			'svelte/prefer-const': 'error',
			// The handlers written in the markup reach ESLint untyped: the option above doesn't see
			// that they give nothing, hence the wider one.
			'@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: true }],
			// An exception written in the markup of a component, which the rules of the comments
			// don't read: one line and its reason there too.
			'no-restricted-syntax': [
				'error',
				{
					selector:
						'SvelteHTMLComment[value=/^\\s*eslint-(?!disable-next-line\\s+\\S.*\\s--\\s+\\S)/]',
					message:
						'An exception to a rule is one line and its reason: `<!-- eslint-disable-next-line <rule> -- <reason> -->`.'
				}
			]
		}
	},
	{
		// The code that may reach the browser: the types of Node.js are visible to every file of
		// `src/` (one tsconfig for all), so ESLint refuses what only the server has. The environment
		// is read through `$app/env/private` or `$app/env/public`.
		files: ['src/**'],
		ignores: [
			'src/lib/server/**',
			'src/**/*.server.ts',
			'src/**/*.spec.ts',
			'src/env.ts',
			'src/**/*.d.ts'
		],
		rules: {
			'no-restricted-globals': [
				'error',
				...['process', 'Buffer', 'global', 'require', '__dirname', '__filename'].map((name) => ({
					name,
					message:
						'Only the server has it: move the code to `src/lib/server/` or a `.server.ts` file, and read the environment through `$app/env/public`.'
				}))
			],
			'no-restricted-imports': [
				'error',
				{
					patterns: [
						{
							regex: '^node:',
							message:
								'A module of Node.js runs on the server only: import it from `src/lib/server/`.'
						}
					]
				}
			]
		}
	},
	{
		// A test replaces a function by one that does nothing.
		files: ['**/*.spec.ts', '**/*.e2e.ts'],
		rules: { '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }] }
	}
);
