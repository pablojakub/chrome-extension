import { Bookmark } from '../globalTypes';

const addBookmark = (bookmark: Bookmark) => {
    return fetch('https://bookmarkreact-default-rtdb.europe-west1.firebasedatabase.app/Bookmarks.json', {
        method: 'POST',
        body: JSON.stringify(bookmark)
    })
    .then(resp => console.log(resp)   ) 
}

export default addBookmark;