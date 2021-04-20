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
exports.getEmbed = void 0;
const discord_js_1 = require("discord.js");
const axios_1 = __importDefault(require("axios"));
const apiUrl = 'https://zenquotes.io/api/random';
const zenLogo = new discord_js_1.MessageAttachment('./zen.png');
const getEmbed = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { quote, author } = yield getRandomQuote();
        const embed = new discord_js_1.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`❝ ${quote}❞`)
            // .setURL('https://discord.js.org/')
            .setDescription(`— ${author}`)
            .setFooter('zen quotes', 'attachment://zen.png');
        // await msg.channel.send({ files: [zenLogo], embed: embed });
        const result = { files: [zenLogo], embed: embed };
        return result;
    }
    catch (e) {
        console.log(e);
        msg.channel.send('An error occured. Please try again.');
        return null;
    }
});
exports.getEmbed = getEmbed;
const getRandomQuote = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(apiUrl);
        const { q: quote, a: author } = response.data[0];
        const output = { quote, author };
        return output;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
