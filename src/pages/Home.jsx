import { useState } from "react";
import Hero from "../components/Hero";
import GameCard from "../components/GameCard";

   
function Home() {
     const[ search, setSearch] =useState("");
     const [category, setCategory] = useState("All");
     const [sortBy, setSortBy] = useState("default");
     const [favorites, setFavorites] = useState([]);
     const [showFavorites, setShowFavorites] = useState(false);

     const games = [
  {
    id: 1,
    name: "GTA V",
    description: "Open World Action Game",
    rating: "⭐⭐⭐⭐⭐",
    price: "2499",
    category: "Action",
    players: "1-30 Players",
  },
     {
      id: 2,
      name: "Minecraft",
      description: "Creative Sandbox Game",
      rating: "⭐⭐⭐⭐⭐",
      price:  "1999" ,
      category: "Action",
      players:  "1-8 Player",
     },
     {
      id: 3,
      name: "Valorant",
      description:  "5v5 Tactical Shooter",
      rating:" ⭐⭐⭐⭐⭐",
      price: "Free",
      category: "Action",
      players:  "10 Player",
     },
     {
      id: 4,
       name:  "Need for Speed",
      description:  "Racing Game",
      rating:   "⭐⭐⭐⭐⭐",
      price:  "1499",
      category: "Racing",
      players:  "1-8 Player",
     },
     {
      id: 5,
      name: "Cyberpunk 2077",
      description:  "Open World RPG",
      rating:   "⭐⭐⭐⭐⭐",
      price:  "899",
      category:   "RPG",
      players:  "1 Player",
     },
    {
      id: 6,
      name: "Red Dead Redemption 2",
      description: "Open World Western Adventur",
      rating:  "⭐⭐⭐⭐⭐",
      price: "2199",
      category:" Action Adventure",
      players: "1 Players",
   },
    {
      id:  7,
      name: "Uncharted 4: A Thief's End",
      description: "Open World Western Adventur",
      rating:  "⭐⭐⭐⭐⭐",
      price: "2499",
      category: "Action Adventure",
      players: "1 Players",
    },
      {
       id: 8, 
        name: "Tekken 8",
        description: "Fighting Game",
        rating: "⭐⭐⭐⭐⭐",
        price: "2499",
        category: "Fighting",
        players: "2 Players",
      },
        {
          id: 9,
          name: "Elden Ring",
          description: "Open World Exploration",
          rating: "⭐⭐⭐⭐⭐",
          price: "3599",
          category: "RPG",
          players: "1 Playess"
        },
          {
            id: 10,
          name: "The Witcher 3: Wild Hunt",
          description: "Open World RPG",
          rating: "⭐⭐⭐⭐⭐",
          price: "1200",
          category: "RPG",
          players: "1 Playess"
          },
      
]
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
              placeholder="🔍Search your favorites games... "
            />

            <button className="clear-btn" 
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