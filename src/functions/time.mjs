import { padLeft } from "./string.mjs";

export const second2ms = t => `${Math.floor(t/60)}:${padLeft(Math.floor(t%60),2,'0')}`