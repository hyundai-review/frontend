/**
 * Base64 이미지 문자열 -> File 객체로 변환하는 함수
 * @param {string} base64String - Base64 이미지 문자열
 * @param {string} filename - 생성할 파일 이름
 * @returns {File} 변환된 File 객체
 */
export const base64ToFile = (base64String, filename) => {
  // base64 문자열에 데이터 URL 스키마(data:image/jpeg;base64,)가 있는지 확인
  if (!base64String.includes('base64,')) {
    throw new Error('Invalid base64 string format')
  }

  // base64 문자열 파싱
  const arr = base64String.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], filename, { type: mime })
}

/**
 * 객체 -> FormData로 변환하는 함수
 * @param {Object} data - 변환할 객체
 * @param {Object} options - 추가 옵션
 * @param {Object} options.fileKeys - 파일로 변환할 키,파일이름 매핑 객체 { key: filename }
 * @returns {FormData} 변환된 FormData 객체
 */
export const objectToFormData = (data, options = {}) => {
  const formData = new FormData()
  const { fileKeys = {} } = options

  Object.entries(data).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      return
    }

    // fileKeys에 정의된 키는 File 객체로 변환
    if (key in fileKeys && typeof value === 'string' && value.includes('base64,')) {
      const file = base64ToFile(value, fileKeys[key])
      formData.append(key, file)
      return
    }

    // boolean, number, string은 그대로 추가
    if (typeof value === 'boolean' || typeof value === 'number' || typeof value === 'string') {
      formData.append(key, value)
      return
    }

    // 객체나 배열은 JSON 문자열로 변환
    if (typeof value === 'object') {
      formData.append(key, JSON.stringify(value))
      return
    }
  })

  return formData
}
