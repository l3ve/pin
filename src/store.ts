import { useRef } from 'react'
import { useStoreState } from './state'
import { event } from './event'

class _Store {

  private store = new Map()

  constructor(initStroe: {}) {
    Object.keys(initStroe).forEach((k, v) => {
      if (this.store.has(k)) {
        console.warn('重复的数据')
        return
      }
      // let _v = useRef(v)
      this.store.set(k, v)
    });
  }
  state(key: string) {
    let value = this.store.get(key)
    if (!value) {
      throw new Error(`store 不存在key为：${key} 的值`)
    }
    value = useStoreState(key, value)
    return value
  }
  update(key: string) {
    let valueRef = this.store.get(key)

    event.emit(key, valueRef.current)
    return
  }
}


function CreateStore(initStroe: {}) {
  return new _Store(initStroe || {})
}

export {
  CreateStore
}