const axios = require('axios');
const cheerioLoad = require('cheerio').load;

function getHomepage() {
    return axios.get('https://parent.fps.edu.pk/Main.aspx', {
        headers:{
            'Host': 'parent.fps.edu.pk',
            'cookie': process.env.FPS_PARENT_CREDENTIALS
        }
    });
}

module.exports.getCircularsAndNewsAnnouncements = async function getCircularsAndNewsAnnouncements() {
    const homepage = await getHomepage();
    const $ = cheerioLoad(homepage.data);
    const retVal = {
        circulars: parseCirculars($),
        newsAnnouncements: parseNewsAnnoucements($)
    }
    return retVal;
}

function parseCirculars($) {
    const announcements = [];
    $('#ContentPlaceHolder1_grdCirculars > tbody > tr > td .newsWrap').each((idx, elem) => {
        const content = $(elem)
        announcements.push({
            date: new Date(content.find('h6').text().trim()),
            content: content.find('p').text().trim()
        })
    });
    return announcements;
}

function parseNewsAnnoucements($) {
    const announcements = [];
    $('#ContentPlaceHolder1_lstNews > tbody > tr > td .newsWrap').each((idx, elem) => {
        const content = $(elem)
        announcements.push({
            date: new Date(content.find('h6').text().trim()),
            content: content.find('p').text().trim()
        })
    });
    return announcements;
}