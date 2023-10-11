export type Bookmark = {
    name: string;
    url: string;
    timestamp: Date;
    description?: string;
    label: Array<string>;
    code?: {
        language: Language,
        codeString: string
    }
}

export type BookmarkByDate = {
    [date: string] : Array<Bookmark>
}

export type Tab = 'Bookmarks' | 'Notes';

export type Language = 'css' | 'csharp' | 'javascript' | 'typescript'

export enum DaysOfWeek {
    MONDAY = 1,
    TUESDAY = 2,
    WEDNESDAY = 3,
    THURSDAY = 4,
    FRIDAY = 5,
    SATURDAY = 6,
    SUNDAY = 0,
}
