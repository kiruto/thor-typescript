/**
 * Created by yuriel on 2/8/17.
 */
export interface Environment {
    aes_key: string;
    endpoint: string;
}

declare const __IN_DEBUG__: boolean;
declare const __VERSION__: string;
declare const __ENVIRONMENT__: Environment;

export const IN_DEBUG = __IN_DEBUG__;
export const VERSION = __VERSION__;
export const ENV = __ENVIRONMENT__;
