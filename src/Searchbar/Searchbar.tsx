import { useCallback, useEffect, useRef, useState } from 'react';
import './Searchbar.css';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { Tooltip } from 'react-tooltip';
 
interface SearchbarProps {
    onFilterArray: (inputValue: string) => void,
    onSortAlphabetically: (sort: boolean) => void,
};
 
const Searchbar = (props: SearchbarProps) => {
    const [isInputOpen, setInputOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [sortAphabetically, setSortAlphabetically] = useState(false);
    
    const refClickOutisde = useDetectClickOutside({
        onTriggered: () => {
            setInputOpen(false);
            props.onFilterArray('');
            if (inputRef.current !== null) {
                inputRef.current.value = '';
            }
        }
    })

    const copyKeyboardShortcutHandler = useCallback((event: KeyboardEvent) => {
        if(event.ctrlKey === true) {
            if(event.key === 'f') {
                event.preventDefault();
                setInputOpen(true);
                if (inputRef.current !== null) {
                    inputRef.current.focus();
                    inputRef.current.value = '';
                }
            }
        }
    }, [])

    useEffect(() => {
        document.addEventListener('keydown', copyKeyboardShortcutHandler);

        return () => {
            document.removeEventListener('keydown', copyKeyboardShortcutHandler);
        }
    }, [copyKeyboardShortcutHandler])

    return (
    <div ref={refClickOutisde} className='SearchbarWrapper'>
        <svg onClick={() => { 
            setInputOpen(!isInputOpen);
            
            props.onFilterArray('');
            if (inputRef.current !== null) {
                inputRef.current.focus();
                inputRef.current.value = '';
            }
            }} id="SvgjsSvg1011" width="15" height="15" xmlns="http://www.w3.org/2000/svg" version="1.1"><defs id="SvgjsDefs1012"></defs><g id="SvgjsG1013"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="15" height="15"><path d="M46.599 40.236L36.054 29.691C37.89 26.718 39 23.25 39 19.5 39 8.73 30.27 0 19.5 0S0 8.73 0 19.5 8.73 39 19.5 39c3.75 0 7.218-1.11 10.188-2.943l10.548 10.545a4.501 4.501 0 0 0 6.363-6.366zM19.5 33C12.045 33 6 26.955 6 19.5S12.045 6 19.5 6 33 12.045 33 19.5 26.955 33 19.5 33z" fill="#ffffff" className="color000 svgShape"></path></svg></g></svg>
      <input ref={inputRef} className={`SearchbarInput ${isInputOpen && 'Expanded'}`} onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.onFilterArray(e.target.value)} />
      <svg data-tooltip-id='sort-tooltip' data-tooltip-content='Sort alphabetically' onClick={() => {
        props.onSortAlphabetically(!sortAphabetically);
        setSortAlphabetically(!sortAphabetically)
      }} id="SvgjsSvg1011" width="30" height="24" xmlns="http://www.w3.org/2000/svg" version="1.1" ><defs id="SvgjsDefs1012"></defs><g id="SvgjsG1013"><svg xmlns="http://www.w3.org/2000/svg" baseProfile="tiny" version="1.2" viewBox="0 0 24 24" width="30" height="30"><path d="M10.895 16.553l-4-8c-.339-.678-1.45-.678-1.789 0l-4 8a1 1 0 0 0 1.789.895L3.618 16h4.764l.724 1.447a.998.998 0 0 0 1.341.448c.494-.248.695-.848.448-1.342zM4.618 14L6 11.236 7.382 14H4.618zM22 18h-6a1.001 1.001 0 0 1-.8-1.6L20 10h-4a1 1 0 0 1 0-2h6a1.001 1.001 0 0 1 .8 1.6L18 16h4a1 1 0 0 1 0 2zm-8-4h-2a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2z" fill="#ffffff" className={`${sortAphabetically ? 'SortEnabled' : ''} color000 svgShape`}></path></svg></g></svg>
      <Tooltip id='sort-tooltip' />
    </div>
    );
};
 
export default Searchbar;