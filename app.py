from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# In-memory database (for simplicity)
recipes = []

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/recipes', methods=['GET'])
@app.route('/recipes/<int:recipe_id>', methods=['GET'])
def get_recipes(recipe_id=None):
    if recipe_id is not None:
        for recipe in recipes:
            if recipe['id'] == recipe_id:
                return jsonify(recipe), 200
        return jsonify({"message": "Recipe not found"}), 404
    return jsonify(recipes), 200

@app.route('/recipes', methods=['POST'])
def add_recipe():
    data = request.get_json()
    recipe_id = len(recipes) + 1
    data['id'] = recipe_id
    recipes.append(data)
    return jsonify(data), 201

@app.route('/recipes/<int:recipe_id>', methods=['PUT'])
def update_recipe(recipe_id):
    data = request.get_json()
    for recipe in recipes:
        if recipe['id'] == recipe_id:
            recipe.update(data)
            return jsonify(recipe), 200
    return jsonify({"message": "Recipe not found"}), 404

@app.route('/recipes/<int:recipe_id>', methods=['DELETE'])
def delete_recipe(recipe_id):
    global recipes
    recipes = [recipe for recipe in recipes if recipe['id'] != recipe_id]
    return jsonify({"message": "Recipe deleted"}), 200

if __name__ == '__main__':
    app.run(debug=True)
