const imagePath = (image: string): string => image.trim().length !== 0 ? `${String(process.env.REACT_APP_API_URL)}${image}` : ''

export default imagePath
