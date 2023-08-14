export function debounce(func, delay) {
  let timer
  
  return function() {
    let context = this, args = arguments
    clearTimeout(timer)
    timer = setTimeout(function() {
      func.apply(context, args)
    }, delay)
  }
}