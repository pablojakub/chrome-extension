import { Tab } from '../globalTypes';

export type DropdownMenuState = {
    isOpen: false;
} | {
    isOpen: true;
    position: {
        x: number;
        y: number;
    }
    bookmarkdId?: string;
}

export type BookmarkDropDownMenu = {
    position: {
        x: number;
        y: number;
    },
    bookmarkdId: string;
    onClose: () => void;
}


export type DropdownMenuProps = BookmarkDropDownMenu