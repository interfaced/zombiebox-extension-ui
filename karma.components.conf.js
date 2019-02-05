module.exports = (config) => {
	config.set({
		basePath: '',
		frameworks: ['sinon-chai', 'mocha', 'chai', 'closure', 'cutejs'],
		files: [
			'node_modules/zombiebox/zb/lib/vendor/base.js',
			'node_modules/zombiebox/zb/**/*.js',

			'lib/**/*.jst',
			'lib/**/*.js',

			'node_modules/mocha-test-steps/lib/mocha-test-steps.js',
			'test/support/**/*.js',
			'test/**/helper.js',
			'test/define.js',

			'test/**/*.js'
		],
		preprocessors: {
			'node_modules/zombiebox/zb/**/*.js': ['closure'],
			'node_modules/zombiebox/zb/**/*.jst': ['cutejs', 'closure'],

			'lib/**/*.js': ['closure'],
			'lib/**/*.jst': ['cutejs', 'closure'],

			'test/define.js': ['closure'],
			'test/support/**/*.js': ['closure']
		},
		exclude: [
			'node_modules/zombiebox/zb/device/resolutions.js',

			'test/demo/**/*'
		],
		reporters: ['progress'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: false,
		browsers: [
			'ChromeHeadless'
		],
		browserDisconnectTimeout: 60 * 1000,
		browserNoActivityTimeout: 60 * 1000,
		singleRun: false,
		cutejsPreprocessor: {
			include_goog_deps: true
		}
	});
};
