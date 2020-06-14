// ==UserScript==
// @name         Zelent to Bałwan
// @version      1.0 KTK Edition
// @author       Daniel Rogowski
// @match        https://egzamin-informatyk.pl/testy-sieci-komputerowe/
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        GM.deleteValue
// ==/UserScript==
(async () => {
    'use strict';
    var getAbsoluteUrl = function(url) {
        var a = document.createElement('a');
        getAbsoluteUrl = function(url) {
            a.href = url;
            return a.href;
        }
        return getAbsoluteUrl(url);
    }

    var questions = await GM.getValue("questions", []);
    console.log(questions);

    if(Array.isArray(questions)) {
        console.log("Nie wykryto zapisanych pytań, utworzono nową tablicę");
    }
    else {
        questions = JSON.parse(questions);
        console.log("Wykryto zapisane pytania, zaimportowano tablicę z poprzednimi pytaniami.");
    }


    var tresci = $(".trescE");
    var addedCount = 0;

    for (var i = 0; i < tresci.length; i++) {
        var nextElement = $(tresci.get(i)).next();
        var imageUrl = null;

        if (nextElement.attr("class") == "obrazek")
            imageUrl = getAbsoluteUrl(nextElement.find("img").attr("src"));

        var question = $(".trescE").get(i).innerText;
        var questionRegex = /^[0-9]+\. (.+)$/gm;
        var questionClear = questionRegex.exec(question)[1];

        var answers = [];
        var currentAnswer = null;
        if(imageUrl == null)
            currentAnswer = $(tresci.get(i)).next();
        else
            currentAnswer = $(tresci.get(i)).next().next();

        answers.push(currentAnswer.text());
        answers.push(currentAnswer.next().text());
        answers.push(currentAnswer.next().next().text());
        answers.push(currentAnswer.next().next().next().text());

        var questionID = parseInt(currentAnswer.next().next().next().next().attr("value"));

        if(questions.filter(q => q.id === questionID).length == 0) {
            console.log("Wykryto nieistniejące jeszcze w bazie pytanie, dodaję je do listy (id " + questionID + ")");
            questions.push({
                "id": questionID,
                "question": questionClear,
                "image": imageUrl,
                "answers": answers,
                "correctAnswer": -1
            });
            addedCount++;
        } else {
            console.log("Pytanie o tym ID istnieje już w bazie, pomijam jego dodawanie (id " + questionID + ")");
        }

    }

    console.log("Sortuję listę pytań według ich identyfikatora");
    questions.sort(function(a, b){
        return a.id == b.id ? 0 : +(a.id > b.id) || -1;
    });

    console.log("Ten obieg skryptu wprowadził do bazy tyle nowych pytań: " + addedCount);

    var json = JSON.stringify(questions);
    console.log("Zapisuję plik JSON z pytaniami w pamięci przeglądarki.");
    GM.setValue("questions", json);

    console.log("Plik JSON z pytaniami wygląda teraz tak:");
    console.log(json);

    console.log("Łącznie podczas wszystkich obiegów skryptu zapisano tyle pytań: " + questions.length);

})();