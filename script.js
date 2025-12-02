let games = [
    { "name": "Retro Bowl", "url": "https://example.com/retro-bowl" },
    { "name": "Basketball Stars", "url": "https://example.com/basketball-stars" },
    { "name": "Fireboy and Watergirl", "url": "https://example.com/fireboy-watergirl" },
    { "name": "Among Us Online", "url": "https://example.com/among-us" }
];

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorEl = document.getElementById('error');

    if(password === "lol2523") {
        openGameHub(username);
    } else {
        errorEl.textContent = "Incorrect password!";
    }
}

function openGameHub(username) {
    const gameWindow = window.open("about:blank", "_blank");

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Game Hub</title>
<style>
body { font-family: sans-serif; background: #222; color: #fff; margin:0; padding:20px; }
h1 { text-align: center; }
#search { width: 100%; padding: 10px; margin-bottom: 20px; border-radius: 5px; border: none; }
.game-list { display: flex; flex-wrap: wrap; gap: 10px; }
.game-item { background: #333; padding: 10px; border-radius: 5px; flex: 1 1 200px; cursor: pointer; text-align: center; }
iframe { width: 100%; height: 80vh; border: none; margin-top: 20px; }
button { padding: 10px; margin-bottom: 10px; border-radius: 5px; border: none; cursor: pointer; background: #ff6600; color: white; }
</style>
</head>
<body>
<h1>Welcome, ${username}!</h1>
<input type="text" id="search" placeholder="Search games..." oninput="filterGames()">
<div class="game-list" id="gameList"></div>
<div id="gameFrameContainer"></div>

<script>
const games = ${JSON.stringify(games)};
function renderGames(filteredGames) {
    const list = document.getElementById('gameList');
    list.innerHTML = '';
    filteredGames.forEach(g => {
        const div = document.createElement('div');
        div.className = 'game-item';
        div.textContent = g.name;
        div.onclick = () => openGame(g);
        list.appendChild(div);
    });
}

function filterGames() {
    const query = document.getElementById('search').value.toLowerCase();
    const filtered = games.filter(g => g.name.toLowerCase().includes(query));
    renderGames(filtered);
}

function openGame(game) {
    const container = document.getElementById('gameFrameContainer');
    container.innerHTML = '<button onclick="goBack()">Back to game list</button>' +
        '<iframe src="' + game.url + '"></iframe>';
}

function goBack() {
    document.getElementById('gameFrameContainer').innerHTML = '';
}

renderGames(games);
</script>
</body>
</html>
    `;
    gameWindow.document.write(htmlContent);
    gameWindow.document.close();
}
