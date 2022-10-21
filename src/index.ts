import fs from "fs";
import fetch from "node-fetch";
import path from "path";
import beautify from "js-beautify";
import { fileURLToPath } from "url";


const dir : string = path.resolve(fileURLToPath(import.meta.url) + "../../..", "files")
const d = new Date();
const date : string = "" + d.getFullYear() + "-" + d.getMonth() + "-" + d.getDay();


const mainJsName : string = "main.js";
const mainJsUrl : string = "https://app.connecteam.com/main.js";
const mainJsContents : string = await (await fetch(mainJsUrl)).text();
const beautified : string = beautify.js_beautify(mainJsContents);

const meta : string = `date: "${date}"
mainjs: "${mainJsName}"
beautified: "beautified-${mainJsName}"
mainjs_url: "${mainJsUrl}"
`;

try { fs.mkdirSync(path.join(dir)); } catch (_err) {}

try { fs.mkdirSync(path.join(dir, date)); } catch (_err) {}
try { fs.mkdirSync(path.join(dir, "latest")); } catch (_err) {}

fs.writeFileSync(path.join(dir, date, "beautified-" + mainJsName), beautified);
fs.writeFileSync(path.join(dir, date, mainJsName), mainJsContents);
fs.writeFileSync(path.join(dir, date, "meta.yml"), meta);

fs.writeFileSync(path.join(dir, "latest", "beautified-" + mainJsName), beautified);
fs.writeFileSync(path.join(dir, "latest", mainJsName), mainJsContents);
fs.writeFileSync(path.join(dir, "latest", "meta.yml"), meta);
