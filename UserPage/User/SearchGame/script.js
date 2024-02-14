document.addEventListener('DOMContentLoaded', () => {
    fetchGameData();
});

function fetchGameData() {
    // Make a GET request to the server
    fetch('/api/games')
        .then(response => response.json())
        .then(data => {
            // Handle the results (e.g., update the UI)
            console.log(data);
            createGameCards(data);
        })
        .catch(error => console.error('Error:', error));
}

function createGameCards(data) {
    const gameCardsElement = document.getElementById('gameCards');
    gameCardsElement.innerHTML = '';

    data.forEach(game => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.innerHTML = `
            <img src="${game.G_image}" alt="${game.G_nameTH}">
            <h3>ชื่อ: ${game.G_nameTH}</h3>
            <p>Name: ${game.G_nameEN}</p>
            <p>ประเภท: ${game.G_type}</p>
            <p>ความยาก: ${game.G_lv}</p>
            <p>ระยะเวลาต่อรอบโดยประมาณ ${game.G_timeavg} นาที</p>
        `;
        gameCardsElement.appendChild(cardElement);
    });
}

document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const searchTerm = document.getElementById('searchTerm').value;
    const response = await fetch(`/search?term=${searchTerm}`);
    const data = await response.json();
    displayResults(data);
  });

  function displayResults(results) {
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = '';

    if (results.length === 0) {
      resultsDiv.innerHTML = 'No results found.';
    } else {
      results.forEach(result => {
        const resultDiv = document.createElement('div');
        resultDiv.textContent = JSON.stringify(result);
        resultsDiv.appendChild(resultDiv);
      });
    }
  }