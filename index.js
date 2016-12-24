module.exports = function (max, layers) {
  if (!layers) layers = 2
  var cursor = 0, length = layers
  var size = 0, layers = []

  for(var layer = length; layer--;)
    layers[layer] = {}

  layer = layers[cursor]

  function expand() {
    if(size == max) {
      size = 0
      cursor = (cursor + 1) % length 
      layers[cursor] = {}
      layer = layers[cursor]
    }
    size++
  }

  return {
    get: function (key) {
      var value = layer[key]
      if(value) return value
      for(var o = length + cursor, n = 0; ++n < length;) {
        if(value = layers[--o % length][key]) {
          expand()
          return layer[key] = value
        }
      }
    },
    set: function (key, value) {
      if (!layer[key]) expand()
      layer[key] = value
    }
  }
}











