class Event {
  event: {
    [key: string]: any
  }
  constructor() {
    this.event = {}
  }
  add(key: string, fun: Function) {
    this.setUpdate(key, fun, false)

  }
  addOnce(key: string, fun: Function) {
    this.setUpdate(key, fun, true)
  }
  setUpdate(key: string, fun: Function, isOnce: Boolean) {
    if (!this.event[key]) {
      this.event[key] = new Map()
    }
    if (this.event[key].has(fun)) {
      return
    }
    this.event[key].set(fun, isOnce)
  }
  remove(key: string, fun: Function) {
    if (this.event[key]) {
      this.event[key].delete(fun)
    }
  }
  emit(key: string, ...param: any[]) {
    if (this.event[key]) {
      this.event[key].forEach((isOnce: Boolean, fun: Function) => {
        if (typeof fun === 'function') {
          fun(...param)
        }
        if (isOnce) {
          this.event[key].delete(fun)
        }
      });
    }
  }

}

export {
  Event
}