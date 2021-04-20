import { MessageAttachment, MessageEmbed } from 'discord.js';

export type EmbedResult = {
  files: MessageAttachment[];
  embed: MessageEmbed;
};

export type Quote = {
  quote: string;
  author: string;
};
