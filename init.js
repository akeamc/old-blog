const args = require("yargs").argv;
const moment = require("moment");
const fs = require("fs-extra");
const path = require("path");

console.log(`
Creating an empty blog article ...
----------------------------------
`);

let name = args.name || moment().unix().toString();

name = name.replace(/[\s]/g, "-").replace(/((?!([a-z0-9-])).)/gi, "").toLowerCase();

if (args.name) {
  console.log(`Using article name "${name}".`);
} else {
  console.log(`No name specified, using timestamp (${name}) instead.`);
}

const today = moment().format("YYYY-MM-DD");

const dir = path.join(process.cwd(), "articles", ...today.split("-"), name);

console.log(`Creating dir at ${dir} ...`);

fs.mkdirpSync(dir);

console.log(`Writing "index.md" ...`);

const meta = {
  title: args.name || "Hello World!",
  description: args.description || "This is the description.",
  author: args.author || "ThePicoNerd",
  date_posted: `${moment().format("YYYY-MM-DD HH:mm:ss")}Z`,
  tags: [
    "default",
    "replaceme"
  ]
}

const mdPath = path.join(dir, "index.md");

const fileContents = `---
title: "${args.name || "Hello World!"}"
description: |
  "${args.description || "This is the description!"}"
author: ${args.author || "ThePicoNerd"}
date_posted: ${moment().utc().format("YYYY-MM-DD HH:mm:ss")}Z
tags:
  - removeme
  - please
---

# Hello World!`

fs.writeFile(mdPath, fileContents);

console.log(`
-----
DONE!

Wrote ${Buffer.from(fileContents).length} bytes to ${mdPath}.
`)