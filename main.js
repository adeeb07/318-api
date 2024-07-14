document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('recipe-form');
    const recipeList = document.getElementById('recipe-list');
    const searchInput = document.getElementById('search');

    // Load recipes from localStorage
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    // Function to display a recipe
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

    // Load recipes from localStorage and display them
    function fetchRecipes() {
        recipes.forEach(recipe => displayRecipe(recipe));
    }

    // Add event listener for form submission
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

    // Function to delete a recipe
    window.deleteRecipe = (id) => {
        recipes = recipes.filter(recipe => recipe.id !== id);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        const li = document.querySelector(`[data-id='${id}']`);
        if (li) {
            li.remove();
        }
    }

    // Function to filter recipes based on search input
    function filterRecipes(query) {
        const filteredRecipes = recipes.filter(recipe => {
            return recipe.name.toLowerCase().includes(query.toLowerCase()) ||
                   recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query.toLowerCase()));
        });

        recipeList.innerHTML = '';
        filteredRecipes.forEach(recipe => displayRecipe(recipe));
    }

    // Event listener for search input
    searchInput.addEventListener('input', (e) => {
        filterRecipes(e.target.value);
    });

    // Initial fetch to load and display recipes
    fetchRecipes();
});
