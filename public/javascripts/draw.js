$( document ).ready(function() {
    setInfoDiv();
});


const timeAnimation = 100;
const numberOfRun = 100;

let currentRun;

function startDraw() {
    $("#result").html("");
    $("#selected").html("");

    currentRun = numberOfRun;
    let interval = setInterval(()=>{
        $("#selected").html(getHtmlOfUser(users[randBetween(users.length)]));
        currentRun--;

        if (currentRun <= 0) {
            clearInterval(interval);
            setTimeout(selectWinner, timeAnimation);
        }
    }, timeAnimation);

    return false;
}

function selectWinner() {
    let winner = randBetween(users.length);

    $("#selected").html(getHtmlOfUser(users[winner]));
    $("#result").html("והמנצח הוא: " + getHtmlOfUser(users[winner]));
}

function setInfoDiv() {
    let html = "";

    html += users.length + " משתמשים משתתפים בהגרלה" + "<br>";
    html += '<div id="users">';

    for (let user of users) {
        html += getHtmlOfUser(user);
    }

    html += "</div>";

    $("#info").html(html);
}

function getHtmlOfUser(user) {
    return "<div class=\"user\">\n" +
        "    <img class=\"img\" src=\"" + user.img + "\">\n" +
        "    <div class=\"name\">" + user.name + "</div>\n" +
        "  </div>";
}

function randBetween(max) {
    return Math.floor(Math.random() * max);
}