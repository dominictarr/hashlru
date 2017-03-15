module.exports = function (max) {

  if (!max) throw Error('hashlru must have a max value, of type number, greater than 0')

  var size = 0, cache = Object.create(null), _cache = Object.create(null)

  function update (key, value) {
    cache[key] = value
    size ++
    if(size >= max) {
      size = 0
      _cache = cache
      cache = Object.create(null)
    }
  }

  return {
    has: function (key) {
      return key in cache || key in _cache
    },
    remove: function (key) {
      if(key in cache) {
        delete cache[key]
        size --
      }
      delete _cache[key]
    },
    get: function (key) {
      var v = cache[key]
      if(v) return v
      if(v = _cache[key]) {
        update(key, v)
        return v
      }
    },
    set: function (key, value) {
      if(cache[key]) cache[key] = value
      else update(key, value)
    }
  }
}
