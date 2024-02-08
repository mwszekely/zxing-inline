// This is actually the only Polyfill we need for iOS Safari on the Worker thread, neat.
// (core-js isn't bundled with the main thread, since the consumer can do that, but
// with the Worker thread being compiled into a string, this needs to be done upfront).
import "core-js/modules/es.promise.with-resolvers";

import { expose } from "comlink";
import * as Encoder from "./encoder.js";
import * as Scanner from "./scanner.js";
import * as Shared from "./shared.js";

expose({ ...Scanner, ...Encoder, ...Shared });

export * from "./encoder.js";
export * from "./scanner.js";
export * from "./shared.js";

