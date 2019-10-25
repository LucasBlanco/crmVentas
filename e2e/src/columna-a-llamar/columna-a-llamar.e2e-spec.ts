import { browser, logging } from 'protractor';

import { ColumnaALlamar } from './columna-a-llamar.po';


describe('workspace-project App', () => {
	let columnaALlamar: ColumnaALlamar;

	beforeEach(() => {
		columnaALlamar = new ColumnaALlamar();
		columnaALlamar.navigateTo();
		browser.pause(10000);
	});

	it('deberia haber una columna A llamar', async () => {
		const x = await columnaALlamar.getColumnaALlamar();
		expect(x.isPresent()).toBeTruthy();
	});

	afterEach(async () => {
		// Assert that there are no errors emitted from the browser
		const logs = await browser.manage().logs().get(logging.Type.BROWSER);
		expect(logs).not.toContain(jasmine.objectContaining({
			level: logging.Level.SEVERE,
		}));
	});
});
