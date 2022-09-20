let engWord = document.getElementById('eng');
let rusWord = document.getElementById('rus');
let inputs = document.getElementsByClassName('input');
let addButton = document.getElementById('add-word-btn');
let cards = document.querySelector('.cards');
let words;
let btnDelete;

localStorage.length < 1 ? words = [] : words = JSON.parse(localStorage.getItem('words'));

const addWordTotable = index => {
    cards.innerHTML += `        
        <div class="card_eng_word">
            <div class="text_eng_word">Английское слово</div>
            <div class="eng-word">${words[index].english}</div>
        </div>

        <div class="card_rus_word">
            <div class="text_rus_word">Перевод на русский</div>
            <div class="rus-word">${words[index].russian}</div>
        </div>
        
        <button class="btn-delete">Удалить перевод и слово</button>
    `
}

words.forEach((element, i) => {
    addWordTotable(i);
})

addButton.addEventListener('click', () => {
    if(engWord.value.length < 1 || rusWord.value.length < 1 || !isNaN(engWord.value)|| !isNaN(rusWord.value)){
        for(let key of inputs){
            key.classList.add('error');
        }
    }

    else{
        for(let key of inputs){
            key.classList.remove('error');
        }
        words.push(new CreateWord(engWord.value,rusWord.value));
        localStorage.setItem('words', JSON.stringify(words));
        addWordTotable(words.length - 1);
        engWord.value = null;
        rusWord.value = null;
    }
    window.location.reload()
})

function CreateWord(english, russian){
    this.english = english;
    this.russian = russian;
}

const deleteWord = e => {
    const rowIndex = e.target.parentNode.parentNode.rowIndex;
    e.target.parentNode.parentNode.parentNode.remove();
    words.splice(rowIndex, 1);
    localStorage.removeItem('words');
    localStorage.setItem('words',JSON.stringify(words));
}

const addEventDelete = () => {
    if(words.length > 0){
        btnDelete = document.querySelectorAll('.btn-delete');
        for (let btn of btnDelete){
            btn.addEventListener('click', e => {
                deleteWord(e);
                window.location.reload()
            })
        }
    }
}

addEventDelete()