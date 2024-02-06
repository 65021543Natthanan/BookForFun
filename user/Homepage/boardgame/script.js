// script.js

const boardGames = [
    { name: 'บอร์ดเกม 1', category: 'สยามบอร์ดเกม' },
    { name: 'บอร์ดเกม 2', category: 'Euro Games' },
    { name: 'บอร์ดเกม 3', category: 'แบคเกมมายา' },
    // เพิ่มบอร์ดเกมเพิ่มเติมตามต้องการ
];

function searchBoardGame() {
    const searchTerm = document.getElementById('boardGameName').value.toLowerCase();
    const filteredGames = boardGames.filter(game => game.name.toLowerCase().includes(searchTerm));
    displayBoardGames(filteredGames);
}

function filterByCategory(category) {
    const filteredGames = boardGames.filter(game => game.category === category);
    displayBoardGames(filteredGames);

    // เพิ่ม/ลบ class "selected" ของลิงก์หมวดหมู่
    const categoryLinks = document.querySelectorAll('.categories a');
    categoryLinks.forEach(link => {
        link.classList.remove('selected');
        if (link.textContent === category) {
            link.classList.add('selected');
        }
    });
}

function displayBoardGames(games) {
    const boardGamesContainer = document.getElementById('boardGamesContainer');
    boardGamesContainer.innerHTML = '';

    games.forEach(game => {
        const gameElement = document.createElement('div');
        gameElement.className = 'board-game';
        gameElement.innerHTML = `
            <h3>${game.name}</h3>
            <p>Category: ${game.category}</p>
        `;
        boardGamesContainer.appendChild(gameElement);
    });
}
