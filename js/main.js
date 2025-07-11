const countError = document.getElementById("count-error");
const restartButton = document.getElementById("restart");
const victoryMessage = document.getElementById("victory-message");
const cells = document.querySelectorAll(".cell");

const symbols = [
  "images/alien.png",
  "images/alien.png",
  "images/bug.png",
  "images/bug.png",
  "images/duck.png",
  "images/duck.png",
  "images/rocket.png",
  "images/rocket.png",
  "images/spaceship.png",
  "images/spaceship.png",
];
let flippedCards = [];
console.log(symbols);

// Mescola i simboli una volta all'inizio
shuffleSymbols();

// Primo ciclo: associa ad ogni cella il suo simbolo
document.querySelectorAll(".cell").forEach((cell, index) => {
  cell.dataset.symbol = symbols[index];
  // ora ogni cella ha un "dataset" nascosto con il simbolo corrispondente
});

document.querySelectorAll(".cell").forEach((cell, index) => {
  cell.dataset.symbol = symbols[index];

  cell.addEventListener("click", () => {
    // evita di cliccare due volte la stessa carta
    if (flippedCards.includes(cell)) return;

    // mostra l'immagine
    cell.querySelector("img").src = cell.dataset.symbol;
    flippedCards.push(cell);

    // controlla se hai cliccato due carte
    if (flippedCards.length === 2) {
      checkMatch(flippedCards[0], flippedCards[1]);
      flippedCards = [];
    }
  });
});

// Funzione per mescolare l'array dei symboly

function shuffleSymbols() {
  for (let i = symbols.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [symbols[i], symbols[j]] = [symbols[j], symbols[i]];
  }
}

// Funzione per nascondere i simboli
function hideSymbols() {
  document.querySelectorAll(".cell img").forEach((img) => {
    img.src = "images/back.png";
  });
}

// Funzione per controllare se due simboli sono uguali
function checkMatch(cell1, cell2) {
  if (cell1.dataset.symbol === cell2.dataset.symbol) {
    cell1.style.pointerEvents = "none";
    cell2.style.pointerEvents = "none";

    cell1.classList.add("matched");
    cell2.classList.add("matched");

    // Se vengono trovati tutti i simboli uguali
    if (document.querySelectorAll(".matched").length === symbols.length) {
      victoryMessage.textContent = "Hai vinto!";
      restartButton.classList.remove("d-none");
      restartButton.addEventListener("click", () => {
        restartGame();
        victoryMessage.textContent = "";
        restartButton.classList.add("d-none");
      });
    }
  } else {
    cell1.classList.add("shake");
    cell2.classList.add("shake");

    setTimeout(() => {
      cell1.classList.remove("shake");
      cell2.classList.remove("shake");

      errorCount();

      cell1.querySelector("img").src = "images/back.png";
      cell2.querySelector("img").src = "images/back.png";
    }, 500);
  }
}

// Funzione per aggiornare il conteggio degli errori
function errorCount() {
  const currentCount = parseInt(countError.textContent);
  countError.textContent = currentCount + 1;
  countError.classList.add("error");
  setTimeout(() => {
    countError.classList.remove("error");
  }, 1000);
}

// Funzione per ricominciare la partita
function restartGame() {
  hideSymbols();
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.style.pointerEvents = "auto";
    cell.classList.remove("matched");
  });
  countError.textContent = 0;
  flippedCards = [];
  shuffleSymbols();
}
