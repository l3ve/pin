import { useRef } from 'react'
import { useStoreState } from './state'
import { event } from './event'

class _Store {

  private store = new Map()

  constructor(initStroe: {}) {
    Object.entries(initStroe).forEach(([k, v]) => {
      if (this.store.has(k)) {
        console.warn('重复的数据')
        return
      }
      // let _v = useRef(v)
      this.store.set(k, v)
    });
  }
  getState(key: string) {
    let value = this.store.get(key)
    if (!value) {
      throw new Error(`store 不存在key为：${key} 的值`)
    }
    value = useStoreState(key, value)
    return value
  }
  update(key: string, fun: Function) {
    let value = this.store.get(key)
    let new_value = fun(value)
    if (Object.is(value, new_value)) {
      return
    }
    this.store.set(key, new_value)
    event.emit(key, new_value)
    return
  }
}


function CreateStore(initStroe: {}) {
  return new _Store(initStroe || {})
}

export {
  CreateStore
}