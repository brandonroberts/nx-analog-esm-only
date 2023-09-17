import 'zone.js';
import 'zone.js/plugins/sync-test';
import 'zone.js/plugins/proxy';
import 'zone.js/testing';
/**
 * Patch Vitest's describe/test/beforeEach/afterEach functions so test code
 * always runs in a testZone (ProxyZone).
 */
/* global Zone */
const Zone = globalThis['Zone'];
if (Zone === undefined) {
    throw new Error('Missing: Zone (zone.js)');
}
if (globalThis['__vitest_zone_patch__'] === true) {
    throw new Error("'vitest' has already been patched with 'Zone'.");
}
globalThis['__vitest_zone_patch__'] = true;
const SyncTestZoneSpec = Zone['SyncTestZoneSpec'];
const ProxyZoneSpec = Zone['ProxyZoneSpec'];
if (SyncTestZoneSpec === undefined) {
    throw new Error('Missing: SyncTestZoneSpec (zone.js/plugins/sync-test)');
}
if (ProxyZoneSpec === undefined) {
    throw new Error('Missing: ProxyZoneSpec (zone.js/plugins/proxy.js)');
}
const env = globalThis;
const ambientZone = Zone.current;
// Create a synchronous-only zone in which to run `describe` blocks in order to
// raise an error if any asynchronous operations are attempted
// inside of a `describe` but outside of a `beforeEach` or `it`.
const syncZone = ambientZone.fork(new SyncTestZoneSpec('vitest.describe'));
function wrapDescribeInZone(describeBody) {
    return function (...args) {
        return syncZone.run(describeBody, null, args);
    };
}
// Create a proxy zone in which to run `test` blocks so that the tests function
// can retroactively install different zones.
const testProxyZone = ambientZone.fork(new ProxyZoneSpec());
function wrapTestInZone(testBody) {
    if (testBody === undefined) {
        return;
    }
    const wrappedFunc = function () {
        return testProxyZone.run(testBody, null, arguments);
    };
    try {
        Object.defineProperty(wrappedFunc, 'length', {
            configurable: true,
            writable: true,
            enumerable: false,
        });
        wrappedFunc.length = testBody.length;
    }
    catch (e) {
        return testBody.length === 0
            ? () => testProxyZone.run(testBody, null)
            : (done) => testProxyZone.run(testBody, null, [done]);
    }
    return wrappedFunc;
}
/**
 * bind describe method to wrap describe.each function
 */
const bindDescribe = (originalVitestFn) => function (...eachArgs) {
    return function (...args) {
        args[1] = wrapDescribeInZone(args[1]);
        // @ts-ignore
        return originalVitestFn.apply(this, eachArgs).apply(this, args);
    };
};
/**
 * bind test method to wrap test.each function
 */
const bindTest = (originalVitestFn) => function (...eachArgs) {
    return function (...args) {
        args[1] = wrapTestInZone(args[1]);
        // @ts-ignore
        return originalVitestFn.apply(this, eachArgs).apply(this, args);
    };
};
['describe'].forEach((methodName) => {
    const originalvitestFn = env[methodName];
    env[methodName] = function (...args) {
        args[1] = wrapDescribeInZone(args[1]);
        return originalvitestFn.apply(this, args);
    };
    env[methodName].each = bindDescribe(originalvitestFn.each);
    if (methodName === 'describe') {
        env[methodName].only = env['fdescribe'];
        env[methodName].skip = env['xdescribe'];
    }
});
['test', 'it'].forEach((methodName) => {
    const originalvitestFn = env[methodName];
    env[methodName] = function (...args) {
        args[1] = wrapTestInZone(args[1]);
        return originalvitestFn.apply(this, args);
    };
    env[methodName].each = bindTest(originalvitestFn.each);
    if (methodName === 'test' || methodName === 'it') {
        env[methodName].todo = function (...args) {
            return originalvitestFn.todo.apply(this, args);
        };
    }
});
['beforeEach', 'afterEach', 'beforeAll', 'afterAll'].forEach((methodName) => {
    const originalvitestFn = env[methodName];
    env[methodName] = function (...args) {
        args[0] = wrapTestInZone(args[0]);
        return originalvitestFn.apply(this, args);
    };
});
//# sourceMappingURL=setup-vitest.js.map