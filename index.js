import tmi from 'tmi.js';
import {token} from "./pass.js";
import axios from "axios";
import fs from 'fs';
import {JSDOM} from "jsdom";
const signs = {
    '!лев': '/leo/',
    '!овен': '/aries/',
    '!телец': '/taurus/',
    '!близнецы': '/gemini/',
    '!дева': '/virgo/',
    '!весы': '/libra/',
    '!скорпион': '/scorpio/',
    '!стрелец': '/sagittarius/',
    '!козерог': '/capricorn/',
    '!водолей': '/aquarius/',
    '!рак': '/cancer/',
    '!рыбы': '/pisces/'
};
const arrayOfSigns = Object.keys(signs);
function fetchDataToJSON (fetchData) {
    const data = {
        horoscope: fetchData,
        date: new Date().toLocaleDateString('Ru', { timeZone: 'Europe/Moscow' })
    };
    fs.writeFileSync('./db.json', JSON.stringify(data), {encoding: 'utf8', flag: 'w'})
};
function readDataFromJSON(){
    let obj = JSON.parse(fs.readFileSync('./db.json'))
    return obj
}
const arrOfHoroscopes = {};
async function  parser () {
    let promises = [];
    for (let i = 0; i < Object.values(signs).length; i++){
        let promise = axios.get("https://horoscopes.rambler.ru"+Object.values(signs)[i]).then(
            response => {
                let currentPage = response.data;
                const dom = new JSDOM(currentPage);
                let text = dom.window.document.querySelector('p').textContent
                arrOfHoroscopes[Object.keys(signs)[i]] = text;

            })
        promises.push(promise);
    }
    await Promise.all(promises)
}

const client = new tmi.Client({
    options: { debug: true },
    identity: {
        username: '4elov3k',
        password: token,
    },
    channels: [ '4elov3k']
});

client.connect();

client.on('message', (channel, tags, message, self) => {
    const intro = "Солнышко!"
    if(self) return;
    if(arrayOfSigns.includes(message.toLowerCase())) {
        if(readDataFromJSON().date !== new Date().toLocaleDateString('Ru', { timeZone: 'Europe/Moscow' })) {
            parser().then(() => {
                fetchDataToJSON(arrOfHoroscopes);
            })
            const horoscope = readDataFromJSON().horoscope[message.toLowerCase()]
            const result = `@${tags.username} ${intro} ${horoscope}`;
            client.say(channel, result);
        }else{
            const horoscope = readDataFromJSON().horoscope[message.toLowerCase()]
            const result = `@${tags.username} ${intro} ${horoscope}`;
            client.say(channel, result);
        }

    };

    if(message.toLowerCase() === '!hello') {

        client.say(channel, `@${tags.username}, Дратуте`);
    }
    if (message. toLowerCase()==='!date'){
        client.say(channel, readDataFromJSON().date)
    }

    if(message.toLowerCase().match('@4elov3k опять ты')) {


        const result = `@${tags.username}, опять ты`;
        client.say(channel, result);

    }

});


