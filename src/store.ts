import { useStoreState } from './state'
import { Event } from './event'
import { map2obj, obj2map, mapMergeObj } from './utils'

class _Store {

  private store = new Map()
  private event: Event

  constructor(initStroe: {}) {
    this.store = obj2map(initStroe)
    this.event = new Event()
  }
  getState(key: string) {
    let value = this.store.get(key)
    if (!value) {
      throw new Error(`store 不存在key为：${key} 的值`)
    }
    value = useStoreState(key, value, this.event)
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
        this.event.emit(k, v)
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