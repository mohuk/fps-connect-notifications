const AWS = require("aws-sdk");
const notificationService = require('../notification.service');
jest.mock('aws-sdk');


describe('Test notification service', () => {
    let response = null;

    beforeAll(() => {
        AWS.SNS.mockImplementation(() => {
            return {
                publish: jest.fn()
            };
        });
    });



    beforeEach(async () => {
        response = notificationService.sendSms();
    });

    afterEach(() => {
        response = null;
    })

    test('Instantiate AWS SDK SNS', () => {
        expect(AWS.SNS).toHaveBeenCalledWith({
            region: 'us-east-1'
        });
    });

});