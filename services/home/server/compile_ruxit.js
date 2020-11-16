const path = require('path')
const fs = require('fs')

const ruxit_cfg = process.env.RUXIT_CFG

const template = path.resolve('./src/ruxit.js.template');
var data = fs.readFileSync(template, 'utf8');

var newData = data.replace('{{ruxit_cfg}}',ruxit_cfg)
var newFile = path.resolve('./public/dt.js');
console.log("newFile: " + newFile)
fs.writeFileSync(newFile, newData)
