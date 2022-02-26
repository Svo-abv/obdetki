import { makeAutoObservable } from "mobx";
import { enableStaticRendering } from "mobx-react";

const isServer = typeof window === "undefined";

enableStaticRendering(isServer);

type SerializedStore = {
    _user: any;
    _isAuth: boolean;
    _inCart: number;
};

class UserStore {
    private _user: any;
    private _isAuth: boolean;
    _inCart: number;

    constructor() {
        this._isAuth = false;
        this._inCart = 0;
        makeAutoObservable(this);
    }
    set user(user: any) {
        this._user = user;
    }

    get user() {
        return this._user;
    }

    set isAuth(f: boolean) {
        this._isAuth = f;
    }

    get isAuth() {
        return this._isAuth;
    }

    set inCart(v: number) {
        this._inCart = v;
    }

    get inCart(): number {
        return this._inCart;
    }

    hydrate(serializedStore: SerializedStore) {
        this._isAuth = serializedStore._isAuth != null ? serializedStore._isAuth : false;
    }


    // hydrate = (data: any) => {
    //     if (!data) return

    //     this._pages = !!data._pages;
    // }

};

export default UserStore;