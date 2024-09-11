document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('search-form');
    const searchResults = document.getElementById('search-results');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const searchTerm = this.querySelector('input').value.trim();
        
        if (searchTerm) {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
                const data = await response.json();

                if (data.meals) {
                    displayResults(data.meals);
                } else {
                    displayMessage("No meals found matching your search.");
                }
            } catch (error) {
                console.error('Error:', error);
                displayMessage("An error occurred while searching.");
            }
        }
    });

    function displayResults(meals) {
        searchResults.innerHTML = '';
        searchResults.style.display = 'block';

        meals.forEach(meal => {
            const card = document.createElement('div');
            card.className = 'col';

            card.innerHTML = `
                <div class="card">
                    <img src="${meal.strMealThumb}" alt="Image of ${meal.strMeal}">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.slice(0, 200)}...</p>
                        <a href="${meal.strYoutube}" target="_blank" class="btn btn-primary">Watch Video</a>
                    </div>
                </div>
            `;

            searchResults.appendChild(card);
        });
    }

    function displayMessage(message) {
        searchResults.style.display = 'block';
        searchResults.innerHTML = `<div class="alert alert-info">${message}</div>`;
    }
});
