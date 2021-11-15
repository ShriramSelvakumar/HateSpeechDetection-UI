import Header from "./Header";
import Tweets from "./Tweets";
import FilterTweets from "./FilterTweets";
import { useState, useEffect } from 'react'

const Home = ({loginOnly, sessionKey}) => {

    
    const [tweetsLoaded, setTweetsLoaded] = useState(false)
    const [tweets, setTweets] = useState([])
    const [showFilterTweets, setShowFilterTweets] = useState(false)

    useEffect(() => {
        const getTweets = async () => {
          if(!tweetsLoaded){
            const tweetsFromDjango = await fetchTweets(10)
            setTweets(tweetsFromDjango)
            setTweetsLoaded(true)
          }    
        }
        getTweets()
    })

    // Fetch Tweets - user mentions
    const fetchTweets = async (count) => {
        let formData = new FormData()
        formData.append('count', count)
        formData.append('session_key', sessionKey)
        const res = await fetch('http://127.0.0.1:8000/mentions_2/', {
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
        const tweetsFromDjango = await fetchTweets(10)
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
        const tweetsFromDjango = await fetchTweets(10)
        setTweets(tweetsFromDjango)
      }

      //Display Tweets - default 5
      const filterTweets = async (val) => {
        const tweetsFromDjango = await fetchTweets(val['noTweets'])
        setTweets(tweetsFromDjango)
      }

    return (
    <div className='container_tweets'>
      <Header title='User Mentions' onExportTweets={exportTweets}
      onBlockUsers={blockUsers} onMuteUsers={muteUsers}
      goToHome={loginOnly}
      onFilterTweets={() => setShowFilterTweets(!showFilterTweets)}/>
      {showFilterTweets && <FilterTweets onSubmit={filterTweets}
      onFilterTweets={() => setShowFilterTweets(!showFilterTweets)}/>}
      {tweetsLoaded ? <Tweets tweets={tweets} onSelect={selectTweet}/>
      : <h1>No Tweets to show</h1>}
      
    </div>
    )
}

export default Home
