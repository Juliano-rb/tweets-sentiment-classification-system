import api_server_url from "./api_url.js"
const api_url = api_server_url || 'http://localhost:3333'
const enable_multiple_avaliations = false

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
            alert("Um erro ocorreu.\nSenha incorreta?")
        }
        else{
            //toggle_thanks_modal('show')
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

const flag_tweet = () => {
    const doc_id = document.getElementById('tweet_container').getAttribute('doc_id')

    axios.post(
        `${api_url}/flag/${doc_id}`,
        {
            "pass": localStorage.getItem('pass')
        }
    ).then(response => {
        console.log(response.data)
        if (response.data.status == 'error'){
            alert("Um erro ocorreu.\nSenha incorreta?")
        }
        else{
            alert("Este tweet não será mais exibido para avaliação.")
            new_tweet()
        }
    })
    .catch( error => console.log(error))
}

const show_tweet = (tweet) =>{
    const tweet_id = tweet.post_id
    const doc_id = tweet._id
    const text = tweet.text
    const evals = tweet.evals_count
    const subject = tweet.subject

    console.log(doc_id)
    document.getElementById('evals_count').innerHTML = evals
    document.getElementById('subject').innerHTML = subject

    const container = document.getElementById('tweet_container')
    container.innerHTML = ""

    if (evals > 0 & !enable_multiple_avaliations){
        container.innerHTML = 
            `
            <div class='card hover-em'>
                <div class="alert large okay">
                    <span class="alert-icon">
                        <i class="petalicon petalicon-check-round"></i>
                    </span>
                    <div class="alert-text">
                        <p>
                            <strong>Todos os tweets foram classificados!</strong><br>
                            Volte aqui quando forem adicionados novos tweets à base de dados
                        </p>
                    </div>
                </div>
            </div>
            `
            document.getElementById('btn-group').style.visibility = 'hidden'
            document.getElementsByClassName('small_text')[0].style.visibility = 'hidden'
        return
    }

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

    document.getElementById('btn-group').style.visibility = 'visible'
    document.getElementsByClassName('small_text')[0].style.visibility = 'visible'
    container.setAttribute('doc_id', doc_id)
}

const rand_title_color = () => {
    const colors = ['#f05a67', '#30a4dc', '#b2cf65'] 
    const index = Math.floor(Math.random()*colors.length)
    document.getElementById('title').style.color = colors[index]
}

const make_questions = () =>{
    const pass = prompt("Atualmente esta aplicação está disponível apenas para um grupo pequeno de pessoas.\nInsira a senha de acesso: ")

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

window.evaluate_tweet = evaluate_tweet
window.flag_tweet = flag_tweet
window.new_tweet = new_tweet

window.addEventListener('load', (event)=>{
    new_tweet()
    rand_title_color()
    make_questions()
})