function UserActions() {
  const [dropdownAberto, setDropdownAberto] = React.useState(null);
  const dropdownRef = React.useRef(null);

  const handleAbrirNotificações = () => setDropdownAberto('notifications-button');
  const handleAbrirPerfil = () => setDropdownAberto('profile-button');

  const handleFecharDropdown = () => setDropdownAberto(null);

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

function ProfileBox({ perfil, onEditarClick }) {
  const contatos = perfil.contato || {};
  const listaProjetos = perfil.projetos || [];

  return (
    <div className="perfil-container">
      <div className="perfil-header">
        <i className="bi bi-person-square perfil-avatar"></i>
        <div className="perfil-info">
          <h2>{perfil.nome || 'NOME'}</h2>
          <p className="info-localizacao">
            <i className="bi bi-geo-alt-fill"></i> {perfil.localizacao || 'LOCALIZAÇÃO'}
          </p>
          <p className="info-bio">{perfil.bio || 'BIO'}</p>
        </div>
        <div className="profile-actions">
          <button className="btn-perfil" onClick={onEditarClick}>Editar Perfil</button>
          <a href="PortifólioPage.html">
            <button className="btn-portifólio" href="PortifólioPage.html">Portifólio</button>
          </a>
        </div>
      </div>

      <div className="perfil-body">
        <div className="secao-projetos">
          <h3>Projetos</h3>
          <div className="displayProjectBox">
            {listaProjetos.length === 0 ? (
              <p className="placeholder-info">Nenhum projeto adicionado.</p>
            ) : (
              <p>/* Lista de projetos aqui */</p>
            )}
          </div>
        </div>

        <div className="secao-contatos">
          <h3>Contato</h3>
          <ul className="lista-contato">
            <li>
              <i className="bi bi-envelope-at-fill"></i>
              {contatos.email ? <span>{contatos.email}</span> : <span className="placeholder-info">Não informado</span>}
            </li>
            <li>
              <i className="bi bi-telephone-fill"></i>
              {contatos.telefone ? <span>{contatos.telefone}</span> : <span className="placeholder-info">Não informado</span>}
            </li>
            <li>
              <i className="bi bi-linkedin"></i>
              {contatos.linkedin ? <span>{contatos.linkedin}</span> : <span className="placeholder-info">Não informado</span>}
            </li>
            <li>
              <i className="bi bi-github"></i>
              {contatos.github ? <span>{contatos.github}</span> : <span className="placeholder-info">Não informado</span>}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ModalEditarPerfil({ dadosAtuais, onSalvar, onFechar }) {
  const [dadosEditados, setDadosEditados] = React.useState(dadosAtuais);
  const inputArquivoRef = React.useRef(null);


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (['email', 'telefone', 'linkedin', 'github'].includes(name)) {
      setDadosEditados(dadosAnteriores => ({
        ...dadosAnteriores,
        contato: {
          ...dadosAnteriores.contato,
          [name]: value
        }
      }));
    } else {
      setDadosEditados(dadosAnteriores => ({
        ...dadosAnteriores,
        [name]: value
      }));
    }
  };

  const handleSalvarClick = () => {
    onSalvar(dadosEditados);
  };



  return (
    <div className="modal-overlay">
      <div className="modal-content">

        <div className="modal-header">
          <div className="modal-avatar-section">
            <i className="bi bi-person-circle modal-avatar-placeholder"></i>
            <input
              type="file"
              accept="image/*"
              ref={inputArquivoRef}
              style={{ display: 'none' }}
              onChange={(e) => {
                const arquivo = e.target.files[0];
                if (arquivo) {
                  console.log("Arquivo selecionado:", arquivo.name);
                }
              }}
            />
            <button className="btn-upload" onClick={() => inputArquivoRef.current?.click()}>UPLOAD</button>
            <button className="btn-remover">REMOVER</button>
          </div>
          <div className="modal-info-section">
            <label>NOME COMPLETO:</label>
            <input
              type="text"
              name="nome"
              placeholder="Informe seu nome"
              value={dadosEditados.nome}
              onChange={handleChange}
            />
            <label>LOCALIZAÇÃO:</label>
            <input
              type="text"
              name="localizacao"
              placeholder="Informe sua localização"
              value={dadosEditados.localizacao}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="modal-body">
          <label>BIO:</label>
          <textarea
            name="bio"
            placeholder="Descreva sobre você"
            value={dadosEditados.bio}
            onChange={handleChange}
          ></textarea>

          <label>CONTATO:</label>
          <input
            type="email"
            name="email"
            placeholder="Seu e-mail"
            value={dadosEditados.contato.email || ''}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="telefone"
            placeholder="Seu telefone"
            value={dadosEditados.contato.telefone || ''}
            onChange={handleChange}
          />
          <input
            type="text"
            name="linkedin"
            placeholder="URL do seu LinkedIn"
            value={dadosEditados.contato.linkedin || ''}
            onChange={handleChange}
          />
          <input
            type="text"
            name="github"
            placeholder="URL do seu GitHub"
            value={dadosEditados.contato.github || ''}
            onChange={handleChange}
          />
        </div>

        <div className="modal-footer">
          <button className="btn-salvar" onClick={handleSalvarClick}>SALVAR ALTERAÇÕES</button>
          <button className="btn-cancelar" onClick={onFechar}>CANCELAR</button>
        </div>
      </div>
    </div>
  );
}


function PaginaPerfil() {
  const [perfil, setPerfil] = React.useState({
    nome: "",
    localizacao: "",
    bio: "",
    contato: {
      email: "",
      telefone: "",
      linkedin: "",
      github: ""
    },
    projetos: []
  });

  const [modalAberto, setModalAberto] = React.useState(false);

  const handleSalvarPerfil = (novosDados) => {
    setPerfil(novosDados);
    setModalAberto(false);
    console.log("Salvando no 'banco de dados'...", novosDados);
  };

  return (
    <React.Fragment>
      <ProfileBox
        perfil={perfil}
        onEditarClick={() => setModalAberto(true)}
      />

      {modalAberto && (
        <ModalEditarPerfil
          dadosAtuais={perfil}
          onSalvar={handleSalvarPerfil}
          onFechar={() => setModalAberto(false)}
        />
      )}
    </React.Fragment>
  );
}

//Renderizar
ReactDOM.createRoot(document.getElementById('react-userActions')).render(<UserActions />);
ReactDOM.createRoot(document.getElementById('react-profile&profile-customization')).render(<PaginaPerfil />);