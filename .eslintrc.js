const copyright = [
	'',
	' * This file is part of the ZombieBox package.',
	' *',
	` * Copyright © 2012-${(new Date).getFullYear()}, Interfaced`,
	' *',
	' * For the full copyright and license information, please view the LICENSE',
	' * file that was distributed with this source code.',
	' '
];

module.exports = {
	extends: 'interfaced',
	plugins: ['header'],
	overrides: [{
		files: ['lib/**/*.js', 'test/components/**/*.js'],
		extends: 'interfaced/esm',
		rules: {
			'import/extensions': ['error', 'never', {jst: 'always'}]
		},
		settings: {
			'import/resolver': 'zombiebox',
		}
	}, {
		files: ['lib/**/*.js'],
		rules: {
			'header/header': ['error', 'block', copyright]
		}
	}, {
		files: ['test/karma.*.conf.js', 'index.js'],
		extends: 'interfaced/node',
	}, {
		files: ['test/components/**/*.js'],
		extends: 'interfaced/mocha-chai',
		rules: {
			'import/no-unused-modules': 'off',
		},
		globals: {
			sinon: true
		}
	}],
};
