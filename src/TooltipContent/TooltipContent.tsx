import './TooltipContent.css';

interface TooltipContentProps {
    content: {
        bookmarkName: string,
        bookmarkDesc: string | undefined
    }
};
 
const TooltipContent = (props: TooltipContentProps) => {
    return (
        <div className='TooltipWrapper'>
            <div>
                {props.content.bookmarkName}
            </div>
            <div className='TooltipDesc'>
                {props.content.bookmarkDesc !== undefined ? props.content.bookmarkDesc : ''}
            </div>
        </div>
    );
};
 
export default TooltipContent;