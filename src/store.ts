import { useStoreState } from './state'
import { event } from './event'
import { map2obj, obj2map, mapMergeObj } from './utils'

class _Store {

  private store = new Map()

  constructor(initStroe: {}) {
    this.store = obj2map(initStroe)
  }
  getState(key: string) {
    let value = this.store.get(key)
    if (!value) {
      throw new Error(`store 不存在key为：${key} 的值`)
    }
    value = useStoreState(key, value)
    return value
  }
  update(fun: Function) {
    let _store = map2obj(this.store)
    let new_store = fun(_store)
    // todo: 之后优化，这里比如不相等
    // if (Object.is(_store, new_store)) {
    //   return
    // }
    let { isSame, obj } = mapMergeObj(this.store, new_store)
    if (!isSame) {
      Object.entries(obj).forEach(([k, v]) => {
        event.emit(k, v)
      })
    }
    return
  }
}


function CreateStore(initStroe: {}) {
  return new _Store(initStroe || {})
}

export {
  CreateStore
}