/**
 * Created by yuriel on 2/9/17.
 */
function stderr(text: String) { console.log(text); }

class Promise<T> {
    success: ((obj: T) => void)[];
    error: ((error: any) => void)[];

    constructor() {
        this.success = [];
        this.error = [];
    }

    // then(onSuccess: (obj: T) => void = null, onError: (error: any) => void = null) {
    //     return this.onSuccess(onSuccess).onError(onError)
    // }

    then<R>(cb: (obj: T) => R) {
        let deferred = defer<R>();
        this.onSuccess(rv => {
            deferred.resolve(cb(rv))
        });
        return deferred.toPromise();
    }

    onSuccess(onSuccess: (obj: T) => void = null) {
        if (onSuccess) {
            this.success.push(onSuccess);
        }
        return this;
    }

    onError(onError: (error: any) => void = null) {
        if (onError) {
            this.error.push(onError);
        }
        return this;
    }
}

class Defer<T> {
    private promise: Promise<T>;

    constructor() {
        this.promise = new Promise<T>();
    }

    resolve(obj: T) {
        this.promise.success.forEach(cb => {
            window.setTimeout(() => {
                cb(obj);
            }, 0)
        })
    }

    reject(error: any) {
        this.promise.error.forEach(cb => {
            window.setTimeout(() => {
                cb(error);
            }, 0)
        })
    }

    toPromise() {
        return this.promise
    }
}

export function defer<T>() {
    return new Defer<T>()
}