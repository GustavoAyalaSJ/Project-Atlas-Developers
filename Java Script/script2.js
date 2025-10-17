document.addEventListener('DOMContentLoaded', () => {
    const estadoSelect = document.getElementById('estado-select');
    const municipioSelect = document.getElementById('municipio-select');
    const container = document.getElementById("cards-container");
    const nivelSelect = document.getElementById('nivel-select');
    const profileButton = document.getElementById('profile-button');
    const profileDropdown = document.getElementById('profile-dropdown');
    const notificationsButton = document.getElementById('notifications-button');
    const notificationsDropdown = document.getElementById('notifications-dropdown');
    const detailCompanyName = document.getElementById('detail-company-name');
    const detailCompanyLogo = document.getElementById('detail-company-logo');
    const detailProponentName = document.getElementById('detail-proponent-name');
    const detailJobTitle = document.getElementById('detail-job-title');
    const detailPeriod = document.getElementById('detail-period');
    const detailServiceType = document.getElementById('detail-service-type');
    const detailDescription = document.getElementById('detail-description');

    // --- Dados ---
    const vagas = [
        { id: 1, company: 'Farmácia Araujo', logo: 'AssetsLogoEmpresas/Logo-Araujo.png', title: 'Desenvolvedor Sênior', city: 'Belo Horizonte', state: 'MG', period: '14h/dia', serviceType: 'Remoto', level: 'senior' },
        { id: 2, company: 'Atlas Developers', logo: 'AssetsLogoEmpresas/Logo-Atlas.png', title: 'Frontend Pleno', city: 'São Paulo (Capital)', state: 'SP', period: '8h/dia', serviceType: 'Híbrido', level: 'pleno' },
        { id: 3, company: 'TechSul Sistemas', logo: 'AssetsLogoEmpresas/Logo-TechSul.png', title: 'Analista de QA Júnior', city: 'Florianópolis', state: 'SC', period: '6h/dia', serviceType: 'Presencial', level: 'junior' },
        { id: 4, company: 'Wave', logo: 'AssetsLogoEmpresas/Logo-Wave.png', title: 'Frontend Júnior', city: 'Salvador', state: 'BA', period: '5h/dia', serviceType: 'Remoto', level: 'junior'}
    ];

    const estados = [
        { nome: "Acre", sigla: "AC", municipios: ["Rio Branco", "Cruzeiro do Sul"] },
        { nome: "Alagoas", sigla: "AL", municipios: ["Maceió", "Arapiraca"] },
        { nome: "Amapá", sigla: "AP", municipios: ["Macapá", "Santana", "Laranjal do Jari"] },
        { nome: "Amazonas", sigla: "AM", municipios: ["Manaus", "Parintins", "Itacoatiara"] },
        { nome: "Bahia", sigla: "BA", municipios: ["Salvador", "Feira de Santana", "Vitória da Conquista"] },
        { nome: "Ceará", sigla: "CE", municipios: ["Fortaleza", "Caucaia", "Juazeiro do Norte"] },
        { nome: "Distrito Federal", sigla: "DF", municipios: ["Brasília"] },
        { nome: "Espirito Santo", sigla: "ES", municipios: ["Vitória", "Vila Velha", "Serra"] },
        { nome: "Goiás", sigla: "GO", municipios: ["Goiânia", "Aparecida de Goiânia", "Anápolis"] },
        { nome: "Maranhão", sigla: "MA", municipios: ["São Luíz", "Imperatriz"] },
        { nome: "Mato Grosso", sigla: "MT", municipios: ["Cuiabá", "Várzea Grande", "Rondonópolis"] },
        { nome: "Mato Grosso do Sul", sigla: "MS", municipios: ["Campo Grande", "Dourados", "Três Lagoas"] },
        { nome: "Minas Gerais", sigla: "MG", municipios: ["Belo Horizonte", "Uberlândia", "Contagem", "Juiz de Fora", "Betim", "Uberaba", "Montes Claros"] },
        { nome: "Pará", sigla: "PA", municipios: ["Belém", "Ananindeua", "Santarém"] },
        { nome: "Paraíba", sigla: "PB", municipios: ["João Pessoa", "Campina Grande"] },
        { nome: "Paraná", sigla: "PR", municipios: ["Curitiba", "Londrina", "Maringá"] },
        { nome: "Pernambuco", sigla: "PE", municipios: ["Recife", "Caruaru", "Jaboatão dos Guararapes", "Olinda", "Petrolina"] },
        { nome: "Piauí", sigla: "PI", municipios: ["Teresina", "Paranaíba", "Picos"] },
        { nome: "Rio de Janeiro", sigla: "RJ", municipios: ["Rio de Janeiro (Capital)", "Niterói", "Duque de Caixas", "Nova Iguaçu", "São Gonçalo"] },
        { nome: "Rio Grande do Norte", sigla: "RN", municipios: ["Natal", "Mossoró", "Parnamirim"] },
        { nome: "Rio Grande do Sul", sigla: "RS", municipios: ["Porto Alegre", "Caxias do Sul", "Canoas", "Pelotas", "Santa Maria"] },
        { nome: "Rondônia", sigla: "RO", municipios: ["Porto Velho", "Ji-Paraná", "Arqieuemes"] },
        { nome: "Roraima", sigla: "RR", municipios: ["Boa Vista"] },
        { nome: "Santa Catarina", sigla: "SC", municipios: ["Florianópolis", "Jonville", "Bluemenau"] },
        { nome: "São Paulo", sigla: "SP", municipios: ["São Paulo (Capital)", "Guarulhos", "Campinas", "São Bernardo do Campo", "Santo André", "Ribeirão Preto", "São José dos Campos", "Sorocaba"] },
        { nome: "Sergipe", sigla: "SE", municipios: ["Aracaju", "Nossa Senhora do Socorro"] },
        { nome: "Tocantins", sigla: "TO", municipios: ["Palmas", "Araguaína"] }
    ];

    // --- Funções ---

    function atualizarPainelDetalhes(vaga) {
        detailCompanyName.textContent = vaga.company;
        detailJobTitle.textContent = vaga.title;
        detailPeriod.textContent = vaga.period;
        detailServiceType.textContent = vaga.serviceType;

        // Atualiza o logo
        detailCompanyLogo.innerHTML = `<img src="${vaga.logo}" alt="Logo ${vaga.company}" style="width: 100%; height: 100%; object-fit: contain;">`;

        detailProponentName.textContent = "Não informado";
        detailDescription.innerHTML = `
            <p>PLACEHOLDER</p>
        `;
    }

    estados.forEach(estado => {
        const option = document.createElement("option");
        option.value = estado.sigla;
        option.textContent = estado.nome;
        estadoSelect.appendChild(option);
    });

    estadoSelect.addEventListener("change", () => {
        const selectedSigla = estadoSelect.value;
        const selectedEstado = estados.find(e => e.sigla === selectedSigla);

        municipioSelect.innerHTML = '<option value="">Selecione um Município</option>';

        if (selectedEstado) {
            selectedEstado.municipios.forEach(m => {
                const option = document.createElement("option");
                option.value = m;
                option.textContent = m;
                municipioSelect.appendChild(option);
            });
            municipioSelect.disabled = false;

            const vagasFiltradas = vagas.filter(v => v.state === selectedSigla);
            gerarCardsVagas(vagasFiltradas);
        } else {
            municipioSelect.disabled = true;
            gerarCardsVagas(vagas);
        }
    });

    // Ao selecionar município e niveis de profissionalismo, filtra vagas
    municipioSelect.addEventListener('change', () => {
        const estadoSelecionado = estadoSelect.value;
        const municipioSelecionado = municipioSelect.value;

        if (municipioSelecionado) {
            const vagasFiltradas = vagas.filter(v => v.state === estadoSelecionado && v.city === municipioSelecionado);
            gerarCardsVagas(vagasFiltradas);
        } else {
            const vagasFiltradas = vagas.filter(v => v.state === estadoSelecionado);
            gerarCardsVagas(vagasFiltradas);
        }
    });

    nivelSelect.addEventListener('change', () => {
        const estadoSelecionado = estadoSelect.value;
        const municipioSelecionado = municipioSelect.value;
        const nivelSelecionado = nivelSelect.value;

        let vagasFiltradas = vagas;

        if (estadoSelecionado) {
            vagasFiltradas = vagasFiltradas.filter(v => v.state === estadoSelecionado);
        }

        if (municipioSelecionado) {
            vagasFiltradas = vagasFiltradas.filter(v => v.city === municipioSelecionado);
        }

        if (nivelSelecionado) {
            vagasFiltradas = vagasFiltradas.filter(v => v.level === nivelSelecionado);
        }

        gerarCardsVagas(vagasFiltradas);
    });


    // Função para gerar os cards
    function gerarCardsVagas(listaVagas) {
        container.innerHTML = "";
        if (listaVagas.length === 0) {
            container.innerHTML = "<p class='no-jobs'>Nenhuma vaga encontrada.</p>";
            atualizarPainelDetalhes({
                company: 'NOME DA EMPRESA',
                title: 'NOME DA VAGA',
                period: 'PERÍODO',
                serviceType: 'TIPO DE SERVIÇO',
                logo: '',
                city: '',
                state: ''
            });
            detailCompanyLogo.innerHTML = 'LOGO';
            detailProponentName.textContent = 'NOME DO DIRIGENTE';
            detailDescription.innerHTML = '';
            return;
        }

        listaVagas.forEach((vaga, index) => {
            const card = document.createElement("div");
            card.classList.add("job-card");
            card.innerHTML = `
                <h3>${vaga.title}</h3>
                <p><strong>${vaga.company}</strong></p>
                <p>${vaga.city} - ${vaga.state}</p>
                <p>${vaga.period}</p>
                <p>${vaga.serviceType}</p>
                <button class="favorite-btn" data-id="${vaga.id}">
                    <i class="bi bi-heart"></i>
                </button>
            `;

            const favoriteButton = card.querySelector(".favorite-btn");
            favoriteButton.addEventListener("click", (e) => {
                e.stopPropagation();
                const heart = e.currentTarget.querySelector("i");
                heart.classList.toggle("bi-heart");
                heart.classList.toggle("bi-heart-fill");
            });

            card.addEventListener("click", () => {
                document.querySelectorAll('.job-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');

                atualizarPainelDetalhes(vaga);
            });

            if (index === 0) {
                card.classList.add('selected');
                atualizarPainelDetalhes(vaga);
            }

            container.appendChild(card);
        });
    }

    // --- Dropdowns Cabeçalho ---
    function toggleDropdown(targetDropdown, otherDropdown) {
        if (otherDropdown.classList.contains('show')) {
            otherDropdown.classList.remove('show');
        }
        targetDropdown.classList.toggle('show');
    }

    profileButton.addEventListener('click', function (event) {
        event.stopPropagation();
        toggleDropdown(profileDropdown, notificationsDropdown);
    });

    notificationsButton.addEventListener('click', function (event) {
        event.stopPropagation();
        toggleDropdown(notificationsDropdown, profileDropdown);
    });

    window.addEventListener('click', function () {
        profileDropdown.classList.remove('show');
        notificationsDropdown.classList.remove('show');
    });

    gerarCardsVagas(vagas);
});