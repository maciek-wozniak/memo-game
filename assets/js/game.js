$().ready(function () {

    var symbols = ["&#9824;", "&#9728;", "&#9731;", "&#9742;", "&#9749;", "&#9773;", "&#9774;", "&#9775;", "&#9818;", "&#9873;"];

    // animacja usuwajaca karty
    // dodawanie symboli nowych

    var attempNumber = 0;
    var openedCard;
    var cardsOnTable;
    initTable();

       function initTable() {
        cardsOnTable = symbols.length;
        var displayed = [];
        var secondCardDisplayed = [];

        for (i = 0; i < symbols.length * 2; i++) {

            var id = randomCardSymbol(symbols.length);
            while (!(typeof displayed[id] === "undefined" || typeof secondCardDisplayed[id] === "undefined")) {
                id = randomCardSymbol(symbols.length);
            }

            var cardNumber = "first";
            if (displayed && secondCardDisplayed[id] == null) {
                secondCardDisplayed[id] = true;
                cardNumber = "second";
            }
            else {
                displayed[id] = true;
            }

            var div = "<div class='card' data-id='" + id + "' data-number='" + cardNumber + "'>"
                + "<div class='bottom'>" + symbols[id] + "</div>"
                + "<div class='top'></div>"
                + "</div>";

            $("#game-scene").append(div);

        }

        $(".card").click(function () {
            attempNumber++;

            if (attempNumber > 2) {
                return true;
            }

            var cardNumber = $(this).data("number");
            var cardId = $(this).data("id");

            if (attempNumber == 1) {
                openedCard = [cardId, cardNumber];
                openCard($(this));
            }
            else if (openedCard[0] == cardId && openedCard[1] == cardNumber) {
                attempNumber--;
            }
            else {
                openCard($(this));
                var secondCard = [cardId, cardNumber];

                setTimeout(function () {
                    checkPairedCards(openedCard, secondCard);
                }, 1300);
            }
        });
    }

    function randomCardSymbol(max) {
        return Math.floor( (Math.random() * max) );
    }

    function openCard(card) {
        $(card).find(".bottom").addClass("rotate");
        $(card).find(".top").addClass("rotate");
    }

    function closeCard(card) {
        $(card).find(".bottom").removeClass("rotate");
        $(card).find(".top").removeClass("rotate");
    }

    function checkPairedCards(firstCard, secondCard) {
        var card1 = $("div[data-id=" + firstCard[0] + "][data-number=" + firstCard[1] + "]");
        var card2 = $("div[data-id=" + secondCard[0] + "][data-number=" + secondCard[1] + "]");

        if (firstCard[0] == secondCard[0]) {
            removeCard(card1);
            removeCard(card2);
            cardsOnTable--;
            if (cardsOnTable == 0) {
                setTimeout(function() {win()}, 1000);
            }
        }
        else {
            closeCard(card1);
            closeCard(card2);
        }
        attempNumber = 0;
    }

    function win() {
        $("#game-scene").html("<div class='win'>Wygrałeś!<br/> <button id='newGame'>Zagraj jeszcze raz</button></div>");

        $("#newGame").click(function () {
            $("#game-scene").html("");
            initTable();
        });
    }

    function removeCard(card) {
        var div = "<div class='emptyCard'></div>";
        $(card).addClass("flash");
        setTimeout(function () {
            $(card).removeClass("flash").addClass("remove");
        }, 500);
        setTimeout(function () {
            card.replaceWith(div);
        }, 1000);
    }

});