"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAnalogProjectConfig = void 0;
const devkit_1 = require("@nx/devkit");
function addAnalogProjectConfig(tree, projectRoot, projectName, parsedTags, name, appsDir, nxPackageNamespace) {
    const isStandalone = appsDir === '.';
    const workspaceAppsDir = isStandalone ? '' : `${appsDir}/`;
    const projectConfiguration = {
        root: projectRoot,
        projectType: 'application',
        sourceRoot: `${projectRoot}/src`,
        targets: {
            build: {
                executor: `${nxPackageNamespace}/vite:build`,
                outputs: [
                    '{options.outputPath}',
                    `{workspaceRoot}/dist/${workspaceAppsDir}${projectName}/.nitro`,
                    `{workspaceRoot}/dist/${workspaceAppsDir}${projectName}/ssr`,
                    `{workspaceRoot}/dist/${workspaceAppsDir}${projectName}/analog`,
                ],
                options: {
                    main: `${workspaceAppsDir}${projectName}/src/main.ts`,
                    configFile: `${workspaceAppsDir}${projectName}/vite.config.ts`,
                    outputPath: `dist/${workspaceAppsDir}${projectName}/client`,
                },
                defaultConfiguration: 'production',
                configurations: {
                    development: {
                        mode: 'development',
                    },
                    production: {
                        sourcemap: false,
                        mode: 'production',
                    },
                },
            },
            serve: {
                executor: `${nxPackageNamespace}/vite:dev-server`,
                defaultConfiguration: 'development',
                options: {
                    buildTarget: `${projectName}:build`,
                    port: 4200,
                },
                configurations: {
                    development: {
                        buildTarget: `${projectName}:build:development`,
                        hmr: true,
                    },
                    production: {
                        buildTarget: `${projectName}:build:production`,
                    },
                },
            },
            'extract-i18n': {
                executor: `@angular-devkit/build-angular:extract-i18n`,
                options: {
                    browserTarget: `${projectName}:build`,
                },
            },
            test: {
                executor: `${nxPackageNamespace}/vite:test`,
                outputs: [`{projectRoot}/coverage`],
            },
        },
        tags: parsedTags,
    };
    (0, devkit_1.addProjectConfiguration)(tree, name, projectConfiguration);
}
exports.addAnalogProjectConfig = addAnalogProjectConfig;
//# sourceMappingURL=add-analog-project-config.js.map