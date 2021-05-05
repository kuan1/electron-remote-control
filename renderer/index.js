const user = {
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

const button = document.querySelector('button')

button.onclick = async () => {
  if (!user.code) {
    user.code = await electron.login()
  }

  document.querySelector('.code').innerHTML = `控制码：${user.code}`

  electron.createControl()
}
