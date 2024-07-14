document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('recipe-form');
    const recipeList = document.getElementById('recipe-list');

    // Load recipes from localStorage
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const ingredients = document.getElementById('ingredients').value.split(',').map(item => item.trim());

        const recipe = { id: Date.now(), name, ingredients };
        recipes.push(recipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        displayRecipe(recipe);
        form.reset();
    });

    function fetchRecipes() {
        recipes.forEach(recipe => displayRecipe(recipe));
    }

    function displayRecipe(recipe) {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${recipe.name}</strong>
            <p>${recipe.ingredients.join(', ')}</p>
            <button onclick="deleteRecipe(${recipe.id})">Delete</button>
        `;
        li.setAttribute('data-id', recipe.id);
        recipeList.appendChild(li);
    }

    window.deleteRecipe = (id) => {
        recipes = recipes.filter(recipe => recipe.id !== id);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        const li = document.querySelector(`[data-id='${id}']`);
        li.remove();
    }

    fetchRecipes();
});
