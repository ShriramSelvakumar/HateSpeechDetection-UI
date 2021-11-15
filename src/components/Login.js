import { useState } from 'react'

const Login = ({homeOnly, trendsOnly, setSession, setShowHome}) => {
    const [consumerKey, setConsumerKey] = useState('')
    const [consumerSecret, setConsumerSecret] = useState('')
    const [accessToken, setAccessToken] = useState('')
    const [accessTokenSecret, setAccessTokenSecret] = useState('')

    
    // Submit login credentials
    const submitLogin = async (e) => {
        e.preventDefault()

        if(!consumerKey) {
            alert('Please add Consumer Key')
            return
        }
        if(!consumerSecret) {
            alert('Please add Consumer Secret')
            return
        }
        if(!accessToken) {
            alert('Please add Access Token')
            return
        }
        if(!accessTokenSecret) {
            alert('Please add Access Token Secret')
            return
        }

        let formData = new FormData()
        formData.append('consumer_key', consumerKey)
        formData.append('consumer_secret', consumerSecret)
        formData.append('access_token', accessToken)
        formData.append('access_token_secret', accessTokenSecret)

        const res = await fetch('http://127.0.0.1:8000/new_user/', {
            method: 'POST',
            // headers: {
            //     'content-type': 'multipart/form-data; boundary=???'
            // },
            body: formData
        })

        const data = await res.json()
        console.log(data)
        
        setSession(data['session_key'])
        homeOnly()       
    }

    const submitLoginTrends = async (e) => {
        e.preventDefault()

        if(!consumerKey) {
            alert('Please add Consumer Key')
            return
        }
        if(!consumerSecret) {
            alert('Please add Consumer Secret')
            return
        }
        if(!accessToken) {
            alert('Please add Access Token')
            return
        }
        if(!accessTokenSecret) {
            alert('Please add Access Token Secret')
            return
        }

        let formData = new FormData()
        formData.append('consumer_key', consumerKey)
        formData.append('consumer_secret', consumerSecret)
        formData.append('access_token', accessToken)
        formData.append('access_token_secret', accessTokenSecret)

        const res = await fetch('http://127.0.0.1:8000/new_user/', {
            method: 'POST',
            // headers: {
            //     'content-type': 'multipart/form-data; boundary=???'
            // },
            body: formData
        })

        const data = await res.json()
        console.log(data)
        
        setSession(data['session_key'])
        trendsOnly()
        // onSubmit={submitLogin}
    }

    return (
        <div className='container_login'>
            <form className="add-form" >
            <h1>Hate Speech Detector</h1>
            <div className='form-control'>
            <label style={{marginTop: '30px'}}>Consumer Key</label>
            <input type="text" placeholder='Consumer Key'
            value={consumerKey} onChange={(e) => setConsumerKey(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label htmlFor="">Consumer Secret</label>
                <input type="text" placeholder='Consumer Secret'
                value={consumerSecret} onChange={(e) => setConsumerSecret(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label htmlFor="">Access Token</label>
                <input type="text" placeholder='Access Token'
                value={accessToken} onChange={(e) => setAccessToken(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label htmlFor="">Access Token Secret</label>
                <input type="text" placeholder='Access Token Secret'
                value={accessTokenSecret} onChange={(e) => setAccessTokenSecret(e.target.value)}/>                
            </div>
            <div className='center'>
                <input type="submit" value='Login - Account' className='btn' name='mentions'
                onClick={submitLogin}
                style={{marginTop: '20px', backgroundColor: 'mediumseagreen'}}/>
                <input type="submit" value='Login - Trends' className='btn' name='trends'
                onClick={submitLoginTrends}
                style={{marginTop: '20px', backgroundColor: 'skyblue'}}/>
            </div>
            <div className='center-link'>
            <a href="https://developer.twitter.com/en/apply-for-access">
                Apply for login credentials - Get Twitter Developer Access
            </a>
            </div>
            </form>
        </div>
    )
}

export default Login
