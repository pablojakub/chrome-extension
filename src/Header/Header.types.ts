import { Tab } from '../globalTypes';

export type ModalState = {
    isOpen: false
} | {
    isOpen: true;
    mode: Tab;
}