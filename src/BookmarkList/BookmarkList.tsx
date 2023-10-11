import { useQuery } from 'react-query';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import getBookmarks from '../api/getBookmarks.api';
import { Bookmark, BookmarkByDate } from '../globalTypes';
import './BookmarkList.css'
import { Tooltip } from 'react-tooltip';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import { useRef, useState } from 'react';
import { DropdownMenuState } from '../DropdownMenu/DropdownMenu.types';
import { fallBehindSchedule, getStartOfWeek, isTodayCompleted } from '../Utils/UtilsDates';
import TooltipContent from '../TooltipContent/TooltipContent';
import Loader from './Loader/Loader';
import BookmarkDetail from '../BookmarkDetail/BookmarkDetail';
 
interface BookmarkListProps {
    filterValue: string,
    labelValue: Array<string>,
    sort: boolean,
};

const BookmarkList = (props: BookmarkListProps) => {
    const [dropDownMenuState, setDropdownMenuState] = useState<DropdownMenuState>({isOpen: false});
    const bookmarkRef = useRef<HTMLDivElement>(null);
    const [showBookmarkDetail, setShowbookmarkDetail] = useState<{ showDetail: boolean, bookmarkDetail: Bookmark}>({
        showDetail: false,
        bookmarkDetail: {
            name: '',
            url: '',
            description: '',
            timestamp: new Date(),
            code: {
                codeString: '',
                language: 'javascript',
            },
            label: []
        }
    });

    const bookmarkQuery = useQuery({
        queryKey: ['allBookmarks'],
        queryFn: () => getBookmarks(),
    });
    const beginingOfTheWeek = getStartOfWeek(new Date(new Date().setHours(0,0,0,0)));

    let numberofWeekBookmarks = 0;
    let bookmarkIds: string[] = [];

    if (bookmarkQuery.isFetched && bookmarkQuery.data !== undefined && bookmarkQuery.data !== null) {
        const bookmarks = Object.values(bookmarkQuery.data);
        bookmarkIds = Object.keys(bookmarkQuery.data).reverse();
        bookmarks.forEach((bookmark) => {
            if (new Date(bookmark.timestamp) > beginingOfTheWeek) {
                numberofWeekBookmarks += 1;
            }
        })        
    };
    const dropDownMenuAnchor = document.getElementById('dropdownMenu');

    const labelFilterCallback = (bookmark: Bookmark) => {
        if (props.labelValue.length === 0) {
            return bookmark;
        }
        for(let labelValue of props.labelValue) {
            if (bookmark.label === undefined) {
                continue;
            }
            if (bookmark.label.includes(labelValue)) {
                return bookmark
            } else {
                continue;
            }
        }
    }
    
    return (
        <>
        {bookmarkQuery.isLoading ? (
            Array.from(Array(2), (_, index) => <Loader width={300} height={34} key={index} />)
        ) : (
            <>
                <div className='Numbersection'>
        Number of this week articles: <span className={`${isTodayCompleted(bookmarkQuery.data) ? 'Completed' : ''} ${fallBehindSchedule(numberofWeekBookmarks) ? 'Red' : 'Regular'}`} >{numberofWeekBookmarks}</span>
    </div>
    <div className='Numbersection'>You are <span className='Number'>{(1.01 ** getBookmarksNumberGroupedByDate(bookmarkQuery.data)).toFixed(3)}</span> times better than at 11.09.2023</div>
            </>
        )}
            
    {bookmarkQuery.isLoading 
    ? (
        Array.from(Array(5), (_, index) => <Loader width={330} height={40} key={index} />)
    ) : bookmarkQuery.data !== null ? 
        (
        <div className='Bookmarkwrapper Snaps-block'>
            {Object.values(bookmarkQuery.data as Record<string, Bookmark>)
                .filter(labelFilterCallback)
                .filter((bookmark) => bookmark.name.toLowerCase().includes(props.filterValue.toLowerCase()))
                .sort((a,b) => (
                    props.sort === true 
                    ? a.name.localeCompare(b.name)
                    : Number(new Date(b.timestamp)) - Number(new  Date(a.timestamp))
                ))
                .map((bookmark, index) => (
            <div
                ref={bookmarkRef}
                className='Bookmark'
                id={bookmarkIds[index]}
                key={bookmarkIds[index]}
                
                onContextMenu={(e) => {
                    e.preventDefault();
                    if (bookmarkRef.current) {
                        const target = e.target as HTMLDivElement;
                        const bodyOffset = document.body.getBoundingClientRect();
                        const tempX = e.pageX - bodyOffset.left;
                        const tempY = e.pageY;
                        setDropdownMenuState({
                            isOpen: true,
                            position: { x: tempX, y: tempY },
                            bookmarkdId: target.id });
                    }
                   
                }}
            >
                {/* bookmark comp in the future */}
                <a
                    data-tooltip-id={bookmarkIds[index]}
                    id={bookmarkIds[index]}
                    href={bookmark.url}
                    onClick={(e) => {
                        e.preventDefault();
                        setShowbookmarkDetail({
                            bookmarkDetail: bookmark,
                            showDetail: true,
                        })
                    }}
                    data-tooltip-html={(bookmark.name.length > 40 || bookmark.description !== undefined) ? ReactDOMServer.renderToStaticMarkup(
                        <TooltipContent content={{bookmarkName: bookmark.name, bookmarkDesc: bookmark.description}} />
                    ) : undefined}
                    target='blank'>{bookmark.name}
                </a>
                  <Tooltip id={bookmarkIds[index]} place='top-start' style={{ backgroundColor: "white", color: "black", position: 'fixed', zIndex: 5 }}/>
            </div>
            
        ))}
        </div>
        
    ) : null}
    {dropDownMenuState.isOpen && ReactDOM.createPortal(<DropdownMenu position={{ x: dropDownMenuState.position.x, y: dropDownMenuState.position.y}} bookmarkdId={dropDownMenuState.bookmarkdId as string} onClose={() => setDropdownMenuState({isOpen: false})} />, dropDownMenuAnchor!)}
    {showBookmarkDetail.showDetail && (
        <BookmarkDetail
            onClose={() => setShowbookmarkDetail({ showDetail: false, bookmarkDetail: showBookmarkDetail.bookmarkDetail})}
            bookmark={showBookmarkDetail.bookmarkDetail}
        />
    )}
        </>
    );
};
 
export default BookmarkList;


function getBookmarksNumberGroupedByDate(bookmarkQuery: Record<string, Bookmark> | undefined) {
    if (bookmarkQuery === undefined || bookmarkQuery === null) {
        return 1;
    }
    const bookmarkArray = Object.values(bookmarkQuery);
    const bookmarksSortedByDate: BookmarkByDate = {};

    bookmarkArray.forEach((bookmark) => {
        const date = bookmark.timestamp.toString().split('T')[0];
        if(date in bookmarksSortedByDate) {
            bookmarksSortedByDate[date].push(bookmark)
        } else {
            bookmarksSortedByDate[date] = new Array(bookmark)
        }
    });
    return Object.keys(bookmarksSortedByDate).length;
}


