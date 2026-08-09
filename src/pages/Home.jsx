import { useState } from "react";
import Hero from "../components/Hero";
import GameCard from "../components/GameCard";
import games from "../data/games";

   
function Home() {
     const[ search, setSearch] =useState("");
     const [category, setCategory] = useState("All");
     const [sortBy, setSortBy] = useState("default");
     const [favorites, setFavorites] = useState([]);
     const [showFavorites, setShowFavorites] = useState(false);


 const filteredGames = games.filter((game) => {
     const matchSearch = game.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
     category === "All" || game.category === category;

     return matchSearch && matchCategory;
   });  

     let sortedGames = [...filteredGames];
      if (sortBy=== "lowToHigh") {
        sortedGames.sort((a,b) => Number(a.price) - Number(b.price));
      }
      if (sortBy === "highToLow") {
        sortedGames.sort((a,b) => Number(b.price) - Number(a.price));
      }
      if (sortBy === "aToZ") {
        sortedGames.sort((a,b) => a.name.localeCompare(b.name));
      }
      if (sortBy === "zToA") {
        sortedGames.sort((a,b) => b.name.localeCompare(a.name));
      } 

      const displayGames = showFavorites
      ? sortedGames.filter((game) => favorites.includes(game.id))
      : sortedGames;

       function toggleFavorites(id) {
          console.log("Clicked:", id);
          console.log("Favorites Before:", favorites);

        if(favorites.includes( id)) { 
     
          setFavorites(
            favorites.filter((item) => item !==  id)
          );  
         } else {

          setFavorites(
            [ ...favorites,id]
          );
        }
       }

      return (
        <>
          <Hero />
          
          <div className="search-container">
           <input
                  className="search-box"
                  type="text"
                  placeholder="🔍 Search your favorite games..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                 />

           <button
                    className="clear-btn"
                    onClick={() => setSearch("")}
>
                    Clear Search
                </button>
          </div>
          <div className="category-button">
              <button onClick={() => setCategory("All")}>All</button>
              <button onClick={() => setCategory("Action")}>Action</button>
              <button onClick={() => setCategory("Racing")}>Racing</button>
              <button onClick={() => setCategory("RPG")}>RPG</button>
              <button onClick={() => setCategory("Fighting")}>Fighting</button>
         
        </div>

        <div className="sort-container">
        <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="lowToHigh">Price: low → High </option>
          <option value="highToLow">Price: High → Low</option>
          <option value="aToZ">Name: A → Z</option>
          <option value="zToA">Name: Z →  A</option>

        </select>
       </div>
          <div className="favorites-filter">
            <button onClick={() => setShowFavorites (false)}>
                   🎮  All Games
               </button>
            <button onClick={() => setShowFavorites(true)}>
                   ❤️ Favorites
                </button>   
          </div>

           <div className="games">
         {displayGames.length > 0 ? (
           displayGames.map((game) => ( 
             <GameCard
               key={game.name}
               name={game.name}
               description={game.description}
               rating={game.rating}
               price={game.price}
               category={game.category}
               players={game.players}
               gameId={game.id}
               toggleFavorites={toggleFavorites}
               isFavorite={favorites.includes(game.id)}
               />
           ))
         ) : (
           <h2>No Games Found</h2>
         )}
       </div>
       </>   
    );      
}   
export default Home