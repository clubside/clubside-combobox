const globals = require('globals')
const stylistic = require('@stylistic/eslint-plugin')

module.exports = [
	{
		ignores: ['node_modules', 'dist']
	},
	{
		files: ['**/*.js'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.node,
				...globals.commonjs,
				...globals.es2021,
				...globals.browser,
				TL: 'readonly',
				editorPackage: 'readonly',
				f3: 'readonly',
				dataPackage: 'readonly',
				L: 'readonly',
				TomSelect: 'readonly'
			}
		},
		plugins: { '@stylistic': stylistic },
		rules: {
			'no-var': 'warn',
			'object-shorthand': [
				'warn',
				'properties'
			],
			'accessor-pairs': [
				'error',
				{
					setWithoutGet: true,
					enforceForClassMembers: true
				}
			],
			'@stylistic/array-bracket-spacing': [
				'error',
				'never'
			],
			'array-callback-return': [
				'error',
				{
					allowImplicit: false,
					checkForEach: false
				}
			],
			'@stylistic/arrow-spacing': [
				'error',
				{
					before: true,
					after: true
				}
			],
			'@stylistic/block-spacing': [
				'error',
				'always'
			],
			'@stylistic/brace-style': [
				'error',
				'1tbs',
				{
					allowSingleLine: true
				}
			],
			camelcase: [
				'error',
				{
					allow: [
						'^UNSAFE_'
					],
					properties: 'never',
					ignoreGlobals: true
				}
			],
			'@stylistic/comma-dangle': [
				'error',
				{
					arrays: 'never',
					objects: 'never',
					imports: 'never',
					exports: 'never',
					functions: 'never'
				}
			],
			'@stylistic/comma-spacing': [
				'error',
				{
					before: false,
					after: true
				}
			],
			'@stylistic/comma-style': [
				'error',
				'last'
			],
			'@stylistic/computed-property-spacing': [
				'error',
				'never',
				{
					enforceForClassMembers: true
				}
			],
			'constructor-super': 'error',
			curly: [
				'error',
				'multi-line'
			],
			'default-case-last': 'error',
			'@stylistic/dot-location': [
				'error',
				'property'
			],
			'dot-notation': [
				'error',
				{
					allowKeywords: true
				}
			],
			'@stylistic/eol-last': 'error',
			eqeqeq: [
				'error',
				'always',
				{
					null: 'ignore'
				}
			],
			'@stylistic/function-call-spacing': [
				'error',
				'never'
			],
			'@stylistic/generator-star-spacing': [
				'error',
				{
					before: true,
					after: true
				}
			],
			'@stylistic/indent': [
				'error',
				'tab',
				{
					SwitchCase: 1,
					VariableDeclarator: 1,
					outerIIFEBody: 1,
					MemberExpression: 1,
					FunctionDeclaration: {
						parameters: 1,
						body: 1
					},
					FunctionExpression: {
						parameters: 1,
						body: 1
					},
					CallExpression: {
						arguments: 1
					},
					ArrayExpression: 1,
					ObjectExpression: 1,
					ImportDeclaration: 1,
					flatTernaryExpressions: false,
					ignoreComments: false,
					ignoredNodes: [
						'TemplateLiteral *',
						'JSXElement',
						'JSXElement > *',
						'JSXAttribute',
						'JSXIdentifier',
						'JSXNamespacedName',
						'JSXMemberExpression',
						'JSXSpreadAttribute',
						'JSXExpressionContainer',
						'JSXOpeningElement',
						'JSXClosingElement',
						'JSXFragment',
						'JSXOpeningFragment',
						'JSXClosingFragment',
						'JSXText',
						'JSXEmptyExpression',
						'JSXSpreadChild'
					],
					offsetTernaryExpressions: true
				}
			],
			'@stylistic/key-spacing': [
				'error',
				{
					beforeColon: false,
					afterColon: true
				}
			],
			'@stylistic/keyword-spacing': [
				'error',
				{
					before: true,
					after: true
				}
			],
			'@stylistic/lines-between-class-members': [
				'error',
				'always',
				{
					exceptAfterSingleLine: true
				}
			],
			'@stylistic/multiline-ternary': [
				'error',
				'always-multiline'
			],
			'@stylistic/new-parens': 'error',
			'no-array-constructor': 'error',
			'no-async-promise-executor': 'error',
			'no-caller': 'error',
			'no-case-declarations': 'error',
			'no-class-assign': 'error',
			'no-compare-neg-zero': 'error',
			'no-cond-assign': 'error',
			'no-const-assign': 'error',
			'no-constant-condition': [
				'error',
				{
					checkLoops: false
				}
			],
			'no-control-regex': 'error',
			'no-debugger': 'error',
			'no-delete-var': 'error',
			'no-dupe-args': 'error',
			'no-dupe-class-members': 'error',
			'no-dupe-keys': 'error',
			'no-duplicate-case': 'error',
			'no-useless-backreference': 'error',
			'no-empty': [
				'error',
				{
					allowEmptyCatch: true
				}
			],
			'no-empty-character-class': 'error',
			'no-empty-pattern': 'error',
			'no-eval': 'error',
			'no-ex-assign': 'error',
			'no-extend-native': 'error',
			'no-extra-bind': 'error',
			'no-extra-boolean-cast': 'error',
			'@stylistic/no-extra-parens': [
				'error',
				'functions'
			],
			'no-fallthrough': 'error',
			'@stylistic/no-floating-decimal': 'error',
			'no-func-assign': 'error',
			'no-global-assign': 'error',
			'no-implied-eval': 'error',
			'no-import-assign': 'error',
			'no-invalid-regexp': 'error',
			'no-irregular-whitespace': 'error',
			'no-iterator': 'error',
			'no-labels': [
				'error',
				{
					allowLoop: false,
					allowSwitch: false
				}
			],
			'no-lone-blocks': 'error',
			'no-loss-of-precision': 'error',
			'no-misleading-character-class': 'error',
			'no-prototype-builtins': 'error',
			'no-useless-catch': 'error',
			'@stylistic/no-mixed-operators': [
				'error',
				{
					groups: [
						[
							'==',
							'!=',
							'===',
							'!==',
							'>',
							'>=',
							'<',
							'<='
						],
						[
							'&&',
							'||'
						],
						[
							'in',
							'instanceof'
						]
					],
					allowSamePrecedence: true
				}
			],
			'@stylistic/no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
			'@stylistic/no-multi-spaces': 'error',
			'no-multi-str': 'error',
			'@stylistic/no-multiple-empty-lines': [
				'error',
				{
					max: 1,
					maxBOF: 0,
					maxEOF: 0
				}
			],
			'no-new-func': 'error',
			'no-object-constructor': 'error',
			'no-new-native-nonconstructor': 'error',
			'no-new-wrappers': 'error',
			'no-obj-calls': 'error',
			'no-octal': 'error',
			'no-octal-escape': 'error',
			'no-proto': 'error',
			'no-redeclare': [
				'error',
				{
					builtinGlobals: false
				}
			],
			'no-return-assign': [
				'error',
				'except-parens'
			],
			'no-self-assign': [
				'error',
				{
					props: true
				}
			],
			'no-self-compare': 'error',
			'no-sequences': 'error',
			'no-shadow-restricted-names': 'error',
			'no-sparse-arrays': 'error',
			'no-template-curly-in-string': 'error',
			'no-this-before-super': 'error',
			'no-throw-literal': 'error',
			'@stylistic/no-trailing-spaces': 'error',
			'no-undef': 'error',
			'no-undef-init': 'error',
			'no-unexpected-multiline': 'error',
			'no-unmodified-loop-condition': 'error',
			'no-unneeded-ternary': [
				'error',
				{
					defaultAssignment: false
				}
			],
			'no-unreachable': 'error',
			'no-unreachable-loop': 'error',
			'no-unsafe-finally': 'error',
			'no-unsafe-negation': 'error',
			'no-unused-expressions': [
				'error',
				{
					allowShortCircuit: true,
					allowTernary: true,
					allowTaggedTemplates: true
				}
			],
			'no-unused-vars': [
				'error',
				{
					args: 'none',
					caughtErrors: 'none',
					ignoreRestSiblings: true,
					vars: 'all'
				}
			],
			'no-use-before-define': [
				'error',
				{
					functions: false,
					classes: false,
					variables: false
				}
			],
			'no-useless-call': 'error',
			'no-useless-computed-key': 'error',
			'no-useless-constructor': 'error',
			'no-useless-escape': 'error',
			'no-useless-rename': 'error',
			'no-useless-return': 'error',
			'no-void': 'error',
			'@stylistic/no-whitespace-before-property': 'error',
			'no-with': 'error',
			'@stylistic/object-curly-newline': [
				'error',
				{
					multiline: true,
					consistent: true
				}
			],
			'@stylistic/object-curly-spacing': [
				'error',
				'always'
			],
			'@stylistic/object-property-newline': [
				'error',
				{
					allowAllPropertiesOnSameLine: true
				}
			],
			'one-var': [
				'error',
				{
					initialized: 'never'
				}
			],
			'@stylistic/operator-linebreak': [
				'error',
				'after',
				{
					overrides: {
						'?': 'before',
						':': 'before',
						'|>': 'before'
					}
				}
			],
			'@stylistic/padded-blocks': [
				'error',
				{
					blocks: 'never',
					switches: 'never',
					classes: 'never'
				}
			],
			'prefer-const': [
				'error',
				{
					destructuring: 'all'
				}
			],
			'prefer-promise-reject-errors': 'error',
			'prefer-regex-literals': [
				'error',
				{
					disallowRedundantWrapping: true
				}
			],
			'@stylistic/quote-props': [
				'error',
				'as-needed'
			],
			'@stylistic/quotes': [
				'error',
				'single',
				{
					avoidEscape: true,
					allowTemplateLiterals: false
				}
			],
			'@stylistic/rest-spread-spacing': [
				'error',
				'never'
			],
			'@stylistic/semi': [
				'error',
				'never'
			],
			'@stylistic/semi-spacing': [
				'error',
				{
					before: false,
					after: true
				}
			],
			'@stylistic/space-before-blocks': [
				'error',
				'always'
			],
			'@stylistic/space-before-function-paren': [
				'error',
				{ anonymous: 'always', named: 'never', asyncArrow: 'always' }
			],
			'@stylistic/space-in-parens': [
				'error',
				'never'
			],
			'@stylistic/space-infix-ops': 'error',
			'@stylistic/space-unary-ops': [
				'error',
				{
					words: true,
					nonwords: false
				}
			],
			'@stylistic/spaced-comment': [
				'error',
				'always',
				{
					line: {
						markers: [
							'*package',
							'!',
							'/',
							',',
							'='
						]
					},
					block: {
						balanced: true,
						markers: [
							'*package',
							'!',
							',',
							':',
							'::',
							'flow-include'
						],
						exceptions: [
							'*'
						]
					}
				}
			],
			'symbol-description': 'error',
			'@stylistic/template-curly-spacing': [
				'error',
				'never'
			],
			'@stylistic/template-tag-spacing': [
				'error',
				'never'
			],
			'unicode-bom': [
				'error',
				'never'
			],
			'use-isnan': [
				'error',
				{
					enforceForSwitchCase: true,
					enforceForIndexOf: true
				}
			],
			'valid-typeof': [
				'error',
				{
					requireStringLiterals: true
				}
			],
			'@stylistic/wrap-iife': [
				'error',
				'any',
				{
					functionPrototypeMethods: true
				}
			],
			'@stylistic/yield-star-spacing': [
				'error',
				'both'
			],
			yoda: [
				'error',
				'never'
			]
		},
		ignores: ['templates/**/*']
	}
]
