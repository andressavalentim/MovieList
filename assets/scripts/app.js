const addMovieModal = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');
const backDrop = document.getElementById('backdrop'); 
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = addMovieModal.querySelector('.btn--success');
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];


const updateUi = () => {
    if(movies.length === 0) {
        entryTextSection.style.display = 'block';

    } else {
        entryTextSection.style.display = 'none';

    }
};


const renderNewMovie = (id, title, imageUrl, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
        <div class="movie-element__image"> 
         <img src="${imageUrl}" alt="${title}">
        </div>
        <div class="movie-element__info">
        <h2>${title} </h2>
        <p>${rating}/ 5stars </p>
        <p>${id}</p>
        </div>
    `;
    newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id))
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovieElement);
    console.log(id)
};

const deleteMovie = movieId => {
     let movieIndex = 0;
    for (const movie of movies) {
        if (movie.id === movieId) {
            break;
        }
        movieIndex++;
    }
    console.log(movieIndex);
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
    closeMovieDeletionModal();
    updateUi();

}

const deleteMovieHandler = (movieId) => {
    deleteMovieModal.classList.add('visible');
    toggleBackDrop();

    const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
    let confirmDeleteButton = deleteMovieModal.querySelector('.btn--danger');
    
    confirmDeleteButton.replaceWith(confirmDeleteButton.cloneNode(true));
    confirmDeleteButton = deleteMovieModal.querySelector('.btn--danger');

    cancelDeletionButton.removeEventListener('click', closeMovieDeletionModal);
    cancelDeletionButton.addEventListener('click', closeMovieDeletionModal);
    confirmDeleteButton.addEventListener('click', deleteMovie.bind(null, movieId));
};

const closeMovieDeletionModal = () =>{
    toggleBackDrop();
    deleteMovieModal.classList.remove('visible');
}

const closeMovieModal = () => {
    addMovieModal.classList.remove('visible');
    toggleBackDrop();

};

const showMovieModal = () => {
    addMovieModal.classList.add('visible');
    toggleBackDrop();
};

const toggleBackDrop = () => {
    backDrop.classList.toggle('visible');
    
};

const backdropClickHander = () => {
    closeMovieModal();
    closeMovieDeletionModal();
    toggleBackDrop();
    clearMovieInput();
};

const clearMovieInput = () => {
    for (const usrInput of userInputs) {
        usrInput.value = '';
    }
};

const cancelAddMovieHandler = () => {
    closeMovieModal();
    clearMovieInput();
}

const addMovieHandler = () => {

    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if(titleValue.trim() === '' || imageUrlValue.trim() === '' || ratingValue === '' || ratingValue < 1 ||  ratingValue > 5) {
        alert('please enter valid values');
    }
    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image : imageUrlValue,
        rating : ratingValue
    };
    movies.push(newMovie);
    closeMovieModal();
    clearMovieInput();
    renderNewMovie(newMovie.id, newMovie.title, newMovie.image, newMovie.rating)
    updateUi();
    
}

startAddMovieButton.addEventListener('click', showMovieModal);
backDrop.addEventListener('click', backdropClickHander);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);
