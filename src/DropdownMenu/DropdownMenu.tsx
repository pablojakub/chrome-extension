import { useMutation, useQueryClient } from 'react-query';
import './DropdownMenu.css';
import deleteBookmark from '../api/deleteBookmark.api';
import { DropdownMenuProps } from './DropdownMenu.types';
import { useDetectClickOutside } from 'react-detect-click-outside';
 
const DropdownMenu = (props: DropdownMenuProps) => {
    const queryClient = useQueryClient();
    const bookmarkdId = props.bookmarkdId ?? '';

    const refClickOutisde = useDetectClickOutside({
      onTriggered: () => {
        props.onClose();
      }
  })

    const deleteBookmarkMutation = useMutation({
      mutationFn: () => { 
        return deleteBookmark(bookmarkdId as string);
      },
      onSuccess: () => {
        props.onClose();
        queryClient.invalidateQueries('allBookmarks');
      }
    });
    
    return (
    <div id='dropdown' style={{ top: props.position.y, left: props.position.x}} className='DropdownMenuWrapper' ref={refClickOutisde} >
      {!!bookmarkdId !== false && (<button className='DropdownBtn' type='button' onClick={() => deleteBookmarkMutation.mutate()}>Delete</button>)}
    </div>
    );
};
 
export default DropdownMenu;

