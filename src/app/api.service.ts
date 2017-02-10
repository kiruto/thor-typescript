import {ThorHttp} from "./libs/request";
import {ThorEncrypt} from "./libs/encrypt";
import {ENV} from "./build.configs";
import {Comment} from "./comment"

const http = new ThorHttp(ENV.endpoint);
const crypto = new ThorEncrypt(ENV.aes_key);

export class CommentApi {
    static view(id: number) {
        let params = new Map<string, string>();
        params.set("id", id.toString());
        return http.get("/id", params)
            .then(rv => {
                return createComment(rv);
            })
    }
}

function createComment(json: string): Comment {
    return JSON.parse(crypto.decrypt(json)) as Comment
}