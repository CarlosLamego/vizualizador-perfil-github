import { fetchGitHubUser, fetchGitHubUserRepos } from './api.js';
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
    const userRepos = await fetchGitHubUserRepos(userName);

    // Se no seu arquivo ui.js os parâmetros estiverem como (container, userData, userRepos):
    renderProfile(userData, userRepos, profileResults);
    /* NOTA: Se você atualizou o ui.js para a ordem do professor (userData, userRepos, container), 
       comente a linha de cima e use esta:
       renderProfile(userData, userRepos, profileResults); 
    */

  } catch (error) {
    console.error('Erro ao buscar o perfil do usuário:', error);
    alert('Ocorreu um erro ao buscar o perfil do usuário. Por favor, tente novamente mais tarde.');
    clearResults(profileResults);
  }
}

// Evento de clique no botão
btnSearch.addEventListener('click', handleSearch);

// Evento de pressionar a tecla Enter no input
inputSearch.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleSearch();
  }
});