import Tweet from "./Tweet"


const Tweets = ({tweets, onSelect}) => {
    return (
        <div>
            <Tweet text={tweets['text']} username={tweets['screen_name']}
            date={tweets['created_at']} prediction={tweets['prediction']}
            user_prediction={tweets['user_prediction']} onSelect={onSelect}
            />
        </div>
    )
}

export default Tweets
