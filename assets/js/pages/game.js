const grid = document.querySelector('.grid')
const spanPlayer = document.querySelector('.player')
const timer = document.querySelector('.timer')

const cardList = [
    'cachorro', 
    'cavalo', 
    'cobra', 
    'coelho', 
    'dragao', 
    'galo', 
    'macaco', 
    'ovelha',
    'porco',
    'rato',
    'tigre',
    'touro'
]

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.getElementsByClassName('face front disable-card').length; 
    if(disabledCards === 24) {
        clearInterval(this.loop)
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML}`)
    }
}

const checkCards = () => {
    const first = firstCard.getAttribute('data-card')
    const second = secondCard.getAttribute('data-card')

    if(first === second) {
        firstCard.firstChild.classList.add('disable-card')
        secondCard.firstChild.classList.add('disable-card')
        firstCard = ''
        secondCard = ''
        checkEndGame()
    } else {
        setTimeout(()=> {
            firstCard.classList.remove('active')
            secondCard.classList.remove('active')
            firstCard = ''
            secondCard = ''
        }, 500)
        
    }
}

const cardActive = ({ target }) => {
    if(target.parentNode.classList.contains('active')){
        return
    }
    if(firstCard === '') {
        target.parentNode.classList.add('active')
        firstCard = target.parentNode
    } else if (secondCard === ''){
        target.parentNode.classList.add('active')
        secondCard = target.parentNode
        checkCards()
    } 
}

const createElement = (tag, className) => {
    const element = document.createElement(tag)
    element.className = className
    return element
}

const creatCard = (image) => {
    const card = createElement('div', 'card')
    const front = createElement('div', 'face front')
    const back = createElement('div', 'face back')
    front.style.backgroundImage = `url('/assets/images/${image}.png')`

    card.appendChild(front)
    card.appendChild(back)

    card.addEventListener('click', cardActive)
    card.setAttribute('data-card', image)

    return card
}

const createList = () => {
    //duplica a lista
    const duplicateCardList = [...cardList, ...cardList]
    //embaralha a lista
    const shuffledArray = duplicateCardList.sort(() => Math.random()-0.5)
    return shuffledArray
}

const loadGame = () => {

    createList().forEach((index) => {

        const card = creatCard(index)
        grid.append(card)
    })
}

const startTimer = () => {

    this.loop = setInterval(() => {
        timer.innerHTML = Number(timer.innerHTML) + 1
    }, 1000)
}

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player')

    startTimer()
    loadGame()
}

