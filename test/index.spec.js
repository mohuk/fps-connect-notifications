
const index = require('../index');
const axios = require('axios');
const mockApiResponse = require('./data.json');
const notificationService = require('../notification.service');
const fpsConnectService = require('../fps-connect.service');

jest.mock('axios');
jest.mock('../notification.service');

describe('Test index handler', () => {
    
    describe('Test with available mock', () => {
        beforeEach(() => {
            axios.get.mockImplementationOnce(() => {
                return Promise.resolve(mockApiResponse);
            });
    
            notificationService.sendSms.mockImplementationOnce(() => {
                return Promise.resolve();
            });
    
            jest.spyOn(notificationService, 'sendSms');
            jest.spyOn(fpsConnectService, 'getCircularsAndNewsAnnouncements');
    
            index.handler();
        });

        it('should always be UTC', () => {
            expect(new Date().getTimezoneOffset()).toBe(0);
        });
    
        test('Receive circulars and news announcements', () => {
            expect(fpsConnectService.getCircularsAndNewsAnnouncements).toHaveBeenCalled();
        });
    
        test('Notification service send SMS NOT called', () => {
            expect(notificationService.sendSms).not.toHaveBeenCalled();
        });
    });

    describe('Test with altered date', () => {
        
        beforeAll(() => {
            jest.useFakeTimers();
            jest.setSystemTime(new Date('2023-01-05T00:00:00.000Z'));
        });

        beforeEach(() => {
            axios.get.mockImplementationOnce(() => {
                return Promise.resolve(mockApiResponse);
            });
            
            notificationService.sendSms.mockImplementationOnce(() => {
                return Promise.resolve();
            });
            
            jest.spyOn(notificationService, 'sendSms');
            jest.spyOn(fpsConnectService, 'getCircularsAndNewsAnnouncements');
    
            index.handler();
        });

        it('should always be UTC', () => {
            expect(new Date().getTimezoneOffset()).toBe(0);
        });

        test('Receive circulars and news announcements', () => {
            expect(fpsConnectService.getCircularsAndNewsAnnouncements).toHaveBeenCalled();
        });
    
        test('Notification service send SMS called', () => {
            expect(notificationService.sendSms).toHaveBeenCalled();
        });
    });
});
  