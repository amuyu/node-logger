var log = require('../index.js');
const tape = require('tape')




tape('log.log()', function (assert) {

  var resultExpect = 'test.js: Test.<anonymous>(19) hello\n';

  var stdout_write = process.stdout.write;
  var writtenValue = '';

  function writeSpy(value) {
    writtenValue += value;
  }

  process.stdout.write = writeSpy;
  log.log('hello')

  process.stdout.write = stdout_write;
  assert.equal(writtenValue, resultExpect,'same');
  assert.end()
});

tape('log.info()', function (assert) {

  var resultExpect = '\u001b[32m test.js: Test.<anonymous>(38) hello \u001b[0m\n';

  var stdout_write = process.stdout.write;
  var writtenValue = '';

  function writeSpy(value) {
    writtenValue += value;
  }

  process.stdout.write = writeSpy;
  log.info('hello')

  process.stdout.write = stdout_write;
  assert.equal(writtenValue, resultExpect,'same');
  assert.end()
});

tape('log.error()', function (assert) {

  var resultExpect = '\u001b[31;40m test.js: Test.<anonymous>(57) hello \u001b[0m\n';

  var stdout_write = process.stdout.write;
  var writtenValue = '';

  function writeSpy(value) {
    writtenValue += value;
  }

  process.stdout.write = writeSpy;
  log.error('hello')

  process.stdout.write = stdout_write;
  assert.equal(writtenValue, resultExpect,'same');
  assert.end()
});

tape('log.warn()', function (assert) {

  var resultExpect = '\u001b[30;43m test.js: Test.<anonymous>(76) hello \u001b[0m\n';

  var stdout_write = process.stdout.write;
  var writtenValue = '';

  function writeSpy(value) {
    writtenValue += value;
  }

  process.stdout.write = writeSpy;
  log.warn('hello')

  process.stdout.write = stdout_write;
  assert.equal(writtenValue, resultExpect,'same');
  assert.end()
});

tape('log.addLevel()', function (assert) {

  var resultExpect = '\u001b[32;40m test.js: Test.<anonymous>(96) hello \u001b[0m\n';

  var stdout_write = process.stdout.write;
  var writtenValue = '';

  function writeSpy(value) {
    writtenValue += value;
  }

  process.stdout.write = writeSpy;
  log.addLevel('test', { fg: 'green', bg: 'black' })
  log.test('hello')

  process.stdout.write = stdout_write;
  assert.equal(writtenValue, resultExpect,'same');
  assert.end()
});
