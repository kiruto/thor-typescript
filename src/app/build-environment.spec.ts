import {} from "./build.configs";
import {ENV} from "./build.configs";
import {IN_DEBUG} from "./build.configs";
import {VERSION} from "./build.configs";
/**
 * Created by yuriel on 2/10/17.
 */
describe("Check environment", () => {
    it("Should have environment variables", () => {
        expect(ENV).not.toBeNull();
        expect(IN_DEBUG).not.toBeNull();
        expect(VERSION).not.toBeNull();
        console.log(ENV);
        console.log(IN_DEBUG);
        console.log(VERSION);
    });
});