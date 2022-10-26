const fileReader = (file: any, imgRef: any): void => {
  if (file.length === 0) {
    if (imgRef.current !== null) {
      imgRef.current.src = ''
      return
    }
  }
  const reader = new FileReader()
  reader.addEventListener('load',
    (event: any) => {
      if (imgRef.current !== null) {
        imgRef.current.src = event.target.result
      }
    })
  reader.readAsDataURL(file[0])
}

export default fileReader
