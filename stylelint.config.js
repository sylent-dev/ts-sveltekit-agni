/** @type {import('stylelint').Config} */
export default {
	extends: ['stylelint-config-standard', 'stylelint-config-html/svelte'],
	ignoreFiles: ['build/**', '.svelte-kit/**', 'docs/mockups/**'],
	rules: {
		'color-hex-length': 'long',
		// `:global()` scopes a rule of a component to the whole page, on purpose.
		'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global'] }]
	}
};
