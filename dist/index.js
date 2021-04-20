"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
const node_schedule_1 = __importDefault(require("node-schedule"));
require('dotenv').config();
const quotes_1 = require("./lib/quotes");
const util_1 = require("./lib/util");
const client = new discord_js_1.default.Client();
client.on('ready', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Bot is ready');
    client.user.setPresence({
        activity: { name: '!quote', type: 'LISTENING' },
        status: 'online',
    });
    const morningRule = new node_schedule_1.default.RecurrenceRule();
    morningRule.hour = 6;
    morningRule.minute = 0;
    morningRule.tz = 'Asia/Kolkata';
    const nightRule = new node_schedule_1.default.RecurrenceRule();
    nightRule.hour = 23;
    nightRule.minute = 0;
    nightRule.tz = 'Asia/Kolkata';
    node_schedule_1.default.scheduleJob(morningRule, function () {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const embed = yield quotes_1.getEmbed();
                const gm = ':sunrise_over_mountains:';
                util_1.sendMessageToAllGuilds(client, gm);
                util_1.sendMessageToAllGuilds(client, embed);
            }
            catch (err) {
                console.log('Could not send message to a (few) guild(s)!');
            }
        });
    });
    node_schedule_1.default.scheduleJob(nightRule, function () {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const embed = yield quotes_1.getEmbed();
                const gn = ':night_with_stars:';
                util_1.sendMessageToAllGuilds(client, embed);
                util_1.sendMessageToAllGuilds(client, gn);
            }
            catch (err) {
                console.log('Could not send message to a (few) guild(s)!');
            }
        });
    });
}));
client.login(process.env.BOT_TOKEN);
client.on('message', (msg) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Message');
    if (msg.content === '!quote') {
        try {
            const embed = yield quotes_1.getEmbed(msg);
            yield msg.channel.send(embed);
        }
        catch (e) {
            console.log(e);
            yield msg.channel.send('An error occured. Please try again.');
        }
    }
}));
client.on('guildCreate', (guild) => __awaiter(void 0, void 0, void 0, function* () {
    let channelID;
    const channels = guild.channels.cache;
    for (const key in channels) {
        const c = channels[key];
        if (c[1].type === 'text') {
            channelID = c[0];
            break;
        }
    }
    const channel = guild.channels.cache.get(guild.systemChannelID || channelID);
    const embed = yield util_1.getWelcomeMessage();
    yield channel.send(embed);
}));
