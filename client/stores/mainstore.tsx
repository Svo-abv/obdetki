import { makeAutoObservable } from 'mobx';
import React from 'react';

class MainStore {
    private _pages: any;

    constructor() {
        makeAutoObservable(this);
    }
    set pages(p: any) {
        this._pages = p;
    }

    get pages() {
        return this._pages;
    }
    hydrate = (data: any) => {
        if (!data) return

        this._pages = !!data._pages;
    }

};

export default MainStore;