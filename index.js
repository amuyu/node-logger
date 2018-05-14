'use strict';
var ErrorStackParser = require('error-stack-parser')
var consoleControl = require('console-control-strings')
var path = require('path')
var util = require('util')

function Logger(style){
  // options
  this.style = style
}

Logger.prototype.log = function() {
  write(arguments, this.style)
}

Logger.prototype.info = function() {
  var style = { fg: 'green' }
  write(arguments, style)
}

Logger.prototype.error = function() {
  var style = { fg: 'red', bg: 'black' }
  write(arguments, style)
}

Logger.prototype.warn = function() {
  var style = { fg: 'black', bg: 'yellow' }
  write(arguments, style)
}

Logger.prototype.addLevel = function(lvl, style) {
  this[lvl] = function() {
    write(arguments, style)
  } 
}

function write(args, style) {
  console.log(format(args, style))
}

function format(args, style) {
  var output = '';
  var message = util.format.apply(util, args);

  // add header
  output += header();

  // add style
  style = style || {}
  var settings = []
  if (style.fg) settings.push(style.fg)
  if (style.bg) settings.push('bg' + style.bg[0].toUpperCase() + style.bg.slice(1))

  // add color
  output += message;
  if (settings.length) {
    output = consoleControl.color(settings) + ' ' + output
    output += ' '
    output += consoleControl.color('reset')
  }

  return output
}

function header() {
  var parse = ErrorStackParser.parse(new Error('I was called'))
  var caller = parse[4]
  var fileName = caller.fileName.split("/").pop()
  fileName = path.parse(caller.fileName).base
  var funcName = caller.functionName
  if (funcName === undefined) funcName = parse[5].functionName
  var lineNumber = caller.lineNumber

  var titleFormat = "%s: %s(%d) "
  return util.format(titleFormat, fileName, funcName, lineNumber)
}


module.exports = new Logger();