import { Bookmark } from '../globalTypes';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import '../Modal/Modal.css'

interface BookmarkDetailProps {
    onClose: () => void;
    bookmark: Bookmark,
};

const BookmarkDetail = (props: BookmarkDetailProps) => {
    return (
        <div className='Overlay' onClick={props.onClose}>
        <div className='ModalDesc' onClick={e => e.stopPropagation()}>
            {!!props.bookmark.description !== false && (
                <>
                    <label htmlFor="description" className='Label'>Description:</label>
                    <textarea id='description' value={props.bookmark.description} name='Description' className='InputDesc' disabled
                />
            </>)}
            {props.bookmark.code !== undefined ? (
                <>
                    <label htmlFor="code" className='Label'>Code:</label>
                <SyntaxHighlighter customStyle={{ maxHeight: '250px', width: '450px'}} language={props.bookmark.code !== undefined ? props.bookmark.code.language : 'javascript'} style={docco}>
                    {props.bookmark.code !== undefined ? props.bookmark.code.codeString : ''}
                </SyntaxHighlighter>
                </>
            ) : null}
            
            <button className='Button' onClick={(e) => {
                e.stopPropagation();
                window.open(`${props.bookmark.url}`, "_blank");

            }}>Open bookmark</button>
        </div>
    
  </div>
    );
};

export default BookmarkDetail;
