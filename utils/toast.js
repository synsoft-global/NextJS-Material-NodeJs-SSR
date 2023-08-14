export function addToast(message, type, setLayout) {
  setLayout(items => ({
    ...items,
    toast: [
      ...items.toast,
      { message, type, key: Date.now() }
    ]
  }))
}


export function removeToast(key, setLayout) {
  setLayout(items => ({
    ...items,
    toast: items.toast.filter(toast => toast.key !== key)
  }))
}