const input = document.querySelector('.login_input')
const button = document.querySelector('.login_button')
const form = document.querySelector('.login-form')

const validateInput = (event) => {
    if(event.target.value.length > 2){
        button.removeAttribute('disabled')
    } else {
        button.setAttribute('disabled', '')
    }
}

const handleSubmit = (event) => {
    event.preventDefault()

    localStorage.setItem('player', input.value)
    window.location = 'game.html'
}

input.addEventListener('input', validateInput)
form.addEventListener('submit', handleSubmit)