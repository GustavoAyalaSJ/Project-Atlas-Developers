document.addEventListener('DOMContentLoaded', () => {
    const estadoSelect = document.getElementById('estado-select');
    const municipioSelect = document.getElementById('municipio-select');
    const nivelSelect = document.getElementById('nivel-select');
    const jobListingsSection = document.getElementById('job-listings-section');
    const foundJobsMessage = document.getElementById('found-jobs-message');

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

    function filterJobs() {
        const estadoSelecionado = estadoSelect.value;
        const municipioSelecionado = municipioSelect.value;
        const nivelSelecionado = nivelSelect.value;

        let filteredJobs = allJobs.filter(job => {
            const matchesEstado = !estadoSelecionado || job.state === estadoSelecionado;
            const matchesMunicipio = !municipioSelecionado || job.city === municipioSelecionado;
            const matchesNivel = !nivelSelecionado || job.level === nivelSelecionado;
            return matchesEstado && matchesMunicipio && matchesNivel;
        });

        if (estadoSelecionado && municipioSelecionado && filteredJobs.length === 0) {
            foundJobsMessage.textContent = "Não há empregos disponíveis nesta região.";
            foundJobsMessage.style.display = 'block';
            jobListingsSection.innerHTML = '';
            jobListingsSection.appendChild(foundJobsMessage);
        } else if ((estadoSelecionado || municipioSelecionado) && nivelSelecionado && filteredJobs.length === 0) {
            foundJobsMessage.textContent = "Não há empregos deste nível na região selecionada.";
            foundJobsMessage.style.display = 'block';
            jobListingsSection.innerHTML = '';
            jobListingsSection.appendChild(foundJobsMessage);
        } else {
            renderJobListings(filteredJobs);
        }
    }

    // Adiciona os event listeners para os filtros
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

    function preencherEstados() {
        estadosDoBrasil.forEach(estado => {
            const option = document.createElement('option');
            option.value = estado.uf;
            option.textContent = estado.nome;
            estadoSelect.appendChild(option);
        });
    }

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
    });

    function displayJobDetails(job) {
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

    function renderJobListings(jobsToDisplay) {
        jobListingsSection.innerHTML = '';
        foundJobsMessage.style.display = 'none';

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

        const favoriteJobs = JSON.parse(localStorage.getItem('favoriteJobs')) || [];

        jobsToDisplay.forEach(job => {
            const jobCard = document.createElement('div');
            jobCard.classList.add('job-card');

            const isFavorited = favoriteJobs.includes(job.id);
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
            displayJobDetails(jobsToDisplay()[0]);
        }
    }

    preencherEstados();
    renderJobListings(allJobs);
});