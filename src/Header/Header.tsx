import { useState } from 'react';
import { DOMMessageResponse } from '../types';
import { Bookmark } from '../globalTypes';
import Modal from '../Modal/Modal';
import './Header.css';
import { ModalState } from './Header.types';
import { useDetectClickOutside } from 'react-detect-click-outside';

 
const Header = () => {
    const [bookmark, setBookmark] = useState<Bookmark>({
        url: '',
        name: '',
        description: '',
        timestamp: new Date(),
        label: [],
        code: {
          codeString: '',
          language: 'javascript',
        }
      });

    const refClickOutisde = useDetectClickOutside({
        onTriggered: () => {
          setMenuOpen(false);
        }
    })
    const [modalOpen, setModalOpen] = useState<ModalState>({ isOpen: false });
    const [menuOpen, setMenuOpen] = useState(false);

    const getCurrentTabData = () => {
        chrome.tabs && chrome.tabs.query({
          active: true,
          currentWindow: true
       }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id || 0, { type: 'GET_DOM' }, (response: DOMMessageResponse) => {
            setBookmark({
              url: response.url,
              name: response.title,
              timestamp: new Date(),
              label: [],
            })
            });
            setMenuOpen(false);
            setModalOpen({ isOpen: true, mode: 'Bookmarks' });
       });
      }

      const onSetBookmarkLabels = (label: Array<string>) => {
        setBookmark((prev) => ({
          ...prev,
          label: label
        }))
      }
    return (
    <>
      
      <div className='MenuWrapper' ref={refClickOutisde}>
        <button className='Button' type='button' onClick={() => setMenuOpen(true)}>Add ⭐</button>
          <div className={`Menu ${menuOpen && 'Menu-active'}`}>
            <div className="MenuBtn">
              Add note
            </div>
            <div className="MenuBtn" onClick={() => getCurrentTabData()}>
              Add bookmark
            </div>
          </div>
      </div>

      {modalOpen.isOpen && modalOpen.mode === 'Bookmarks' && 
          <Modal
            bookmark={bookmark}
            onClose={() => setModalOpen({ isOpen: false })}
            onSetBookmarkName={(name: string) => setBookmark((prev) => ({
          ...prev,
          name: name,
        }))}
          onSetBookmarkDescription={(description: string) => setBookmark((prev) => ({
            ...prev,
            description: description,
          }))}
          onSetBookmarkCode={(code) => setBookmark((prev) => ({
            ...prev,
            code: {
              language: code.language,
              codeString: code.codeString
            }
          }))}
          onSetBookmarkLabel={(label) => onSetBookmarkLabels(label)}/> }
          {modalOpen.isOpen && modalOpen.mode === 'Notes' && ('tu będzie modal notes') }
        </>
        
    );
};
 
export default Header;