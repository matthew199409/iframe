document.addEventListener("DOMContentLoaded", () => {
  // Select the <h2> element using its class
  const greeting = document.querySelector(".Hello");

  // Define the two text options
  const textOptions = [
    "Hi Aubri!!!",
    "Hi Chloe!!!",
    "Hi Ev!!!",
    "Hi Jasmine!!!",
    "Hi Kinsley!!!",
  ];
  let currentIndex = 0; // Start with the first text option

  // Add a click event listener to the <h2> element
  greeting.addEventListener("click", () => {
    // Toggle the text content
    currentIndex = (currentIndex + 1) % textOptions.length; // Switch between 0 and 1
    greeting.textContent = textOptions[currentIndex];

    // Optionally, change the text color dynamically
    greeting.style.color = currentIndex === 0 ? "blue" : "green";
    // Optionally, change the font size dynamically
    greeting.style.fontSize = currentIndex === 0 ? "30px" : "40px";
    // Optionally, change the font weight dynamically
    greeting.style.fontWeight = currentIndex === 0 ? "normal" : "bold";
    // Optionally, change the background color dynamically
    greeting.style.backgroundColor =
      currentIndex === 0 ? "lightblue" : "lightgreen";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Card Matching Game Logic
  const gameBoard = document.getElementById("game-board");

  // Define the card values (5 pairs)
  const cardValues = ["🐰", "🐻", "🐶", "🐱", "🦊"];
  const cards = [...cardValues, ...cardValues]; // Duplicate for pairs

  // Shuffle the cards
  cards.sort(() => Math.random() - 0.5);

  // Create the cards
  cards.forEach((value) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = value;
    card.textContent = "?"; // Hidden initially
    gameBoard.appendChild(card);
  });

  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;

  // Add click event listener to each card
  gameBoard.addEventListener("click", (e) => {
    const clickedCard = e.target;

    // Ignore clicks on matched cards or if the board is locked
    if (
      !clickedCard.classList.contains("card") ||
      clickedCard.classList.contains("matched") ||
      lockBoard
    ) {
      return;
    }

    // Flip the card
    clickedCard.classList.add("flipped");
    clickedCard.textContent = clickedCard.dataset.value;

    if (!firstCard) {
      // First card flipped
      firstCard = clickedCard;
    } else if (!secondCard) {
      // Second card flipped
      secondCard = clickedCard;

      // Check for a match
      if (firstCard.dataset.value === secondCard.dataset.value) {
        // Match found
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        firstCard = null;
        secondCard = null;
      } else {
        // No match, lock the board and flip back after a delay
        lockBoard = true;
        setTimeout(() => {
          firstCard.classList.remove("flipped");
          secondCard.classList.remove("flipped");
          firstCard.textContent = "?";
          secondCard.textContent = "?";
          firstCard = null;
          secondCard = null;
          lockBoard = false;
        }, 1000);
      }
    }
  });
});
