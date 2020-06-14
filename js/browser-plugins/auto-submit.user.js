// ==UserScript==
// @name         AutoFormSubmit
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://egzamin-informatyk.pl/testy-inf02-ee08-sprzet-systemy-sieci/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(function(){window.onbeforeunload = null;}, 10);

    $(document).ready(function(){

    setTimeout(function(){

        $("#sprawdz").click();


    },1);

});

})();