export const user = {
  key: 'USER_CODE',
  _code: '',
  get code() {
    if (!this._code) {
      this._code = localStorage.getItem(this.key)
    }
    return this._code || ''
  },
  set code(code) {
    if (code == this._code) return
    this._code = code
    localStorage.setItem(this.key, code)
  },
}

export const friend = {
  key: 'FRIEND_CODE',
  _code: '',
  get code() {
    if (!this._code) {
      this._code = localStorage.getItem(this.key)
    }
    return this._code || ''
  },
  set code(code) {
    if (code == this._code) return
    this._code = code
    localStorage.setItem(this.key, code)
  },
}
