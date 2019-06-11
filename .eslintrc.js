const {join, dirname} = require('path');

function resolveModulePath(packageName) {
	const packageInfoPath = require.resolve(`${packageName}/package.json`);
	return join(dirname(packageInfoPath), require(packageInfoPath).module);
}

module.exports = {
	extends: 'interfaced',
	overrides: [
		Object.assign(
			{
				files: ['lib/**/*.js', 'test/components/**/*.js'],
				settings: {
					'import/resolver': {
						alias: [
							['zb', resolveModulePath('zombiebox')],
							['ui', join(__dirname, 'lib')]
						]
					}
				}
			},
			require('eslint-config-interfaced/overrides/esm')
		),
		{
			files: ['lib/**/*.js', 'test/components/**/*.js'],
			rules: {
				'no-else-return': 'off',
				'padded-blocks': 'off',
				'import/extensions': ['error', 'never', {jst: 'always'}],
				'import/no-unresolved': ['error', {ignore: ['^generated/']}]
			}
		},
		Object.assign(
			{
				files: ['test/karma.*.conf.js', 'index.js']
			},
			require('eslint-config-interfaced/overrides/node')
		),
		{
			files: ['test/components/**/*.js'],
			env: {
				mocha: true
			},
			globals: {
				expect: true,
				chai: true,
				sinon: true,
				mochaTestSteps: true
			}
		}
	],
};
