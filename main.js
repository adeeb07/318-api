document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('recipe-form');
    const recipeList = document.getElementById('recipe-list');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const ingredients = document.getElementById('ingredients').value.split(',').map(item => item.trim());

        const response = await fetch('https://example.com/api/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, ingredients })
        });

        const recipe = await response.json();
        displayRecipe(recipe);
        form.reset();
    });

    async function fetchRecipes() {
        const response = await fetch('https://example.com/api/recipes');
        const recipes = await response.json();
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

    window.deleteRecipe = async (id) => {
        await fetch(`https://example.com/api/recipes/${id}`, {
            method: 'DELETE'
        });
        const li = document.querySelector(`[data-id='${id}']`);
        li.remove();
    }

    fetchRecipes();
});
