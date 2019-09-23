module.exports = {
	extends: 'interfaced',
	overrides: [{
		files: ['lib/**/*.js', 'test/components/**/*.js'],
		extends: 'interfaced/esm',
		rules: {
			'no-else-return': 'off',
			'padded-blocks': 'off',
			'import/extensions': ['error', 'never', {jst: 'always'}],
			'import/no-unresolved': ['error', {
				ignore: [
					'^generated/',
					'^cutejs/',
				],
			}],
		},
		settings: {
			'import/resolver': 'zombiebox',
		}
	}, {
		files: ['test/karma.*.conf.js', 'index.js'],
		extends: 'interfaced/node',
	}, {
		files: ['test/components/**/*.js'],
		extends: 'interfaced/mocha-chai',
		rules: {
			'no-else-return': 'off',
			'import/no-unused-modules': 'off',
		},
		globals: {
			sinon: true,
			mochaTestSteps: true,
		}
	}],
};
