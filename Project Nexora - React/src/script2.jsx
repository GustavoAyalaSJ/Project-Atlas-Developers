// COMPONENTES
function Box({ title, boxType, children }) {
    // Você precisará estilizar 'box-container' e as classes (blue-dark, etc.) no seu CSS
    const className = `box-container ${boxType}`;
    return (
        <div className={className}>
            <h3>{title}</h3>
            <div className="box-content">
                {children}
            </div>
        </div>
    );
}

function UserActions() {
    const [dropdownAberto, setDropdownAberto] = React.useState(null);
    const dropdownRef = React.useRef(null);

    const handleAbrirNotificações = () => setDropdownAberto('notifications-button');
    const handleAbrirPerfil = () => setDropdownAberto('profile-button');

    const handleFecharDropdown = () => setDropdownAberto(null);

    //DROPDOWN HEADER
    React.useEffect(() => {
        function handleClickFora(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownAberto(null);
            }
        }

        if (dropdownAberto) {
            document.addEventListener('mousedown', handleClickFora);
        } else {
            document.removeEventListener('mousedown', handleClickFora);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickFora);
        };
    }, [dropdownAberto]);

    return (
        <React.Fragment>
            <div className="header-user-actions">
                <button onClick={handleAbrirNotificações} className="icon-button" aria-label="Notificações">
                    <i className="bi bi-bell"></i>
                </button>
                <button onClick={handleAbrirPerfil} className="icon-button" aria-label="Perfil">
                    <i className="bi bi-person-circle"></i>
                </button>
            </div>

            {dropdownAberto === 'notifications-button' && (
                <div ref={dropdownRef} className="dropdown-content">
                    <h1 className="notification-text"><strong>Notificações</strong></h1>
                    <p className="notification-warning">Você não possui novas notificações.</p>
                    <button onClick={handleFecharDropdown} className="close-dropdown">Fechar</button>
                </div>
            )}

            {dropdownAberto === 'profile-button' && (
                <div ref={dropdownRef} className="dropdown-content" id="profile-dropdown">
                    <a href="PerfilPage.html" className="settings-link"><i className="bi bi-person-badge"></i>Perfil</a>
                    <a href="#" className="settings-link"><i className="bi bi-gear"></i> Configurações</a>
                    <a href="IntroducedPage.html"><i className="bi bi-box-arrow-left"></i> Sair</a>
                    <button onClick={handleFecharDropdown} className="close-dropdown">Fechar</button>
                </div>
            )}

        </React.Fragment>
    );
}


function StartDashboardbox() {
    const handleProjectPanel = () => console.log('Abrir painel de Projetos');
    const handleFavoritePanel = () => {
        window.location.href = 'VagasPage.html';
    };
    const handleNewsPanel = () => console.log('Abrir painel de Notícias');

    const [favoritos, setFavoritos] = React.useState([]);

    const getFavoritos = () => JSON.parse(localStorage.getItem('nexoraFavoritos') || '[]');

    const [modalAberto, setModalAberto] = React.useState(null);
    const handleFecharModal = () => { setModalAberto(null); };
    const handleAbrirGit = () => { setModalAberto('GitHub'); };

    React.useEffect(() => {
        setFavoritos(getFavoritos());
    }, []);

    const handleRemoveFavorito = (id) => {
        const novosFavoritos = favoritos.filter(fav => fav.id !== id);
        localStorage.setItem('nexoraFavoritos', JSON.stringify(novosFavoritos));
        setFavoritos(novosFavoritos);
    };

    return (
        <React.Fragment>
            <div className="main-layout">
                <div className="first-box" onClick={handleProjectPanel}>
                    <Box title="Projetos Linkados" boxType="blue-dark">
                        <p>Você não postou nenhum projeto.</p>
                        <button onClick={handleAbrirGit} className="box-button">Postar Projetos</button>
                    </Box>
                </div>
                <div className="center-panel">
                    <div className="second-box">
                        <Box title="Vagas Favoritadas" boxType="gray-dark">

                            {favoritos.length === 0 ? (
                                <p>Você não favoritou nenhuma vaga.</p>
                            ) : (
                                <ul className="favoritos-list">
                                    {favoritos.map(vaga => (
                                        <li key={vaga.id} className="favorito-item">
                                            <img src={vaga.logo} alt={vaga.company} className="favorito-logo" />

                                            <div className="favorito-info">
                                                <strong>{vaga.title}</strong>
                                                <span>{vaga.company}</span>
                                            </div>

                                            <button
                                                onClick={() => handleRemoveFavorito(vaga.id)}
                                                className="remove-favorito-btn"
                                                aria-label="Remover favorito"
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <button className="box-button" onClick={handleFavoritePanel}>
                                {favoritos.length === 0 ? 'Procurar Vagas' : 'Visualizar Vagas'}
                            </button>
                        </Box>
                    </div>
                </div>

                <div className="third-box" onClick={handleNewsPanel}>
                    <Box title="Acompanhe as últimas notícias" boxType="blue-royal">
                        <p>Nenhuma notícia foi postada.</p>
                        <button className="box-button">Visualizar painel de notícias</button>
                    </Box>
                </div>
            </div>

            {modalAberto === 'GitHub' && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button onClick={handleFecharModal}>X</button>
                        <h2>Poste seus projetos com GitHub</h2>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="github-button"
                            aria-label="GitHub"
                        >
                            <i className="bi bi-github"></i> Acessar o GitHub
                        </a>
                    </div>
                </div>
            )}

        </React.Fragment>
    );
}

// RENDERIZAÇÃO 
ReactDOM.createRoot(document.getElementById('react-userActions')).render(<UserActions />);
ReactDOM.createRoot(document.getElementById('root')).render(<StartDashboardbox />);