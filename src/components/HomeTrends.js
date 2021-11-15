import HeaderTrends from "./HeaderTrends";
import Tweets from "./Tweets";
import { useState} from 'react'

const HomeTrends = ({loginOnly, sessionKey}) => {

    
    const [tweetsLoaded, setTweetsLoaded] = useState(false)
    const [tweets, setTweets] = useState([])

    // Fetch Tweets - user mentions
    const fetchTweets = async (count, lang, query) => {
        let formData = new FormData()
        formData.append('count', count)
        formData.append('lang', lang)
        formData.append('query', query)
        formData.append('session_key', sessionKey)
        const res = await fetch('http://127.0.0.1:8000/search_tweets/', {
          method: 'POST',
          body: formData,
        })
        const data = await res.json()
        console.log(data)        
        return data
    }
    
        
      // Selecting tweet
      const selectTweet = (id) => {
        const val = tweets.user_prediction[id]
        setTweets(prevState => ({...prevState, user_prediction: {
          ...prevState.user_prediction,
          [id]: !val
        }}))
      }
      
      //Export Tweets
      const exportTweets = async (val) => {
        const res = await fetch('http://127.0.0.1:8000/export_tweets/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({session_key: sessionKey, tweets: tweets.text,
                              ml_prediction: tweets.prediction,
                              user_prediction: tweets.user_prediction,
                              save_both: val}),
        })
        const data = await res.json()
        console.log(data)
        const tweetsFromDjango = await fetchTweets(noTweets, lang, query)
        setTweets(tweetsFromDjango)
      }

      //Block Users - default 1 recurrance
      const blockUsers = async (val) => {
        const res = await fetch('http://127.0.0.1:8000/block_users_json/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({session_key: sessionKey, name: tweets.screen_name,
                              ml_prediction: tweets.prediction,
                              user_prediction: tweets.user_prediction,
                              use_user_predictions: val}),
        })
        const data = await res.json()
        console.log(data)
        const tweetsFromDjango = await fetchTweets(noTweets, lang, query)
        setTweets(tweetsFromDjango)
      }

      //Mute Users - default 1 recurrance
      const muteUsers = async (val) => {
        const res = await fetch('http://127.0.0.1:8000/mute_users_json/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({session_key: sessionKey, name: tweets.screen_name,
                              ml_prediction: tweets.prediction,
                              user_prediction: tweets.user_prediction,
                              use_user_predictions: val}),
        })
        const data = await res.json()
        console.log(data)
        const tweetsFromDjango = await fetchTweets(noTweets, lang, query)
        setTweets(tweetsFromDjango)
      }
      
      const searchTrends = async () => {
        const tweetsFromDjango = await fetchTweets(noTweets, lang, query)
        setTweets(tweetsFromDjango)
        setTweetsLoaded(true)
      }

      const [noTweets, setNoTweets] = useState('')
      const [query, setQuery] = useState('')
      const [lang, setLang] = useState('')
    
    return (
    <div className='container_tweets'>
      <HeaderTrends title='Search Trends' onExportTweets={exportTweets}
      onBlockUsers={blockUsers} onMuteUsers={muteUsers}
      goToHome={loginOnly}/>
      <div className='trends-control'>
        <label htmlFor="">Query</label>
        <input type="text" placeholder='Enter Query'
        value={query} onChange={(e) => setQuery(e.target.value)}/>
        <label htmlFor="">Count</label>
        <input type="number" max='75' min='5' value={noTweets}
                step='5' onChange={(e) => setNoTweets(e.target.value)}
                style={{width: '100px'}}/>
        <label htmlFor="">Lang</label>
        <input type="text" placeholder='Lang'
        value={lang} onChange={(e) => setLang(e.target.value)}
        style={{width: '100px'}}/>
        <input type="submit" value='Search' className='btn' name='trends'
                onClick={searchTrends}
                style={{width: '100px',
                backgroundColor: 'skyblue'}}/>
      </div>

      {tweetsLoaded && <Tweets tweets={tweets} onSelect={selectTweet}/>
      }
      
    </div>
    )
}

export default HomeTrends
