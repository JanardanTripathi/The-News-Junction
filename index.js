import API_KEY from './config.js';  // Importing the API key from config.js

const BASE_URL = 'https://newsapi.org/v2';

// Function to fetch the latest news (top headlines)
async function fetchLatestNews() {
  try {
    const response = await fetch(`${BASE_URL}/top-headlines?country=us&apiKey=${API_KEY}`);
    const data = await response.json();
    displayNews(data.articles);
  } catch (error) {
    console.error('Error fetching latest news:', error);
  }
}

// Function to fetch news based on a selected category
async function fetchCategory(category) {
  try {
    const response = await fetch(`${BASE_URL}/top-headlines?category=${category}&apiKey=${API_KEY}`);
    const data = await response.json();
    displayNews(data.articles);
  } catch (error) {
    console.error(`Error fetching ${category} news:`, error);
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
    container.innerHTML = '<p>No articles found</p>';
  }
}

// Attaching event listeners to category buttons
document.getElementById('world').addEventListener('click', () => fetchCategory('world'));
document.getElementById('tech').addEventListener('click', () => fetchCategory('technology'));
document.getElementById('sports').addEventListener('click', () => fetchCategory('sports'));

// Event listeners for footer buttons
document.getElementById('latest-news').addEventListener('click', () => {
  window.location.href = 'latest-news.html';  // Redirect to Latest News page
});

document.getElementById('search-news').addEventListener('click', () => {
  window.location.href = 'search.html';  // Redirect to Search News page
});

document.getElementById('home').addEventListener('click', () => {
  window.location.href = 'index.html';  // Redirect to Home page
});

// Initial load: fetch latest news when the page loads
fetchLatestNews();
