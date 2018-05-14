# npmlog
This logger is very basic.  It does the logging for node.  
It supports custom levels and display of file name and function name and line number of output location.


# Installation

```console
npm install amuyu-logger --save
```

# Basic Usage

```js
var logger = require('amuyu-logger')

function test() {
// message -----------+                         
// level ---+         |                         
//          v         v                         
    logger.log('Hello world')
}
test()
```
example output:
```
// <fileName>: <functionName>(lineNumber) message
test.js: test(10) helloworld
```

## log.[level](message...)

* log.log(message, ...)
* log.info(message, ...)
* log.warn(message, ...)
* log.error(message, ...)


## log.addLevel(level, n, style, disp)
Sets up a new level

* `level` {String} Level indicator
* `style` {Object} Object with fg, bg, inverse, etc.

```js
var logger = require('amuyu-logger')

logger.addLevel('test', { fg: 'green', bg: 'black' })
logger.test('hello')
```

# Style Objects

Style objects can have the following fields:

* `fg` {String} Color for the foreground text
* `bg` {String} Color for the background
* `bold`, `inverse`, `underline` {Boolean} Set the associated property
* `bell` {Boolean} Make a noise (This is pretty annoying, probably.)

# NpmLog

More features are available in [npmlog](https://github.com/npm/npmlog).