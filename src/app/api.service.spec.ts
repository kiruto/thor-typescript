import {CommentApi} from "./api.service";
import {Comment} from "./comment";
/**
 * Created by yuriel on 2/9/17.
 */
describe("View a comment by ID", () => {
    it("Should be return a comment", () => {
        CommentApi.view(2)
            .onSuccess(rv => {
                if (rv !instanceof Comment) {
                    throw new Error("Request failed!");
                }
            })
    })
});