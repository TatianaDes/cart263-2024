let mainHeading = document.getElementById(`main-heading`);

window.addEventListener(`offline`, function (event) {
    mainHeading.innerText = `:(`;
});
