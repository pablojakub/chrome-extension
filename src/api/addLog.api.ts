import { Log } from '../globalTypes';

const addErrorToLog = (log: Log) => {
    return fetch('https://bookmarkreact-default-rtdb.europe-west1.firebasedatabase.app/Logs.json', {
        method: 'POST',
        body: JSON.stringify(log)
    })
    .then(resp => console.log(resp)   ) 
}

export default addErrorToLog;