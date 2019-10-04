const api_url = 'https://tweet-dataset-creator-api.herokuapp.com'

const new_tweet = () => {
    get_tweet()
    .then( response => {
        show_tweet(response.data.tweet)
    })
    .catch( error => console.log(error))
}

const evaluate_tweet = (sentiment) => {
    const doc_id = document.getElementById('tweet_container').getAttribute('doc_id')

    post_eval(doc_id, sentiment)
    .then( response => {
        console.log(response.data)
        if (response.data.status == 'error'){
            alert("Um erro ocorreu :/")
        }
        else{
            toggle_thanks_modal('show')
            new_tweet()
        }
    })
    .catch( error => console.log(error))
}

const get_tweet = () => {
    return axios.get(`${api_url}/tweet`)
}

const post_eval = (tweet_doc_id, sentiment) => {
    return axios.post(
        `${api_url}/evaluate/${tweet_doc_id}/${sentiment}`,
        {
            "pass": localStorage.getItem('pass')
        }
    )
}

const show_tweet = (tweet) =>{
    const tweet_id = tweet.post_id
    const doc_id = tweet._id
    const text = tweet.text

    const container = document.getElementById('tweet_container')
    container.innerHTML = ''

    twttr.widgets.createTweet(
        tweet_id,
        container
    ).then(response => {
        if (! response){
            container.innerHTML = 
            `
            <div class='card hover-em'>
                <div class="alert large warning">
                    <span class="alert-icon">
                        <i class="petalicon petalicon-warning"></i>
                    </span>
                    <div class="alert-text">
                        <p>
                            <strong>O tweet original foi excluído</strong><br>
                            Exibindo conteúdo textual salvo.
                        </p>
                    </div>
                </div>
                <div class='raw_tweet'>
                    <blockquote>
                        <p>
                            ${text}
                        </p>
                    </blockquote>
                </div>
            </div>
            `
        }
    })

    container.setAttribute('doc_id', doc_id)
}

const rand_title_color = () => {
    const colors = ['#f05a67', '#30a4dc', '#b2cf65'] 
    const index = Math.floor(Math.random()*colors.length)
    document.getElementById('title').style.color = colors[index]
}

const ask_for_pass = () =>{
    const pass = prompt("Atualmente esta aplicação está disponível apenas para um grupo pequeno de pessoas, insira a senha: ")

    localStorage.setItem('pass', pass);
}

const toggle_thanks_modal = (action) => {
    const modal = document.getElementById('thanks-modal')

    if (action == 'show'){
        modal.style.opacity = 1;
        modal.style.visibility = 'visible'
    }
    else{
        modal.style.opacity = 0;
        modal.style.visibility = 'hidden'
    }
}