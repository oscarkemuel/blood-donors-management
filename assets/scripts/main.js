(function(){
    const button = document.querySelector('header button')
    button.addEventListener('click', function(){
        let form = document.querySelector('form')
        let container = document.querySelector('section.form')
        // Adiciona ou tira uma nova class no elemento
        container.classList.toggle('hide')
        form.classList.toggle('hide')
    })
})();
