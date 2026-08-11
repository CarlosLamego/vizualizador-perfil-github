export function renderLoading(container) {
    container.innerHTML = '<p class="loading">Carregando...</p>';
}

export function renderProfile(userData, userRepos, container) {
    // 1. Gera o HTML da lista de repositórios
    const repositoriesHTML = userRepos.length > 0 ? userRepos.map(repo => `
        <a href="${repo.html_url}" target="_blank" >
        <div class="repository-card">
            <h3>${repo.name}</h3>
            <div class="repository-stats">
                <span>★ Stars: ${repo.stargazers_count}</span>
                <span>🍴 Forks: ${repo.forks_count}</span>
                <span>👀 Watchers: ${repo.watchers_count}</span>
                <span>📝 Language: ${repo.language || 'N/A'}</span>
            </div>
            </div>
            </a>
    `).join('') : '<p>Nenhum repositório encontrado.</p>';

    // 2. Insere o Perfil + os Repositórios dentro do container
    container.innerHTML = `
        <div class="profile-card">
            <img src="${userData.avatar_url}" alt="Avatar de ${userData.name}" class="profile-avatar">
            <div class="profile-info">
                <h2>${userData.name || 'Sem nome cadastrado'}</h2>
                <p>${userData.bio || 'Não possui bio cadastrada 😢.'}</p>
            </div>
        </div>

        <div class="profile-counters">
            <div class="followers">
                <h4>🙂 Seguidores</h4>
                <span>${userData.followers}</span>
            </div>
            <div class="following">
                <h4>🙂 Seguindo</h4>
                <span>${userData.following}</span>
            </div>
        </div>

        <div class="profile-repositories">
            <h2>Repositórios</h2>
            <div class="repositories-grid">
                ${repositoriesHTML}
            </div>
        </div>
    `;
}

export function clearResults(container) {
    container.innerHTML = '';
}