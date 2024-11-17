export const chkTime = (time) => {
  if (time < 5) {
    return '밤'
  } else if (time < 12) {
    return '아침'
  } else if (time < 18) {
    return '낮'
  } else if (time < 22) {
    return '저녁'
  } else {
    return '밤'
  }
}
