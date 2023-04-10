export const addToFav = (data) => {
  console.log('works action')
  return {
    type: 'ADD_FAV',
    data
  }
}