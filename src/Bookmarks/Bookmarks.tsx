import { useState } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import Labels from '../Labels/Labels';
import Header from '../Header/Header';
import BookmarkList from '../BookmarkList/BookmarkList';
import { useQueryClient } from 'react-query';

const Bookmarks = () => {
    const [filterValue, setFilterValue] = useState('');
    const [sortAphabetically, setSortAlphabetically] = useState(false);
    const [labelsValue, setLabelValues] = useState<Array<string>>([]);
    const queryClient = useQueryClient();
    
    return (
    <>
      <Searchbar onSortAlphabetically={(sort) => setSortAlphabetically(sort)} onFilterArray={(inputValue: string) => setFilterValue(inputValue)}/>
        <Labels modalLabel={false} onChangeLabels={(labels) => {
          queryClient.invalidateQueries('allBookmarks');
          setLabelValues(labels)
        }  } />
        <Header />
        <BookmarkList sort={sortAphabetically} filterValue={filterValue} labelValue={labelsValue} />
    </>
    );
};

export default Bookmarks;
