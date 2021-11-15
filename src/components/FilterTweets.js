import { useState } from 'react'

const FilterTweets = ({onSubmit, onFilterTweets}) => {
    const [noTweets, setNoTweets] = useState('')

    const onSubmitValues = (e) => {
        e.preventDefault()
        if(!noTweets) {
            alert('Please add a value')
            return
        }
        onSubmit({noTweets})
        onFilterTweets()
        setNoTweets('')
    }

    return (
        <form action="" className='form-1' onSubmit={onSubmitValues}>
            <div className='form-control-1'>
                <label>Display</label>
                <input type="number" max='75' min='5' value={noTweets}
                step='5' onChange={(e) => setNoTweets(e.target.value)}/>
                <label>recent tweets from my user mentions</label>
            </div>
            <input type="submit" value='Submit' className='btn'
            style={{marginLeft: '20px'}}/>
        </form>
    )
}

export default FilterTweets
