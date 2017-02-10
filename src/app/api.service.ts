import {ThorHttp} from "./libs/request";
import {ThorEncrypt} from "./libs/encrypt";
import {ENV} from "./build.configs";
import {Comment, PendingComment, CreateCommentResult} from "./comment"

const http = new ThorHttp(ENV.endpoint);
const crypto = new ThorEncrypt(ENV.aes_key);

export class CommentApi {
    static view(id: number) {
        let params = new Map<string, string>();
        params.set("id", id.toString());
        return http.get("/id", params)
            .then(rv => {
                return createObj<Comment>(rv);
            })
    }

    static create(c: PendingComment) {
        let params = crypto.encrypt(JSON.stringify(c));
        return http.post("/new", params)
            .then(rv => {
                return createObj<CreateCommentResult>(rv);
            })
    }
}

function createObj<T>(json: string): T {
    return JSON.parse(crypto.decrypt(json)) as T
}