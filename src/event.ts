class Event {
  event: {
    [key: string]: any
  }
  constructor() {
    this.event = {}
  }
  add(key: string, fun: Function) {
    if (!this.event[key]) {
      this.event[key] = new Map()
    }
    this.event[key].set(fun, false)
  }
  addOnce(key: string, fun: Function) {
    if (!this.event[key]) {
      this.event[key] = new Map()
    }
    this.event[key].set(fun, true)
  }
  remove(key: string, fun: Function) {
    if (this.event[key]) {
      this.event[key].delete(fun)
    }
  }
  emit(key: string, ...param: any[]) {
    if (this.event[key]) {
      this.event[key].forEach((isOnce:Boolean, fun: Function) => {
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

let event = new Event()
export {
  event,
  Event
}