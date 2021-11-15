import { IoCheckboxOutline, IoCheckbox } from "react-icons/io5";

const Tweet = ({text, username, date, prediction, user_prediction, onSelect}) => {
    return (
        <div>
                {Object.keys(text).map(x => 
                    (<div key={x} 
                    className={`task ${user_prediction[x] ? 'reminder' : ''}`}
                    onClick={() => onSelect(x)}>
                        <h3 key={'text'+x}>
                            {text[x]} 
                        </h3>
                        <p key={'name_date'+x}>
                            {username[x]}, {date[x]} 
                            {user_prediction[x] ?                         
                            (<IoCheckbox style={{float: 'right', color: 'green'}}/>) :
                            (<IoCheckboxOutline style={{float: 'right', color: 'green'}}/>)
                            }
                        </p>
                        <p key={'prediction'+x}>
                            Prediction - {prediction[x]}
                        </p>
                </div>
                    ))}
        </div>
    )
}

export default Tweet
