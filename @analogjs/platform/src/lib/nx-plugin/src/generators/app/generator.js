"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appGenerator = void 0;
const tslib_1 = require("tslib");
const devkit_1 = require("@nx/devkit");
const semver_1 = require("semver");
const version_utils_1 = require("../../utils/version-utils");
const add_analog_project_config_1 = require("./lib/add-analog-project-config");
const add_analog_dependencies_1 = require("./lib/add-analog-dependencies");
const initialize_analog_workspace_1 = require("./lib/initialize-analog-workspace");
const add_files_1 = require("./lib/add-files");
const add_tailwind_config_1 = require("./lib/add-tailwind-config");
const add_trpc_1 = require("./lib/add-trpc");
const add_home_page_1 = require("./lib/add-home-page");
const minimum_supported_versions_1 = require("./versions/minimum-supported-versions");
const add_eslint_1 = require("./lib/add-eslint");
function normalizeOptions(tree, options, nxVersion) {
    var _a, _b;
    const appsDir = (0, devkit_1.getWorkspaceLayout)(tree).appsDir;
    const allNames = (0, devkit_1.names)(options.analogAppName);
    const projectDirectory = allNames.fileName;
    const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
    const projectRoot = `${appsDir}/${projectDirectory}`;
    const parsedTags = options.tags
        ? options.tags.split(',').map((s) => s.trim())
        : [];
    const offsetFromRoot = (0, devkit_1.offsetFromRoot)(projectRoot);
    const nxPackageNamespace = (0, semver_1.major)(nxVersion) >= 16 ? '@nx' : '@nrwl';
    const addTailwind = (_a = options.addTailwind) !== null && _a !== void 0 ? _a : true;
    const addTRPC = (_b = options.addTRPC) !== null && _b !== void 0 ? _b : false;
    return Object.assign(Object.assign(Object.assign({}, options), allNames), { projectName,
        projectRoot,
        projectDirectory,
        parsedTags,
        offsetFromRoot,
        appsDir,
        nxPackageNamespace,
        addTailwind,
        addTRPC });
}
function appGenerator(tree, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const nxVersion = (0, version_utils_1.getInstalledPackageVersion)(tree, 'nx');
        if (!nxVersion) {
            throw new Error((0, devkit_1.stripIndents) `Nx must be installed to execute this plugin`);
        }
        if ((0, minimum_supported_versions_1.belowMinimumSupportedNxVersion)(nxVersion)) {
            throw new Error((0, devkit_1.stripIndents) `Nx v15.2.0 or newer is required to install Analog`);
        }
        if ((0, minimum_supported_versions_1.belowMinimumSupportedNxtRPCVersion)(nxVersion) && options.addTRPC) {
            console.warn('Nx v16.1.0 or newer is required to use tRPC with Analog. Skipping installation.');
            options.addTRPC = false;
        }
        const normalizedOptions = normalizeOptions(tree, options, nxVersion);
        const angularVersion = yield (0, initialize_analog_workspace_1.initializeAngularWorkspace)(tree, nxVersion, normalizedOptions);
        const majorNxVersion = (0, semver_1.major)(nxVersion);
        const majorAngularVersion = (0, semver_1.major)((0, semver_1.coerce)(angularVersion));
        yield (0, add_analog_dependencies_1.addAnalogDependencies)(tree, nxVersion, angularVersion);
        const { projectRoot, projectName, parsedTags, name, appsDir, nxPackageNamespace, } = normalizedOptions;
        (0, add_analog_project_config_1.addAnalogProjectConfig)(tree, projectRoot, projectName, parsedTags, name, appsDir, nxPackageNamespace);
        (0, add_files_1.addFiles)(tree, normalizedOptions, majorAngularVersion);
        if (normalizedOptions.addTailwind) {
            yield (0, add_tailwind_config_1.addTailwindConfig)(tree, normalizedOptions.projectRoot, normalizedOptions.projectName, majorNxVersion);
        }
        if (normalizedOptions.addTRPC) {
            yield (0, add_trpc_1.addTrpc)(tree, normalizedOptions.projectRoot, nxVersion, normalizedOptions);
        }
        (0, add_home_page_1.addHomePage)(tree, normalizedOptions);
        yield (0, add_eslint_1.addEslint)(tree, majorNxVersion, normalizedOptions);
        if (!normalizedOptions.skipFormat) {
            yield (0, devkit_1.formatFiles)(tree);
        }
        return () => {
            (0, devkit_1.installPackagesTask)(tree);
        };
    });
}
exports.appGenerator = appGenerator;
exports.default = appGenerator;
//# sourceMappingURL=generator.js.map