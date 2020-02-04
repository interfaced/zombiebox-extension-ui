const path = require('path');

function resolveZbModule(name) {
	const packageJsonPath = require.resolve(`${name}/package.json`);
	const packageJsonContent = require(`${name}/package.json`); // eslint-disable-line global-require
	return path.resolve(path.dirname(packageJsonPath), packageJsonContent.module);
}

const zbPath = resolveZbModule('zombiebox');
const cutejsPath = resolveZbModule('zombiebox-extension-cutejs');
const cuteLibPath = resolveZbModule('cutejs');
const generatedPath = path.resolve(__dirname, 'generated');
const uiPath = path.resolve(__dirname, '..', 'lib');
const testsPath = path.resolve(__dirname, 'components');

const [zbJsFiles, cutejsJsFiles, generatedJsFiles, uiJsFiles, cuteLibFiles, testsJsFiles] =
	[zbPath, cutejsPath, generatedPath, uiPath, cuteLibPath, testsPath].map((root) => root + '/**/*.js');

module.exports = (config) => {
	config.set({
		autoWatch: false,
		singleRun: true,

		frameworks: ['sinon-chai', 'mocha', 'chai', 'dirty-chai'],
		reporters: ['mocha'],
		browsers: ['ChromeHeadless'],

		files: [
			{type: 'module', pattern: zbJsFiles},
			{type: 'module', pattern: cutejsJsFiles},
			{type: 'module', pattern: generatedJsFiles},
			{type: 'module', pattern: uiJsFiles},
			{type: 'module', pattern: testsJsFiles},
			{type: 'module', pattern: cuteLibFiles}
		],

		preprocessors: {
			[zbJsFiles]: ['module-resolver'],
			[cutejsJsFiles]: ['module-resolver'],
			[generatedJsFiles]: ['module-resolver'],
			[uiJsFiles]: ['module-resolver'],
			[testsJsFiles]: ['module-resolver']
		},

		moduleResolverPreprocessor: {
			aliases: {
				'zb': zbPath,
				'cutejs': cutejsPath,
				'cutejs-lib': cuteLibPath,
				'generated': generatedPath,
				'ui': uiPath
			},
			ecmaVersion: 10
		}
	});
};
