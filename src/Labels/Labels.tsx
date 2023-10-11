import { useState } from 'react';
import './Labels.css'

interface LabelsProps {
    onChangeLabels: (label: Array<string>) => void,
    modalLabel: boolean,
};

const Labels = (props: LabelsProps) => {
    const [bookmarkLabels, setbookmarkLabels] = useState<Array<string>>([]);

    const bookmarkLabelsHandler = (label: string) => {
        const newBookmarkLabel = [...bookmarkLabels];
        if (newBookmarkLabel.includes(label)) {
            const filtered = newBookmarkLabel.filter((string) => string !== label)
            setbookmarkLabels(filtered);
            props.onChangeLabels(filtered);
        } else {
            setbookmarkLabels((prev) => ([
                ...prev,
                label
            ]))
            props.onChangeLabels([...bookmarkLabels, label])
        }
    } 


    return (
    <div className='LabelsGroup'>
      <div onClick={(e) => {
        bookmarkLabelsHandler((e.target as HTMLDivElement).innerText)
      }} 
      className={`${props.modalLabel ? 'LabelModalItem' : 'LabelItem'} ${bookmarkLabels.includes('React') ? 'Checked' : ''}`}>
        <span>React</span>
      </div>
      <div onClick={(e) => {
        bookmarkLabelsHandler((e.target as HTMLDivElement).innerText)
      }}
      className={`${props.modalLabel ? 'LabelModalItem' : 'LabelItem'} ${bookmarkLabels.includes('Javascript') ? 'Checked' : ''}`}>
        <span>Javascript</span>
      </div>
      <div
      onClick={(e) => {
        bookmarkLabelsHandler((e.target as HTMLDivElement).innerText)
      }} 
      className={`${props.modalLabel ? 'LabelModalItem' : 'LabelItem'} ${bookmarkLabels.includes('CSS') ? 'Checked' : ''}`}>
        <span>CSS</span>
      </div>
      <div
      onClick={(e) => {
        bookmarkLabelsHandler((e.target as HTMLDivElement).innerText)
      }}
      className={`${props.modalLabel ? 'LabelModalItem' : 'LabelItem'} ${bookmarkLabels.includes('Backend') ? 'Checked' : ''}`}>
        <span>Backend</span>
      </div>
    </div>
    );
};

export default Labels;
