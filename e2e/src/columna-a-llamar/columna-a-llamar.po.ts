import { $, browser } from 'protractor';

export class ColumnaALlamar {
    navigateTo() {
        return browser.get('#/crm') as Promise<any>;
    }

    getColumnaALlamar() {
        return $('kt-splash-screen');
    }
}
