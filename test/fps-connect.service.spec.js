
const fpsConnectService = require('../fps-connect.service');
const credentials = require('../credentials.json');

describe('Test FPS Connect Service', () => {
    let data = null;
    
    beforeAll(async () => {
        process.env.FPS_PARENT_CREDENTIALS = credentials.cookie;
        data = await fpsConnectService.getCircularsAndNewsAnnouncements();
    });

    test('Received API call response', () => {
        expect(data).toBeDefined();
    })

    test('Circulars are defined', async () => {
        const circulars = data.circulars;
        expect(typeof circulars).toBe('object');
        expect(circulars.length).toBeGreaterThanOrEqual(0);
    });

    test('Circulars should have data and content defined', () => {
        const circular = data.circulars[0];
        expect(circular.content).toBeDefined();
        expect(typeof circular.content).toBe('string');
        expect(circular.date).toBeDefined();
        expect(circular.date instanceof Date).toBeTruthy();
    });
});
