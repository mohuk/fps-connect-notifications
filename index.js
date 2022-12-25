'use strict';
const fpsConnectService = require('./fps-connect.service');
const notificationService = require('./notification.service');

module.exports.handler = async function handler (event) {
  const {circulars, newsAnnouncements} = await fpsConnectService.getCircularsAndNewsAnnouncements();
  const now = new Date(new Date().setUTCHours(0,0,0,0));
  const latestCircularDate = circulars[0]?.date;                                                                                                                                                                                                                                                                                          .date;
  const latestNewsAnnouncementDate = newsAnnouncements[0]?.date; 
  if(latestCircularDate === now || latestNewsAnnouncementDate === now) {
    try {
      await notificationService.sendSms();
      return {
        status: 'Ok',
        message: 'SMS sent',
        meta: response
      }
    } catch (e) {
      throw new Error({
        status: 'Error',
        stack: e.stack,
        meta: e
      });
    }
  } else {
    return {
      status: 'Ok',
      message: 'No new notifications',
      meta: {
        latestCircularDate,
        latestNewsAnnouncementDate,
        now
      }
    }
  }
};