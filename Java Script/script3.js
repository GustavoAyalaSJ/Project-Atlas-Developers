document.addEventListener('DOMContentLoaded', () => {
    // Declaração de todas as variáveis no escopo global do 'DOMContentLoaded'
    const estadoSelect = document.getElementById('estado-select');
    const municipioSelect = document.getElementById('municipio-select');
    const nivelSelect = document.getElementById('nivel-select');
    const jobListingsSection = document.getElementById('job-listings-section');
    const foundJobsMessage = document.getElementById('found-jobs-message');
    const favoritesList = document.getElementById('favorites-list'); // Adicionado

    const detailCompanyName = document.getElementById('detail-company-name');
    const detailCompanyLogo = document.getElementById('detail-company-logo');
    const detailProponentName = document.getElementById('detail-proponent-name');
    const detailJobTitle = document.getElementById('detail-job-title');
    const detailPeriod = document.getElementById('detail-period');
    const detailServiceType = document.getElementById('detail-service-type');
    const detailDescription = document.getElementById('detail-description');

    const allJobs = [
        {
            id: 'vaga-araujo-senior-dev',
            company: 'Farmácia Araujo',
            logo: 'Drogaria_Araujo_Logomarca.jpg',
            proponent: 'Dr. Roberto Silva',
            title: 'Desenvolvedor Sênior',
            period: '14 horas por dia',
            serviceType: 'Remoto',
            state: 'MG',
            city: 'Belo Horizonte',
            level: 'senior',
            description: 'Vaga para Desenvolvedor Sênior com experiência em desenvolvimento web e mobile. A empresa oferece um ambiente dinâmico e desafios constantes. **(Detalhes não disponíveis no protótipo)**'
        },
        {
            id: 'vaga-atlas-pleno-frontend',
            company: 'Atlas Developers',
            logo: 'Logotipo Achadinhos Oferta Divertido Verde e Rosa.png',
            proponent: 'Mariana Costa',
            title: 'Desenvolvedor Frontend Pleno',
            period: '8 horas por dia',
            serviceType: 'Híbrido',
            state: 'SP',
            city: 'São Paulo',
            level: 'pleno',
            description: 'Buscamos um Desenvolvedor Frontend Pleno para integrar nossa equipe. Necessário experiência com React e bom design de UI. **(Detalhes não disponíveis no protótipo)**'
        }
    ];

    const estadosDoBrasil = [
        { uf: 'AC', nome: 'Acre' }, { uf: 'AL', nome: 'Alagoas' }, { uf: 'AP', nome: 'Amapá' },
        { uf: 'AM', nome: 'Amazonas' }, { uf: 'BA', nome: 'Bahia' }, { uf: 'CE', nome: 'Ceará' },
        { uf: 'DF', nome: 'Distrito Federal' }, { uf: 'ES', nome: 'Espírito Santo' }, { uf: 'GO', nome: 'Goiás' },
        { uf: 'MA', nome: 'Maranhão' }, { uf: 'MT', nome: 'Mato Grosso' }, { uf: 'MS', nome: 'Mato Grosso do Sul' },
        { uf: 'MG', nome: 'Minas Gerais' }, { uf: 'PA', nome: 'Pará' }, { uf: 'PB', nome: 'Paraíba' },
        { uf: 'PR', nome: 'Paraná' }, { uf: 'PE', nome: 'Pernambuco' }, { uf: 'PI', nome: 'Piauí' },
        { uf: 'RJ', nome: 'Rio de Janeiro (Estado)' }, { uf: 'RN', nome: 'Rio Grande do Norte' }, { uf: 'RS', nome: 'Rio Grande do Sul' },
        { uf: 'RO', nome: 'Rondônia' }, { uf: 'RR', nome: 'Roraima' }, { uf: 'SC', nome: 'Santa Catarina' },
        { uf: 'SP', nome: 'São Paulo (Estado)' }, { uf: 'SE', 'nome': 'Sergipe' }, { uf: 'TO', nome: 'Tocantins' }
    ];

    const municipiosPorEstado = {
        'AC': ['Rio Branco', 'Cruzeiro do Sul'],
        'AL': ['Maceió', 'Arapiraca'],
        'AP': ['Macapá', 'Santana', 'Laranjal do Jari'],
        'AM': ['Manaus', 'Parintins', 'Itacoatiara'],
        'BA': ['Salvador', 'Feira de Santana', 'Vitória da Conquista'],
        'CE': ['Fortaleza', 'Caucaia', 'Juazeiro do Norte'],
        'DF': ['Brasília'],
        'ES': ['Vitória', 'Vila Velha', 'Serra'],
        'GO': ['Goiânia', 'Aparecida de Goiânia', 'Anápolis'],
        'MA': ['São Luís', 'Imperatriz'],
        'MT': ['Cuiabá', 'Várzea Grande', 'Rondonópolis'],
        'MS': ['Campo Grande', 'Dourados', 'Três Lagoas'],
        'MG': ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora', 'Betim', 'Uberaba', 'Montes Claros'],
        'PA': ['Belém', 'Ananindeua', 'Santarém'],
        'PB': ['João Pessoa', 'Campina Grande'],
        'PR': ['Curitiba', 'Londrina', 'Maringá'],
        'PE': ['Recife', 'Caruaru', 'Jaboatão dos Guararapes', 'Olinda', 'Petrolina'],
        'PI': ['Teresina', 'Parnaíba', 'Picos'],
        'RJ': ['Rio de Janeiro (Capital)', 'Niterói', 'Duque de Caxias', 'Nova Iguaçu', 'São Gonçalo'],
        'RN': ['Natal', 'Mossoró', 'Parnamirim'],
        'RS': ['Porto Alegre', 'Caxias do Sul', 'Canoas', 'Pelotas', 'Santa Maria'],
        'RO': ['Porto Velho', 'Ji-Paraná', 'Ariquemes'],
        'RR': ['Boa Vista'],
        'SC': ['Florianópolis', 'Joinville', 'Blumenau'],
        'SP': ['São Paulo (Capital)', 'Guarulhos', 'Campinas', 'São Bernardo do Campo', 'Santo André', 'Ribeirão Preto', 'São José dos Campos', 'Sorocaba'],
        'SE': ['Aracaju', 'Nossa Senhora do Socorro'],
        'TO': ['Palmas', 'Araguaína']
    };

    // Função para preencher os estados (usada na VagasPage)
    function preencherEstados() {
        if (estadoSelect) { // Verifica se o elemento existe
            estadosDoBrasil.forEach(estado => {
                const option = document.createElement('option');
                option.value = estado.uf;
                option.textContent = estado.nome;
                estadoSelect.appendChild(option);
            });
        }
    }

    // Função para exibir detalhes de uma vaga (usada na VagasPage)
    function displayJobDetails(job) {
        if (detailCompanyName) { // Verifica se o elemento existe
            detailCompanyName.textContent = job.company;
            if (job.logo) {
                detailCompanyLogo.innerHTML = `<img src="${job.logo}" alt="${job.company} Logo" style="max-width: 100%; max-height: 100%;">`;
            } else {
                detailCompanyLogo.innerHTML = `LOGO`;
            }
            detailProponentName.textContent = job.proponent;
            detailJobTitle.textContent = job.title;
            detailPeriod.textContent = job.period;
            detailServiceType.textContent = job.serviceType;
            detailDescription.textContent = job.description;
        }
    }

    // Função para renderizar a lista de vagas (usada na VagasPage)
    function renderJobListings(jobsToDisplay) {
        if (!jobListingsSection) return; // Se não estiver na página de vagas, sai da função

        jobListingsSection.innerHTML = '';
        if (foundJobsMessage) {
            foundJobsMessage.style.display = 'none';
        }

        if (jobsToDisplay.length === 0) {
            foundJobsMessage.textContent = "Não há empregos disponíveis no momento.";
            foundJobsMessage.style.display = 'block';
            jobListingsSection.appendChild(foundJobsMessage);
            displayJobDetails({
                company: 'NOME DA EMPRESA',
                logo: '',
                proponent: 'NOME DO DIRIGENTE',
                title: 'NOME DA VAGA',
                period: 'PERÍODO',
                serviceType: 'TIPO DE SERVIÇO',
                description: ''
            });
            return;
        }

        const favoriteJobIds = JSON.parse(localStorage.getItem('favoriteJobs')) || [];

        jobsToDisplay.forEach(job => {
            const jobCard = document.createElement('div');
            jobCard.classList.add('job-card');

            const isFavorited = favoriteJobIds.includes(job.id);
            const heartIconClass = isFavorited ? 'bi-heart-fill' : 'bi-heart';

            jobCard.innerHTML = `
                <h3>${job.title} - ${job.company} - [${job.state}, ${job.city}]</h3>
                <button class="favorite-button" data-job-id="${job.id}">
                    <i class="bi ${heartIconClass}"></i>
                </button>
                <p>Período: ${job.period}</p>
                <p>Tipo do Serviço: ${job.serviceType}</p>
            `;

            jobCard.addEventListener('click', (event) => {
                if (!event.target.closest('.favorite-button')) {
                    displayJobDetails(job);
                }
            });

            const favoriteButton = jobCard.querySelector('.favorite-button');
            favoriteButton.addEventListener('click', () => {
                let favoriteJobs = JSON.parse(localStorage.getItem('favoriteJobs')) || [];
                const jobId = job.id;
                const isFavorited = favoriteJobs.includes(jobId);
                const heartIcon = favoriteButton.querySelector('i');

                if (isFavorited) {
                    favoriteJobs = favoriteJobs.filter(id => id !== jobId);
                    heartIcon.classList.remove('bi-heart-fill');
                    heartIcon.classList.add('bi-heart');
                } else {
                    favoriteJobs.push(jobId);
                    heartIcon.classList.remove('bi-heart');
                    heartIcon.classList.add('bi-heart-fill');
                }

                localStorage.setItem('favoriteJobs', JSON.stringify(favoriteJobs));
            });
            jobListingsSection.appendChild(jobCard);
        });
        if (jobsToDisplay.length > 0) {
            displayJobDetails(jobsToDisplay[0]);
        }
    }

    // Função para renderizar as vagas favoritadas (usada na UserPage)
    function renderFavoriteJobs() {
        if (!favoritesList) return; // Se não estiver na página de usuário, sai da função

        const favoriteJobIds = JSON.parse(localStorage.getItem('favoriteJobs')) || [];
        const favoriteJobs = allJobs.filter(job => favoriteJobIds.includes(job.id));

        favoritesList.innerHTML = '';

        if (favoriteJobs.length === 0) {
            favoritesList.innerHTML = '<p class="no-favorites">NENHUMA VAGA FAVORITADA NO MOMENTO</p>';
        } else {
            favoriteJobs.forEach(job => {
                const jobElement = document.createElement('div');
                jobElement.classList.add('favorite-job-item');
                jobElement.innerHTML = `
                    <div class="favorite-job-content">
                        <h4>${job.title}</h4>
                        <p>Empresa: ${job.company}</p>
                        <p>Local: ${job.city}, ${job.state}</p>
                    </div>
                    <button class="unfavorite-button" data-job-id="${job.id}">
                        <i class="bi bi-heart-fill"></i>
                    </button>
                `;
                favoritesList.appendChild(jobElement);
            });
        }
    }

    // Lógica para a VagasPage
    if (jobListingsSection) {
        preencherEstados();
        renderJobListings(allJobs);

        // Adiciona os event listeners para os filtros
        if (estadoSelect) {
            estadoSelect.addEventListener('change', () => {
                const estadoSelecionado = estadoSelect.value;
                municipioSelect.innerHTML = '<option value="">Selecione um Município</option>';

                if (estadoSelecionado) {
                    const municipios = municipiosPorEstado[estadoSelecionado] || [];
                    municipios.forEach(municipio => {
                        const option = document.createElement('option');
                        option.value = municipio;
                        option.textContent = municipio;
                        municipioSelect.appendChild(option);
                    });
                    municipioSelect.disabled = false;
                } else {
                    municipioSelect.disabled = true;
                }
                filterJobs();
            });
            municipioSelect.addEventListener('change', filterJobs);
            nivelSelect.addEventListener('change', filterJobs);
        }
    }

    // Lógica para a UserPage
    if (favoritesList) {
        renderFavoriteJobs();
        favoritesList.addEventListener('click', (event) => {
            const button = event.target.closest('.unfavorite-button');
            if (button) {
                const jobId = button.getAttribute('data-job-id');
                let favoriteJobIds = JSON.parse(localStorage.getItem('favoriteJobs')) || [];
                favoriteJobIds = favoriteJobIds.filter(id => id !== jobId);
                localStorage.setItem('favoriteJobs', JSON.stringify(favoriteJobIds));
                renderFavoriteJobs();
            }
        });
    }
});