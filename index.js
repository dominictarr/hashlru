module.exports = function (max) {

  if (!max) throw Error('hashlru must have a max value, of type number, greater than 0')

  var size = 0, cache = new Map(), _cache = new Map()

  function update (key, value) {
    cache.set(key, value)
    size ++
    if(size >= max) {
      size = 0
      _cache = cache
      cache = new Map()
    }
  }

  return {
    has: function (key) {
      return cache.has(key) || _cache.has(key)
    },
    remove: function (key) {
      cache.delete(key)
      _cache.delete(key)
    },
    get: function (key) {
      if (cache.has(key)) {
        return cache.get(key)
      }
      if (_cache.has(key)) {
        var v = _cache.get(key)
        update(key, v)
        return v
      }
    },
    set: function (key, value) {
      if (cache.has(key)) cache.set(key, value)
      else update(key, value)
    },
    clear: function () {
      cache = new Map()
      _cache = new Map()
    }
  }
}







