import { Bookmark, Language } from '../globalTypes';
import './Modal.css';
import addBookmark from '../api/addBookmark.api';
import { useMutation, useQueryClient } from 'react-query';
import Labels from '../Labels/Labels';
 
interface ModalProps {
    bookmark: Bookmark,
    onClose: () => void;
    onSetBookmarkName: (name: string) => void;
    onSetBookmarkDescription: (description: string) => void;
    onSetBookmarkCode: (code: {
        codeString: string,
        language: Language,
    }) => void;
    onSetBookmarkLabel: (label: Array<string>) => void;
};

const languages: Language[] = ['csharp', 'css', 'javascript', 'typescript'];

const Modal = (props: ModalProps) => {
    const queryClient = useQueryClient();

    const postBookmark = useMutation({
        mutationKey: ['postBookmark'],
        mutationFn: (bookmark: Bookmark) => { 
            console.log(bookmark);
          return addBookmark(bookmark);
        },
        onSuccess: () => {
            alert('sukces');
            queryClient.invalidateQueries('allBookmarks');
            props.onClose();
        }
      });

    return (
        <div className='Overlay' onClick={props.onClose}>
            <div className='Modal' onClick={e => e.stopPropagation()}>
                    <label htmlFor="name" className='Label'>Name:</label>
                    <input id='name' name='name' className='Input' value={props.bookmark.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    props.onSetBookmarkName(e.target.value)
                }}
                />
                <label htmlFor="description" className='Label'>Description:</label>
                    <input id='description' name='Description' className='Input' value={props.bookmark.description} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    props.onSetBookmarkDescription(e.target.value)
                }}
                />
                <label htmlFor="code" className='Label'>Code:</label>
                    <textarea id='code' name='code' className='Input' value={props.bookmark.code?.codeString} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        const code = {
                            language: props.bookmark.code !== undefined ? props.bookmark.code.language : 'javascript',
                            codeString: e.target.value,
                        }
                    props.onSetBookmarkCode(code);
                }}
                />
                {!!props.bookmark.code?.codeString !== false && (
                    <>
                        <label htmlFor="codeLanguage">Syntax:</label>
                    <select className='SelectModal' name="codeLanguage" id="codeLanguage" onChange={(e) => 
                        props.onSetBookmarkCode({ 
                            language: e.target.value as Language,
                            codeString: props.bookmark.code !== undefined ? props.bookmark.code.codeString : ''
                        })
                    }>
                        {languages.map((selectOption) => (
                            <option value={selectOption}>{selectOption}</option>
                        ))}
                    </select>
                    </>
                ) }
                <Labels modalLabel onChangeLabels={(label: Array<string>) => props.onSetBookmarkLabel(label)}/>
                <button disabled={!!props.bookmark.name === false} className='Button' onClick={(e) => {
                    e.stopPropagation();
                    postBookmark.mutate(props.bookmark)
                }}>Potwierdź</button>
            </div>
        
      </div>
    );
};
 
export default Modal;