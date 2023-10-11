import { useEffect, useState } from 'react';
import './SideBar.css'
import { Tab } from '../globalTypes';

interface SideBarProps {
    onChangeTab: (tab: Tab) => void,
};

const SideBar = (props: SideBarProps) => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);

    const handleOpenSideBar = (e: MouseEvent) => {
        if (e.clientX < 75 && e.clientX > 0) {
            setIsSideBarOpen(true)
        } else {
            setIsSideBarOpen(false)
        }
    }
    
    useEffect(() => {
        window.addEventListener('mousemove', handleOpenSideBar)

        return () => window.removeEventListener('mousemove', handleOpenSideBar);
    }, []);

    return (
        <>
            <div className={`Sticker ${isSideBarOpen ? 'StickerClosed' : ''}`}><svg id="SvgjsSvg1011" width="15" height="15" xmlns="http://www.w3.org/2000/svg" version="1.1"><defs id="SvgjsDefs1012"></defs><g id="SvgjsG1013"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="15" height="15"><path d="m322.7 128.4 100.3 105c6 5.8 9 13.7 9 22.4s-3 16.5-9 22.4L322.7 383.6c-11.9 12.5-31.3 12.5-43.2 0-11.9-12.5-11.9-32.7 0-45.2l48.2-50.4h-217c-17 0-30.7-14.3-30.7-32s13.7-32 30.6-32h217l-48.2-50.4c-11.9-12.5-11.9-32.7 0-45.2 12-12.5 31.3-12.5 43.3 0z" fill="#ffffff" className="color000 svgShape"></path></svg></g></svg></div>
            <div className={`SideBar ${isSideBarOpen ? 'SideBarOpen' : ''}`}>
                <div className='SideBarElement' onClick={() => props.onChangeTab('Bookmarks')}><div>Bookmarks</div></div>
                <div className='SideBarElement' onClick={() => props.onChangeTab('Notes')}><div>Notes</div></div>
            </div>
        </>
    );
};

export default SideBar;
