module.exports = function(config) {
	var options = {
		basePath: '',
		frameworks: ['sinon-chai', 'mocha', 'chai', 'closure', 'cutejs'],
		files: [
			'node_modules/zombiebox/zb/lib/vendor/base.js',
			'node_modules/zombiebox/zb/lib/**/*.js',
			'node_modules/zombiebox/zb/**/*.js',
			'node_modules/zombiebox/zb/**/*.jst',

			'lib/**/*.jst',
			'lib/**/*.js',

			'node_modules/mocha-test-steps/lib/mocha-test-steps.js',
			'test/support/**/*.js',
			'test/**/*.js'
		],
		preprocessors: {
			'node_modules/zombiebox/zb/**/*.js': ['closure'],
			'node_modules/zombiebox/zb/**/*.jst': ['cutejs', 'closure'],

			'lib/**/*.js': ['closure'],
			'lib/**/*.jst': ['cutejs', 'closure'],

			'test/support/**/*.js': ['closure']
		},
		exclude: [
			'node_modules/zombiebox/zb/lib/vendor/json-typedef.js',
			'node_modules/zombiebox/zb/lib/vendor/thenable-typedef.js',

			'node_modules/zombiebox/zb/ui/**/*',

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
		singleRun: false,
		cutejsPreprocessor: {
			include_goog_deps: true
		}
	};
	config.set(options);
};
