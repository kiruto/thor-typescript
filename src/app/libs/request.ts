import {defer} from "./promise";
/**
 * Created by yuriel on 2/6/17.
 */

class Offset {

    values: number[];

    constructor() {
        this.values = []
    }

    update(remoteTime: Date) {
        this.values.push(new Date().getTime() - remoteTime.getTime())
    }

    localTime() {
        return new Date(
            new Date().getTime() - this.values.reduce((a, b) => a + b) / this.values.length
        )
    }
}
export let offset = new Offset();

class ResponseResult {
    constructor(public status: number, public body: string) {}
}

function curl(method: string, url: string, data: any,
              resolve: (obj: ResponseResult) => void = null, reject: (error: string) => void = null) {
    let xhr = new XMLHttpRequest();

    function onload() {
        let date = xhr.getResponseHeader("date");
        if (date !== null) {
            offset.update(new Date(date))
        }

        if (xhr.status >= 500) {
            if (reject) {
                reject.call(xhr.responseText)
            }
        } else {
            resolve.call(new ResponseResult(xhr.status, xhr.responseText))
        }
    }

    try {
        xhr.open(method, url, true);
        xhr.withCredentials = true;
        xhr.setRequestHeader("Content-Type", "application/octet-stream");

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                onload();
            }
            return null
        };
    } catch (exception) {
        (reject || console.log)(exception.message);
    }

    xhr.send(data)
}

export class ThorHttp {
    constructor(private endpoint: string) {}

    get(url: String, params: Map<string, string> = null,
        onSuccess: (body: ResponseResult) => void = null, onError: (err: string) => void = null) {
        let deferred = defer<string>();

        curl("GET", params? `${this.endpoint}${url}?${this.qs(params)}`: `${this.endpoint}${url}`, null, rv => {
            if (onSuccess) {
                onSuccess(rv);
            }
            if (rv.status >= 200 && rv.status < 300) {
                deferred.resolve(rv.body)
            } else if (rv.status >= 400 && rv.status < 500) {
                deferred.reject(rv.body)
            }
        }, err => {
            if (onError) {
                onError(err)
            }
        });
        return deferred.toPromise()
    }

    private qs(params: Map<string, string>) {
        let rv = "";
        params.forEach((v, k) => {
            rv += `${k}=${v}&`
        });

        return rv.substring(0, rv.length - 1)
    }
}