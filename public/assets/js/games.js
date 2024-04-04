
document.querySelectorAll(".btn").forEach(button => {
	button.addEventListener("click", function () {
		const url = this.getAttribute("data-href");
		go(url);
	});
});