//COUNTER
let optionsCounter = {
    selector: '.view-box__counter', //селектор
    startValue: 0, //начальное значение
    increase: 1, //шаг
    interval: 1000, //скорость
    start: false, //старт - стоп
}

//init selector
const counterSelector = selector => document.querySelector(`${selector}`);

//append value to counter on every step
const increase = () => optionsCounter.startValue += optionsCounter.increase;

//current value
const current = () => increase()

//render counter
const renderCount = () => counterSelector(optionsCounter.selector).innerHTML = current()

//listener status counter, enable or disable
const listenerCounter = () => optionsCounter.start;

//switch ON or OFF
const switchCounter = () => listenerCounter ? startCounter : stopCounter;

//active
const startCounter = setInterval(() => renderCount(), optionsCounter.interval);

//disable
const stopCounter = () => clearInterval(startCounter);

switchCounter()
// -----



//METEORITES 
let optionsMeteor = {
    img: 'meteor.gif', //спрайт
    startPosition: 'random', //позиция появления
    interval: 4000, //частота появления метеоров
    fallSpeed: 5, //скорость падения
    start: true, //активация - деактивация метеоритов
    allCurrentMeteors: [],
}

function createMeteor(img) {
    const parentMeteor = document.querySelector('.view-box');
    const meteor = document.createElement('div');
    parentMeteor.appendChild(meteor);
    meteor.className = 'view-box__meteor-wrapper';
    const meteorSprite = document.createElement('img');
    meteor.appendChild(meteorSprite);
    meteorSprite.className = 'meteor';
    meteorSprite.src = img;
    optionsMeteor.allCurrentMeteors.push(meteor)
    return meteor;
}

function startPositionMeteor() {
    if (optionsMeteor.startPosition === "random") {
        return createMeteor(optionsMeteor.img).style.left = random() + '%';
    } else {
        return createMeteor(optionsMeteor.img).style.left = optionsMeteor.startPosition + '%';
    }
}

function random(max = 100, min = 0, round = 0) {
    return Number(((Math.random() * (max - min + 1)) + min).toFixed(round))
}

function startMeteors(interval) {
    if (optionsMeteor.start) setInterval(() => startPositionMeteor(), interval);
}

(function destroyMeteors() {
    setInterval(() => {
        optionsMeteor.allCurrentMeteors.forEach(el => {
            el.remove()
        });
        optionsMeteor.allCurrentMeteors.pop()
    }, 4000);
})();

(function fallAnimate(fallSpeed) {
    let root = document.documentElement
    root.style.setProperty('--animation-speed', fallSpeed + 's')
})(optionsMeteor.fallSpeed);

startMeteors(optionsMeteor.interval)



//STARSHIP
let rocketOptions = {
    selector: '.rocket', //селектор ракеты
    img: 'rocket.gif', //скин ракеты
    wrapper: document.querySelector('.view-box__rocket-wrapper'), //селектор обертки ракеты
    wrapper2: document.querySelector('.view-box__rocket-wrapper'), //селектор обертки ракеты
    controlON: true, //включить - выключить управление
}

const starShip = selector => {
    const starShip = document.querySelector(`${selector}`)
    return starShip
}

const starShipSprite = (() => {
    starShip(rocketOptions.selector).src = rocketOptions.img
})();

const starshipMove = () => {
    const starShipWrapper = rocketOptions.wrapper
    let starshipPosition = 50;
    rocketOptions.wrapper.style.left = `${starshipPosition}%`;
    addEventListener('keydown', event => {
        if (starShipWrapper.offsetLeft != 0) {
            if (event.key == "ArrowLeft") {
                starshipPosition -= 2
                rocketOptions.wrapper.style.left = `${starshipPosition}%`;
            }
        }
        if (rocketOptions.wrapper.offsetLeft < window.innerWidth) {
            if (event.key == "ArrowRight") {
                starshipPosition += 2
                rocketOptions.wrapper.style.left = `${starshipPosition}%`;
            }
        }
    })
};

const controllActive = (() => {
    if (rocketOptions.controlON) starshipMove()
})();


//CONDITIONS
const hpOptions = {
        maxHp: 100,
        damage: 10,
    };

    (function hit() {
        setInterval(() => {
            const starshipWidth = 200
            let currentHp = hpOptions.maxHp
            let hpBar = document.querySelector('.view-box__hp-progress')
            hpBar.style.width = currentHp + '%'

            optionsMeteor.allCurrentMeteors.forEach(el => {
                let coorShip = starShip(rocketOptions.selector)
                if (el.getBoundingClientRect().y >= coorShip.getBoundingClientRect().y && (el.getBoundingClientRect().x > coorShip.getBoundingClientRect().x && el.getBoundingClientRect().x < coorShip.getBoundingClientRect().x + starshipWidth)) {
                    el.querySelector('img').src = 'boom.gif'
                    if(!el.isDamaged) {
                        console.log('DAMAGE!!!')
                        console.log(el.getBoundingClientRect().y)
                        el.isDamaged = true
                        damage()
                        if(gameOver()) alert('Game Over!!')
                    }
                    setTimeout(() => {
                        el.remove()
                    }, 1000);
                }
            });
        }, 10);
    })();

function damage() {
    hpOptions.maxHp = hpOptions.maxHp - hpOptions.damage
}

function gameOver() {
    return hpOptions.maxHp <= 0
}
