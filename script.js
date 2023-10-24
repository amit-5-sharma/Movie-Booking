const movies = [
  {
      id: 1,
      title: "Sniper: G.R.I.T.",
      genre: "Action",
      description: "Description of Movie 1",
      price: 10,
      imageUrl: "./Movie 1.avif",

  },
  {
      id: 2,
      title: "Fukre 3",
      genre: "Comedy",
      description: "Description of Movie 2",
      price: 12,
      imageUrl: "./Movie 2.avif",
  },
  {
      id: 3,
      title: "Mission Raniganj",
      genre: "Drama",
      description: "Description of Movie 3",
      price: 15,
      imageUrl: "./Movie 3.avif",
  },
  {
      id: 4,
      title: "Jawan",
      genre: "Action",
      description: "Description of Movie 4",
      price: 10,
      imageUrl: "./Movie 4.avif",
  },
  {
      id: 5,
      title: "Ganapath",
      genre: "Comedy",
      description: "Description of Movie 5",
      price: 12,
      imageUrl: "./Movie 5.avif",
  },
  {
      id: 6,
      title: "Yaariyan 2",
      genre: "Drama",
      description: "Description of Movie 6",
      price: 15,
      imageUrl: "./Movie 6.avif"
  },
  {
      id: 7,
      title: "Ghost",
      genre: "Action",
      description: "Description of Movie 7",
      price: 10,
      imageUrl: "./Movie 7.avif",
  },
  {
      id: 8,
      title: "Bhagavanth Kesari",
      genre: "Comedy",
      description: "Description of Movie 8",
      price: 12,
      imageUrl: "./Movie 8.avif",
  },
  {
      id: 9,
      title: "Avatar",
      genre: "Drama",
      description: "Description of Movie 9",
      price: 15,
      imageUrl: "./Movie 9.avif",
  },
  {
      id: 10,
      title: "RRR",
      genre: "Action",
      description: "Description of Movie 10",
      price: 10,
      imageUrl: "./Movie 10.avif",
  },
  {
      id: 11,
      title: "Spider-Man",
      genre: "Comedy",
      description: "Description of Movie 11",
      price: 12,
      imageUrl: "./Movie 11.avif",
  },
  {
      id: 12,
      title: "Brahmastra",
      genre: "Drama",
      description: "Description of Movie 12",
      price: 15,
      imageUrl: "./Movie 12.avif",
  },
  {
      id: 13,
      title: "The Nun II",
      genre: "Action",
      description: "Description of Movie 13",
      price: 10,
      imageUrl: "./Movie 13.avif",
  },
  {
      id: 14,
      title: "Dhak Dhak",
      genre: "Comedy",
      description: "Description of Movie 14",
      price: 12,
      imageUrl: "./Movie 15.avif"
  },
  {
      id: 15,
      title: "Bagha Jatin",
      genre: "Drama",
      description: "Description of Movie 15",
      price: 15,
      imageUrl: "./Movie 14.avif",
  },
  {
    id: 16,
    title: "Kannur Squad",
    genre: "Drama",
    description: "Description of Movie 15",
    price: 15,
    imageUrl: "./Movie 16.avif",
},
  
  // Add more movie data here
];


const movieList = document.querySelector(".movie-list");
const searchInput = document.getElementById("search");
const genreSelect = document.getElementById("genre-select");

function filterMoviesByGenre(genre) {
    if (!genre) {
        return movies;
    }
    return movies.filter((movie) => movie.genre === genre);
}

function displayMovies(movieArray) {
    movieList.innerHTML = "";
    movieArray.forEach((movie) => {
        const movieItem = document.createElement("div");
        movieItem.classList.add("movie-item");
        movieItem.innerHTML = `
            <img src="${movie.imageUrl}" alt="${movie.title}" style="width: 300px; height: 350px; margin: 0; margin-bottom: 10px; padding: 0; justify-content:center;">
            <h2>${movie.title}</h2>
            <p>Genre: ${movie.genre}</p>
            <button class="show-details" data-id="${movie.id}">Show Details</button>
        `;
        movieList.appendChild(movieItem);
    });
}


searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm)
    );
    displayMovies(filteredMovies);
});

genreSelect.addEventListener("change", () => {
    const selectedGenre = genreSelect.value;
    const filteredMovies = filterMoviesByGenre(selectedGenre);
    displayMovies(filteredMovies);
});

movieList.addEventListener("click", (event) => {
    if (event.target.classList.contains("show-details")) {
        const movieId = event.target.dataset.id;
        const selectedMovie = movies.find((movie) => movie.id == movieId);

        const movieDetailsPopup = document.createElement("div");
        movieDetailsPopup.classList.add("movie-details-popup");

        const updateTotalPrice = () => {
            const quantityInput = document.getElementById("quantity");
            const totalPriceElement = document.querySelector(".total-price");
            const quantity = parseInt(quantityInput.value, 10);

            if (!isNaN(quantity) && quantity >= 1) {
                const totalPrice = selectedMovie.price * quantity;
                totalPriceElement.textContent = `Total Price: $${totalPrice}`;
            }
        };

        movieDetailsPopup.innerHTML = `
            <div class="movie-details-popup-content">
                <div class="details">
                    <h1>Movie Details of ${selectedMovie.title}</h1>
                    <p>Genre: ${selectedMovie.genre}</p>
                    <p>Description: ${selectedMovie.description}</p>
                    <p>Price: $${selectedMovie.price}</p>
                    <label for="quantity">Quantity:</label>
                    <input type="number" id="quantity" value="1" min="1">
                    <!-- Display the total price here -->
                    <p class="total-price">Total Price: $${selectedMovie.price}</p>
                    <a href="./checkout.html">
                        <button class="book-now-button" data-id="${selectedMovie.id}">Book Tickets</button>
                    </a>
                    <button class="close-popup">Close</button>
                </div>
                <div class="details">
                    <img src="${selectedMovie.imageUrl}" alt="${selectedMovie.title}">
                </div>
            </div>
        `;

        const closePopupButton = movieDetailsPopup.querySelector(".close-popup");
        closePopupButton.addEventListener("click", () => {
            movieDetailsPopup.remove();
        });

        const quantityInput = movieDetailsPopup.querySelector("#quantity");
        quantityInput.addEventListener("input", updateTotalPrice);

        const bookNowButton = movieDetailsPopup.querySelector(".book-now-button");
        bookNowButton.addEventListener("click", () => {
            const quantity = parseInt(quantityInput.value, 10);
            if (isNaN(quantity) || quantity <= 0) {
                alert("Please enter a valid quantity.");
            } else {
            
            }
            movieDetailsPopup.remove();
        });

        document.body.appendChild(movieDetailsPopup);
    }
});
document.addEventListener("DOMContentLoaded", function() {
    const movies = [
        {
            id: 10,
            title: "RRR",
            genre: "Action",
            description: "Description of Movie 10",
            price: 10,
            imageUrl: "./Movie 10.avif",
        },
        {
            id: 2,
            title: "Fukre 3",
            genre: "Comedy",
            description: "Description of Movie 2",
            price: 12,
            imageUrl: "./Movie 2.avif",
        },
        {
            id: 4,
            title: "Jawan",
            genre: "Action",
            description: "Description of Movie 4",
            price: 10,
            imageUrl: "./Movie 4.avif",
        },
        {
            id: 3,
            title: "Mission Raniganj",
            genre: "Drama",
            description: "Description of Movie 3",
            price: 15,
            imageUrl: "./Movie 3.avif",
        },
        {
            id: 8,
            title: "Bhagavanth Kesari",
            genre: "Comedy",
            description: "Description of Movie 8",
            price: 12,
            imageUrl: "./Movie 8.avif",
        },
        {
            id: 14,
            title: "Dhak Dhak",
            genre: "Comedy",
            description: "Description of Movie 14",
            price: 12,
            imageUrl: "./Movie 15.avif"
        },
        {
            id: 13,
            title: "The Nun II",
            genre: "Action",
            description: "Description of Movie 13",
            price: 10,
            imageUrl: "./Movie 13.avif",
        },
        {
            id: 5,
            title: "Ganapath",
            genre: "Comedy",
            description: "Description of Movie 5",
            price: 12,
            imageUrl: "./Movie 5.avif",
        },
        {
            id: 12,
            title: "Brahmastra",
            genre: "Drama",
            description: "Description of Movie 12",
            price: 15,
            imageUrl: "./Movie 12.avif",
        },
    ];

    const openPopupButtons = document.querySelectorAll('.show-details1');

    openPopupButtons.forEach((button) => {
        button.addEventListener("click", function() {
            const movieId = button.getAttribute("data-id");
            const selectedMovie = movies.find((movie) => movie.id == movieId);

            const movieDetailsPopup = document.createElement("div");
            movieDetailsPopup.classList.add("movie-details-popup");
            movieDetailsPopup.innerHTML = `
                <div class="movie-details-popup-content">
                    <div class="details">
                        <h1>Movie Details of ${selectedMovie.title}</h1>
                        <p>Genre: ${selectedMovie.genre}</p>
                        <p>Description: ${selectedMovie.description}</p>
                        <p>Price: $${selectedMovie.price}</p>
                        <label for="quantity">Quantity:</label>
                        <input type="number" id="quantity" value="1" min="1">
                        <!-- Display the total price here -->
                        <p class="total-price">Total Price: $${selectedMovie.price}</p>
                        <a href="./checkout.html">
                            <button class="book-now-button" data-id="${selectedMovie.id}">Book Tickets</button>
                        </a>
                        <button class="close-popup">Close</button>
                    </div>
                    <div class="details">
                        <img src="${selectedMovie.imageUrl}" alt="${selectedMovie.title}">
                    </div>
                </div>
            `;

            const closePopupButton = movieDetailsPopup.querySelector(".close-popup");
            closePopupButton.addEventListener("click", function() {
                movieDetailsPopup.remove();
            });

            const quantityInput = movieDetailsPopup.querySelector("#quantity");
            const totalPriceElement = movieDetailsPopup.querySelector(".total-price");

            const updateTotalPrice = () => {
                const quantity = parseInt(quantityInput.value, 10);
                if (!isNaN(quantity) && quantity >= 1) {
                    const totalPrice = selectedMovie.price * quantity;
                    totalPriceElement.textContent = `Total Price: $${totalPrice}`;
                }
            };

            quantityInput.addEventListener("input", updateTotalPrice);

            document.body.appendChild(movieDetailsPopup);
        });
    });
});

displayMovies(movies); 


