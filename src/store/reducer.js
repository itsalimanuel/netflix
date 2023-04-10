
export const favoriteList = (data = [], action) => {
  console.log('called fav list',action)
  if (action.type === 'ADD_FAV') {
    return [action.data,...data]
  } else {
    return data
  }
}