import {CommentApi} from "./api.service";
/**
 * Created by yuriel on 2/9/17.
 */
describe("View a comment by ID", () => {
    it("Should be return a comment", () => {
        CommentApi.view(1)
            .onSuccess(rv => {
                console.log(rv);
            })
    })
});