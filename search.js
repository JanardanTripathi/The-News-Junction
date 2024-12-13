import API_KEY from './config.js';  // Importing the API key from config.js

const BASE_URL = 'https://newsapi.org/v2';

// Function to fetch news based on a search query
async function fetchSearchResults(query) {
  try {
    if (query.length === 0) {
      document.getElementById('news-container').innerHTML = '<p>Please enter a search query.</p>';
      return;
    }

    const response = await fetch(`${BASE_URL}/everything?q=${query}&apiKey=${API_KEY}`);
    const data = await response.json();
    displayNews(data.articles);
  } catch (error) {
    console.error('Error fetching search results:', error);
  }
}

// Function to display fetched articles on the page
function displayNews(articles) {
  const container = document.getElementById('news-container');
  if (articles.length > 0) {
    container.innerHTML = articles.map(article => `
      <div class="news-item">
        <h2>${article.title}</h2>
        <img src="${article.urlToImage}" alt="Article Image">
        <p>${article.description}</p>
        <a href="${article.url}" target="_blank">Read More</a>
      </div>
    `).join('');
  } else {
    container.innerHTML = '<p>No articles found. Try a different search.</p>';
  }
}

// Event listener for the search bar to trigger fetchSearchResults
document.getElementById('search-bar').addEventListener('input', (event) => {
  const query = event.target.value;
  fetchSearchResults(query);
});

// Event listeners for footer buttons
document.getElementById('latest-news').addEventListener('click', () => {
  window.location.href = 'latest-news.html';  // Redirect to Latest News Today page
});

document.getElementById('search-news').addEventListener('click', () => {
  window.location.href = 'search.html';  // Stay on the Search News page
});

document.getElementById('home').addEventListener('click', () => {
  window.location.href = 'index.html';  // Redirect to Home page
});
