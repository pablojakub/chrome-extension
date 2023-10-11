import { Bookmark, DaysOfWeek } from '../globalTypes';

export function getStartOfWeek(date: Date) {
    var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
  
    return new Date(date.setDate(diff));
}

export function fallBehindSchedule(numberOfBookmarks: number) {
    switch(new Date().getDay()) {
        case DaysOfWeek.MONDAY: 
            return numberOfBookmarks = 0
        case DaysOfWeek.TUESDAY: 
            return numberOfBookmarks < 1
        case DaysOfWeek.WEDNESDAY:
            return numberOfBookmarks < 2
        case DaysOfWeek.THURSDAY:
            return numberOfBookmarks < 3
        case DaysOfWeek.FRIDAY: 
            return numberOfBookmarks < 4
        case DaysOfWeek.SATURDAY:
        case DaysOfWeek.SUNDAY:
            return numberOfBookmarks < 5
    }
}

export const isTodayCompleted = (bookmarkQuery: Record<string, Bookmark> | undefined) => {
    if (bookmarkQuery === undefined || bookmarkQuery === null) {
        return false
    }

    const bookmarkArr = Object.values(bookmarkQuery);
    const todayBookmark = bookmarkArr.find((bookmark) => new Date(bookmark.timestamp).toDateString() === new Date().toDateString());
    return todayBookmark === undefined ? false : true;
}
