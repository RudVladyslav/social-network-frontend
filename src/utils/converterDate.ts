const converterDate = (date: string): string => {
  const replaceCharArr = [16, 17, 18, 19, 20, 21, 22]
  const updateDate = date
    .toLowerCase()
    .replace('z', '')
    .replace('t', ' ')
    .replace(/-/g, '.')
    .split('')
    .filter((el, index) => !replaceCharArr.includes(index))
    .join('')
    .split(' ')
    .reverse()
    .join(' ')
    .split(' ')
    .reverse()

  const yearUpdate = updateDate[0].split('.').reverse().join('.')

  return updateDate[1] + ' ' + yearUpdate
}

export default converterDate
