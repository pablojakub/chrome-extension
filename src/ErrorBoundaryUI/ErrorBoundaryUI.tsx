import '../App.css';

interface ErrorBoundaryUIprops {
    message: string,
};

const ErrorBoundaryUI = (props: ErrorBoundaryUIprops) => {
    return (
    <div className='App'>
        <div className="Numbersection">
          {props.message}
        </div>
        <br />
        <button className='Button' onClick={() => window.location.reload()}>Refresh the page</button>
    </div>
    );
};

export default ErrorBoundaryUI;
