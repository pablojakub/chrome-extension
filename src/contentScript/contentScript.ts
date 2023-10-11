import { DOMMessage, DOMMessageResponse } from '../types/DOMMessages';

chrome.runtime.onMessage.addListener((msg: DOMMessage, sender: chrome.runtime.MessageSender, sendResponse: (response: DOMMessageResponse) => void) => {

   const response: DOMMessageResponse = {
       title: document.title,
       url: document.location.toString(),
   };

   sendResponse(response);
})

export {}

// chrome.runtime.onMessage.addListener(messagesFromReactAppListener);