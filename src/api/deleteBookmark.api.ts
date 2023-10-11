
const deleteBookmark = (id: string) => {
    return fetch(`https://bookmarkreact-default-rtdb.europe-west1.firebasedatabase.app/Bookmarks/${id}.json`, {
        method: 'DELETE',
    })
    .then(resp => console.log(resp)   ) 
}

export default deleteBookmark;