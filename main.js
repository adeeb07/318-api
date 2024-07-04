document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('recipe-form');
    const recipeList = document.getElementById('recipe-list');
    let recipes = [];

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const ingredients = document.getElementById('ingredients').value.split(',').map(item => item.trim());

        const recipe = { id: Date.now(), name, ingredients };
        recipes.push(recipe);
        displayRecipe(recipe);
        form.reset();
    });

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
        const li = document.querySelector(`[data-id='${id}']`);
        li.remove();
    }
});
