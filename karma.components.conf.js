module.exports = function(config) {
	var options = {
		basePath: '',
		frameworks: ['sinon-chai', 'mocha', 'chai', 'closure', 'cutejs'],
		files: [
			'node_modules/zombiebox/zb/lib/vendor/base.js',
			'node_modules/zombiebox/zb/lib/**/*.js',
			'node_modules/zombiebox/zb/**/*.js',

			'lib/**/*.jst',
			'lib/**/*.js',

			'node_modules/mocha-test-steps/lib/mocha-test-steps.js',
			'test/support/**/*.js',
			'test/**/helper.js',

			'test/**/*.js'
		],
		preprocessors: {
			'node_modules/zombiebox/zb/**/!(base).js': ['babel', 'closure'],
			'node_modules/zombiebox/zb/**/*.jst': ['cutejs', 'babel', 'closure'],

			'lib/**/*.js': ['babel', 'closure'],
			'lib/**/*.jst': ['cutejs', 'babel', 'closure'],

			'test/support/**/*.js': ['babel', 'closure']
		},
		exclude: [
			'node_modules/zombiebox/zb/lib/vendor/json-typedef.js',
			'node_modules/zombiebox/zb/lib/vendor/thenable-typedef.js',

			'node_modules/zombiebox/zb/ui/**/*',
			'node_modules/zombiebox/zb/std/plain/test/**/*',

			'test/demo/**/*'
		],
		reporters: ['progress'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: false,
		browsers: [
			'PhantomJS'
		],
		browserDisconnectTimeout: 60 * 1000,
		browserNoActivityTimeout: 60 * 1000,
		singleRun: false,
		cutejsPreprocessor: {
			include_goog_deps: true
		},
		babelPreprocessor: {
			options: {
				presets: ['es2015']
			}
		}
	};
	config.set(options);
};
