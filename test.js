const tmi = require('tmi.js');

const axios = require('axios')
const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const page = 'https://horoscopes.rambler.ru';
let sign
const linkEnd = {
    'leo': '/leo/',
    'aries': '/aries/',
    'taurus': '/taurus/',
    'gemini': '/gemini/',
    'virgo': '/virgo/',
    'libra': '/libra/',
    'scorpio': '/scorpio/',
    'sagittarius': '/sagittarius/',
    'capricorn': '/capricorn/',
    'aquarius': '/aquarius/',
    'cancer': '/cancer/',
    'pisces': '/pisces/'
};
function getHoroscope(linkEnd,sign) {
    let command;
    switch (sign) {
        case 'leo':
        case 'aries':
        case 'taurus':
        case 'gemini':
        case 'virgo':
        case 'libra':
        case 'scorpio':
        case 'sagittarius':
        case 'capricorn':
        case 'aquarius':
        case 'pisces':
        case 'cancer':

            break

    }
    return new Promise((resolve, reject) => {
        axios.get("https://horoscopes.rambler.ru"+linkEnd[sign]).then(
            response => {
                var currentPage = response.data;
                const dom = new JSDOM(currentPage);
                var text = dom.window.document.querySelector('p').textContent
                resolve(text)
            }
        )
    })


    // axios.get("https://horoscopes.rambler.ru" + command).then(response =>{
    //     var currentPage = response.data;
    //     const dom = new JSDOM(currentPage);
    //     var text = dom.window.document.querySelector('p').textContent
    //     console.log(text
    //     )
    //     return text
    // })

}


const client = new tmi.Client({
    options: { debug: true },
    identity: {
        username: '4elov3k',
        password: 'oauth:1gomhr5hi9l28u68xt5cili5hz8m8r'
    },
    channels: [ '4elov3k']
});

client.connect();

client.on('message', (channel, tags, message, self) => {
    const intro = "Солнышко!"
    if(self) return;
    console.log(tags)
    if(message.toLowerCase() === '!hello') {

        client.say(channel, `@${tags.username}, Дратуте`);
    };


    if(message.toLowerCase().match('!лев')) {
        const sign = "leo";
        getHoroscope(linkEnd, sign).then(horoscope => {
            const result = `@${tags.username} ${intro} ${horoscope}`;
            client.say(channel, result);
        })
    };
    if(message.toLowerCase().match('!водолей')) {
        const sign = "aquarius";
        getHoroscope(linkEnd, sign).then(horoscope => {
            const result = `@${tags.username} ${intro} ${horoscope}`;
            client.say(channel, result);
        })
    }
    if(message.toLowerCase().match('!овен')) {
        const sign = "aries";
        getHoroscope(linkEnd, sign).then(horoscope => {
            const result = `@${tags.username} ${intro} ${horoscope}`;
            client.say(channel, result);
        })
    }
    if(message.toLowerCase().match('!телец')) {
        const sign = "taurus";
        getHoroscope(linkEnd, sign).then(horoscope => {
            const result = `@${tags.username} ${intro} ${horoscope}`;
            client.say(channel, result);
        })
    }
    if(message.toLowerCase().match('!близнецы')) {
        const sign = "gemini";
        getHoroscope(linkEnd, sign).then(horoscope => {
            const result = `@${tags.username} ${intro} ${horoscope}`;
            client.say(channel, result);
        })
    }
    if(message.toLowerCase().match('!рак')) {
        const sign = "cancer";
        getHoroscope(linkEnd, sign).then(horoscope => {
            const result = `@${tags.username} ${intro} ${horoscope}`;
            client.say(channel, result);
        })
    }
    if(message.toLowerCase().match('!дева')) {
        const sign = "virgo";
        getHoroscope(linkEnd, sign).then(horoscope => {
            const result = `@${tags.username} ${intro} ${horoscope}`;
            client.say(channel, result);
        })
    }
    if(message.toLowerCase().match('!весы')) {
        const sign = "libra";
        getHoroscope(linkEnd, sign).then(horoscope => {
            const result = `@${tags.username} ${intro} ${horoscope}`;
            client.say(channel, result);
        })
    }
    if(message.toLowerCase().match('!скорпион')) {
        const sign = "scorpio";
        getHoroscope(linkEnd, sign).then(horoscope => {
            const result = `@${tags.username} ${intro} ${horoscope}`;
            client.say(channel, result);
        })
    }
    if(message.toLowerCase().match('!стрелец')) {
        const sign = "sagittarius";
        getHoroscope(linkEnd, sign).then(horoscope => {
            const result = `@${tags.username} ${intro} ${horoscope}`;
            client.say(channel, result);
        })
    }
    if(message.toLowerCase().match('!козерог')) {
        const sign = "capricorn";
        getHoroscope(linkEnd, sign).then(horoscope => {
            const result = `@${tags.username} ${intro} ${horoscope}`;
            client.say(channel, result);
        })
    }
    if(message.toLowerCase().match('!рыбы')) {
        const sign = "pisces";
        getHoroscope(linkEnd, sign).then(horoscope => {
            const result = `@${tags.username} ${intro} ${horoscope}`;
            client.say(channel, result);
        })
    }
    if(message.toLowerCase().match(/дроп|drop/)) {


        const result = `@${tags.username}, 8 раунд дропсов 7 июня после 3:00 по МСК. 50 000 ключей`;
        client.say(channel, result);

    }

});


