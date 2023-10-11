import './Loader.css';

interface LoaderProps {
    width: number;
    height: number;
}
 
const Loader = (props: LoaderProps) => {
    return (
    <div style={{ width: props.width, height: props.height}} className='Loader'>
      
    </div>
    );
};
 
export default Loader;