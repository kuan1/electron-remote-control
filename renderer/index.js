const button = document.querySelector('button')

button.onclick = async () => {
  const res = await electron.login()

  document.querySelector('.code').innerHTML = `控制码：${res}`

  electron.createControl()
}
