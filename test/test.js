var assert = require('assert')
var HLRU = require('../')
var lru = HLRU(2)

// set-get:
lru.set('test', 'test')

assert.equal(lru.get('test'), 'test')

// update:
lru.set('test', 'test2')

assert.equal(lru.get('test'), 'test2')

// cache cycle:
lru.set('test2', 'test')

assert.equal(lru.get('test2'), 'test')

// get previous after cache cycle:
assert.equal(lru.get('test'), 'test2')

// update new cache:
lru.set('test2', 'test2')

assert.equal(lru.get('test2'), 'test2')

// object purity:
assert.equal(lru.get('constructor'), undefined)

// max validation:
assert.throws(HLRU)

//set returns value
assert.equal(lru.set('test5', 'test-foo-bar'), 'test-foo-bar')
