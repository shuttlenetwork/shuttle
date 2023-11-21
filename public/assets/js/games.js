document.getElementById("search").addEventListener("input", e => {
	var searchValue = e.target.value.toLowerCase();
	var games = document.querySelectorAll(".game");
	games.forEach(game => {
		var gameTitle = game.querySelector("h2").textContent.toLowerCase();
		if (gameTitle.includes(searchValue)) {
			game.style.display = "";
		} else {
			game.style.display = "none";
		}
	});
});

document.querySelectorAll(".game").forEach(button => {
	button.addEventListener("click", function () {
		const url = this.getAttribute("data-href");
		location.href = encodeUVUrlWithPath(url);
	});
});