import { fetchGitHubUser } from './api.js';
import { renderLoading, renderProfile, clearResults } from './ui.js';

const inputSearch = document.getElementById('input-search');
const btnSearch = document.getElementById('btn-search');
const profileResults = document.querySelector('.profile-results');

async function handleSearch() {
  const userName = inputSearch.value.trim();

  if (!userName) {
    alert('Por favor, digite um nome de usuário do GitHub.');
    clearResults(profileResults);
    return;
  }

  renderLoading(profileResults);

  try {
    const userData = await fetchGitHubUser(userName);
    renderProfile(profileResults, userData);
  } catch (error) {
    console.error('Erro ao buscar o perfil do usuário:', error);
    alert('Ocorreu um erro ao buscar o perfil do usuário. Por favor, tente novamente mais tarde.');
    clearResults(profileResults);
  }
}

btnSearch.addEventListener('click', handleSearch);
inputSearch.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleSearch();
  }
});
