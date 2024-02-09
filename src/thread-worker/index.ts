//import "core-js";

import { expose } from "comlink";
import * as Encoder from "./encoder.js";
import * as Scanner from "./scanner.js";
import * as Shared from "./shared.js";

expose({ ...Scanner, ...Encoder, ...Shared });

export * from "./encoder.js";
export * from "./scanner.js";
export * from "./shared.js";

