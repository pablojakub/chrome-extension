import { Bookmark } from '../globalTypes';

const getBookmarks = () => {
    return fetch('https://bookmarkreact-default-rtdb.europe-west1.firebasedatabase.app/Bookmarks.json')
    .then(resp => resp.json() as Promise<Record<string, Bookmark>>    ) 
}

export default getBookmarks;