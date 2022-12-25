const { SMS } = require('aws-sdk');
const AWS = require('aws-sdk');

module.exports.sendSms = async function sendSms() {
    return new Promise((res, rej) => {
        const sns = new AWS.SNS({
            region: 'us-east-1'
        });
        const params = {
            Message: `New notification on FPS Connect Portal. Please login to https://parent.fps.edu.pk`,
            Subject: 'FPS Connect Update',
            TopicArn: 'arn:aws:sns:us-east-1:620022784436:FPSConnectUpdate'
        };
        sns.publish(params, (err) => {
            if(err) {
                rej(err);
            } else {
                res();
            }
        });
    });
}