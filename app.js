#!/usr/bin/env node

var program = require('commander');
var fse = require('fs-extra');

function range(val) {
    return val.split('..').map(Number);
}

function list(val) {
    return val.split(',');
}

function collect(val, memo) {
    memo.push(val);
    return memo;
}

function increaseVerbosity(v, total) {
    return total + 1;
}

program
    .version('0.0.1')
    .option('-e, --express', 'express')
    .option('-k, --koa', 'koa')
    .parse(process.argv);


if (program.express) {
    var currDir = process.cwd();

    fse.copy(__dirname + '/frames/express', currDir, function(err) {
        if(err) return console.error(err)
        console.log('ok')
    })
}

if (program.koa) {
    var currDir = process.cwd();

    fse.copy(__dirname + '/frames/koa', currDir, function(err) {
        if(err) return console.error(err)
        console.log('ok')
    })
}
