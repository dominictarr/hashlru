

module.exports = function (max) {

  var size = 0, cache = {}, _cache = {}

  return {
    get: function (key) {
      var v = cache[key]
      if(v) return v
      if(v = _cache[key]) {
        cache[key] = v
        size ++
        if(size >= max) {
          size = 0
          _cache = cache
          cache = {}
        }
      }
    },
    set: function (key, value) {
      if(cache[key]) {
        cache[key] = value
      } else {
        cache[key] = value
        size ++
        if(size >= max) {
          size = 0
          _cache = cache
          cache = {}
        }
      }
    }
  }
}




