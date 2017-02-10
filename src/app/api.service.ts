import {ThorHttp} from "./libs/request";
import {ThorEncrypt} from "./libs/encrypt";
import {ENV} from "./build.configs";
import {Comment} from "./comment"

const http = new ThorHttp(ENV.endpoint);
const crypto = new ThorEncrypt(ENV.aes_key);

export class CommentApi {
    static view(id: number) {
        let params = new Map<string, string>();
        params.set("id", "2");
        return http.get("/id", params)
            .then(rv => {
                let content = crypto.decrypt(rv);
                return JSON.parse(content) as Comment
            })
    }
}
