import PropTypes from 'prop-types'
import Button from './Button'
import  { useState } from "react"

const HeaderTrends = ({title, onExportTweets, onBlockUsers, onMuteUsers, goToHome}) => {

    const [showDialog, setShowDialog] = useState(false)
    const [dialogMessage, setDialogMessage] = useState('Default Message')
    const [falseButton, setFalseButton] = useState('Cancel')
    const [trueButton, setTrueButton] = useState('Accept')
    const [action, setAction] = useState(0)

    const onExport = (e) => {
        setDialogMessage('Exporting Predictions to csv file. Save both the AI predictions & user predictions ?')
        setAction(1)
        setFalseButton('Only save AI Predictions')
        setTrueButton('Save Both')
        if (!showDialog) {
            document.querySelector(".confirm-bg").style.display = "flex"
            document.querySelector(".container").style.display = "flex"
            setShowDialog(true)
        }
    }

    const onBlock = (e) => {
        setDialogMessage('Block \'AI selected\' accounts or \'User Selected\' accounts')
        setAction(2)
        setFalseButton('AI Selected')
        setTrueButton('User Selected')
        if (!showDialog) {
            document.querySelector(".confirm-bg").style.display = "flex"
            document.querySelector(".container").style.display = "flex"
            setShowDialog(true)
        }
    }

    const onMute = (e) => {
        setDialogMessage('Mute \'AI selected\' accounts or \'User Selected\' accounts')
        setAction(3)
        setFalseButton('AI Selected')
        setTrueButton('User Selected')
        if (!showDialog) {
            document.querySelector(".confirm-bg").style.display = "flex"
            document.querySelector(".container").style.display = "flex"
            setShowDialog(true)
        }
    }

    const handlerFunction = (val) => {
        console.log()
        if (!showDialog) {
            document.querySelector(".confirm-bg").style.display = "flex"
            document.querySelector(".container").style.display = "flex"
            setShowDialog(true)
          } else {
            document.querySelector(".confirm-bg").style.display = "none"
            document.querySelector(".container").style.display = "none"
            console.log(action)
            if(val === 'yes'){
                console.log('yes')
                if(action === 1){                
                    onExportTweets(true)
                }
                if(action === 2){
                    onBlockUsers(true)    
                }
                if(action === 3){
                    onMuteUsers(true)    
                }
            }
            if(val === 'no'){
                console.log('no')
                if(action === 1){                
                    onExportTweets(false)
                }
                if(action === 2){
                    onBlockUsers(false)    
                }
                if(action === 3){
                    onMuteUsers(false)    
                }
            }            
            setAction(0)
            setShowDialog(false)
        }        
    }

    return (
        <>
        <header className='header_parent'>
            <h1 className='header_child'>{title}</h1>
             <Button color='red' text='Block Users'
             onClick={onBlock} 
             className='header_child'/>
             <Button color='red' text='Mute Users'
             onClick={onMute} 
             className='header_child'/>
             <Button color='steelblue' text='Export Predictions'
             onClick={onExport} 
             className='header_child'/>
             <Button color='grey' text='Logout'
             onClick={goToHome} 
             className='header_child'/>
        </header>
             <>
             <div className="container">
                <div className="confirmation-text">
                {dialogMessage}</div>
                <div className="button-container">
                <button 
                    className="cancel-button" 
                    onClick={() => handlerFunction('no')}>
                    {falseButton}
                </button>
                <button 
                    className="confirmation-button"
                    onClick={() => handlerFunction('yes')}>
                    {trueButton}
                    </button>
                </div>
            </div>
             <div 
                className="confirm-bg" 
                onClick={() => handlerFunction()}>
            </div>
            </>
        
        </>
    )
}

HeaderTrends.defaultProps = {
    title: 'Default Title'
}

HeaderTrends.propTypes = {
    title: PropTypes.string
}

export default HeaderTrends
