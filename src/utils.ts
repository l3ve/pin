type map = Map<string, any>
type kvObj = { [key: string]: any }

function map2obj(map: map) {
  let obj: { [key: string]: any } = {}
  map.forEach((v, k) => {
    obj[k] = v
  })
  return obj
}

function obj2map(obj: kvObj) {
  let _map = new Map()
  Object.entries(obj).forEach(([k, v]) => {
    if (_map.has(k)) {
      console.warn('重复的数据')
      return
    }
    _map.set(k, v)
  });
  return _map
}

function mapMergeObj(map: map, obj: kvObj) {
  let isSame = true
  let minUpdateObj: kvObj = {}
  Object.entries(obj).forEach(([k, v]) => {
    if (!Object.is(map.get(k), v)) {
      isSame = false
      minUpdateObj[k] = v
    }
    map.set(k, v)
  })
  return { isSame, obj: minUpdateObj }
}

export {
  map2obj,
  obj2map,
  mapMergeObj
}
