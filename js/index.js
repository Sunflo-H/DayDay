'use strict'
window.addEventListener("load", function () {
    let quote_text = window
        .document
        .getElementById("quote-text");
    let quote_author = window
        .document
        .getElementById("quote-author");
    fetch("https://type.fit/api/quotes")
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            let num = Math.floor(Math.random() * 1643);
            console.log(data[num]);
            let text = data[num].text;
            let author = data[num].author;

            quote_text.innerText = text;
            quote_author.innerText = `- ${author} -`;
        });

    let menuicon = document.getElementById('menuicon');
    menuicon.checked=false;

})
