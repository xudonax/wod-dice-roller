document.getElementById("dice-form").addEventListener("submit", rollDice);

function rollDice(e) {
    e.preventDefault();

    const diceResult = document.getElementById("dice-result");
    const rageDice = document.getElementById("ragedice").value;
    const dicePool = document.getElementById("dicepool").value - rageDice;

    const dicePoolResults = getRandomNumbers(dicePool, 1, 10);
    const rageDiceResults = getRandomNumbers(rageDice, 1, 10);

    const allDice = dicePoolResults.concat(rageDiceResults);
    const succesCount = allDice.reduce((a, c) => c >= 6 ? a + 1 : a, 0);

    if (succesCount == 1)
        document.getElementById("text-result").innerText = "1 succes";
    else
        document.getElementById("text-result").innerText = succesCount + " successes";

    renderImageResults(dicePoolResults, rageDiceResults);

    diceResult.innerText = "Dice: " + dicePoolResults + "\nRage: " + rageDiceResults;
}

function getRandomNumbers(count, min, max) {
    const array = new Array(count);

    for (let i = 0; i < count; i++) {
        array[i] = Math.floor(Math.random() * (max - min + 1) + min);
    }

    return array;
}

function renderImageResults(dicePoolResults, rageDiceResults) {
    const dicePoolTarget = document.getElementById("dicepool-results");
    const rageDiceTarget = document.getElementById("ragedice-results");

    const dicePoolCriticalSuccess = dicePoolResults.reduce((a, c) => c === 10 ? a + 1 : a, 0);
    const dicePoolSuccess = dicePoolResults.reduce((a, c) => 6 <= c && c<= 9 ? a + 1 : a, 0);
    const dicePoolFailures = dicePoolResults.reduce((a, c) => c <= 5 ? a + 1 : a, 0);

    const rageDiceCriticalSuccess = rageDiceResults.reduce((a, c) => c === 10 ? a + 1 : a, 0);
    const rageDiceSuccess = rageDiceResults.reduce((a, c) => 6 <= c && c <= 9 ? a + 1 : a, 0);
    const rageDiceFailures = rageDiceResults.reduce((a, c) => 3 <= c && c <= 5 ? a + 1 : a, 0);
    const rageDiceCriticalFailures = rageDiceResults.reduce((a, c) => c <= 2 ? a + 1 : a, 0);

    let dicePoolArray = new Array();
    let rageDiceArray = new Array();

    dicePoolArray = dicePoolArray.concat(createImageElements("images/wta/critical-success.webp", dicePoolCriticalSuccess));
    dicePoolArray = dicePoolArray.concat(createImageElements("images/wta/success.webp", dicePoolSuccess));
    dicePoolArray = dicePoolArray.concat(createImageElements("images/wta/failure.webp", dicePoolFailures));

    dicePoolTarget.replaceChildren(...dicePoolArray);

    rageDiceArray = rageDiceArray.concat(createImageElements("images/wta/critical-success-red.webp", rageDiceCriticalSuccess));
    rageDiceArray = rageDiceArray.concat(createImageElements("images/wta/success-red.webp", rageDiceSuccess));
    rageDiceArray = rageDiceArray.concat(createImageElements("images/wta/failure-red.webp", rageDiceFailures));
    rageDiceArray = rageDiceArray.concat(createImageElements("images/wta/critical-failure-red.webp", rageDiceCriticalFailures));

    rageDiceTarget.replaceChildren(...rageDiceArray);
}

function createImageElements(src, count) {
    const imageElements = new Array();

    for (let i = 0; i < count; i++) {
        let img = document.createElement("img");
        img.src = src;
        imageElements.push(img);
    }

    return imageElements;
}