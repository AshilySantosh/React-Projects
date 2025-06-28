import React, { useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      );

      const data = await res.json();
      console.log(data);

      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
        alert("No recipes found!");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <div className="box">
        <h1>🥘Recipe Book📖</h1>
        <input
          type="text"
          placeholder="Search any recipe..."
          onChange={handleSearch}
        />
        <button type="submit" onClick={handleSubmit}>
          Search
        </button>
      </div>
      <div className="results">
        {loading ? (
          <p className="loading">Loading recipes...</p>
        ) : recipes.length > 0 ? (
          recipes.map((meal) => (
            <div key={meal.idMeal} className="card">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
              />
              <h3>{meal.strMeal}</h3>
              <button><a href={meal.strYoutube} target="_blank">Watch video</a></button>
            </div>
          ))
        ) : (
          <p style={{ color: "#888" }}>Search for a recipe above 👆</p>
        )}
      </div>
    </div>
  );
}

export default App;
