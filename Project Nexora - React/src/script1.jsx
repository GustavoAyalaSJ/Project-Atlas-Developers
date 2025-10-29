function HeaderLinks() {
  const [modalAberto, setModalAberto] = React.useState(null);

  const handleAbrirTermos = () => setModalAberto('termos');
  const handleAbrirSuporte = () => setModalAberto('suporte');
  const handleFecharModal = () => setModalAberto(null);

  return (
    <>
      <div className="header-links">
        <a onClick={handleAbrirTermos}>Termos e Serviços</a>
        <span className="separador">|</span>
        <a onClick={handleAbrirSuporte} style={{ marginLeft: '10px' }}>Suporte</a>
      </div>

      {modalAberto === 'termos' && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={handleFecharModal}>X</button>
            <h2>Termos e Serviços</h2>
            <p>PLACEHOLDER</p>
          </div>
        </div>
      )}

      {modalAberto === 'suporte' && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={handleFecharModal}>X</button>
            <h2>Suporte</h2>
            <form>
              <label>Nome:</label>
              <input type="text" placeholder="Informe seu nome completo" />
              <label>Email:</label>
              <input type="email" placeholder="Informe seu email" />
              <label>Número:</label>
              <input type="tel" placeholder="Informe seu número de telefone" maxlength="11" />
              <label>Problema:</label>
              <select>
                <option>Selecione</option>
                <option>Problema 1</option>
                <option>Problema 2</option>
                <option>Problema 3</option>
              </select>
              <label>Mensagem:</label>
              <textarea rows="5" maxLength="500"></textarea>
              <button type="submit">Enviar</button>
              <button type="reset">Limpar</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function ModaisNexora() {
  const [modalAberto, setModalAberto] = React.useState(null);
  const [mostrarSenha, setMostrarSenha] = React.useState(false);
  const [papelSelecionado, setPapelSelecionado] = React.useState(null);

  const handleAbrirForm = () => {
    setModalAberto('formulário');
    setPapelSelecionado(null);
  };
  const handleFecharModal = () => {
    setModalAberto(null);
    setPapelSelecionado(null);
  };

  const buttonContainer = document.getElementById('react-button-underTextleft');
  const formSelectionContainer = document.getElementById('react-form-label');

  return (
    <>
      {buttonContainer && !modalAberto && ReactDOM.createPortal(
        <a onClick={handleAbrirForm} className="btn-landing">ACESSAR</a>,
        buttonContainer
      )}

      {formSelectionContainer && modalAberto === 'formulário' && ReactDOM.createPortal(
        <div className="modal-card">
          <h2>Você está cadastrado como?</h2>
          <a onClick={() => setPapelSelecionado('candidato')} className={`role-candidato ${papelSelecionado === 'candidato' ? 'selected' : ''}`}>CANDIDATO</a>
          <p>ou</p>
          <a onClick={() => setPapelSelecionado('empresa')} className={`role-empresa ${papelSelecionado === 'empresa' ? 'selected' : ''}`}>EMPRESA</a>
        </div>,
        formSelectionContainer
      )}

      {papelSelecionado && (
        <div className="login-card">
          <button onClick={handleFecharModal}>X</button>
          <p>Você selecionou: <strong>{papelSelecionado.toUpperCase()}</strong></p>
          <div className="warning-box">
            Nexora recomenda {papelSelecionado === 'empresa' ? 'usar email oficial da empresa' : 'login para maiores de 18 anos'}.
          </div>
          <form onSubmit={(e) => {
            e.preventDefault();
            window.location.href = "UserPage.html";
          }}>
            <label>Email:</label>
            <input type="email" placeholder="Digite seu email" />
            <a href="#">Esqueceu o email?</a>
            <label>Senha:</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input type={mostrarSenha ? "text" : "password"} placeholder="Digite sua senha" />
              <span onClick={() => setMostrarSenha(!mostrarSenha)} style={{ marginLeft: '10px', cursor: 'pointer' }}>
                <i className="bi bi-eye-fill"></i>
              </span>
            </div>
            <a href="#">Esqueceu a senha?</a>
            <button type="submit">LOGAR</button>
            <button type="button">CADASTRE-SE</button>
            <p>
              Ao conectar-se com este site, você concorda com nossos <a>Termos de Uso</a> e <a>Política de Privacidade</a>.
            </p>
          </form>

        </div>
      )}
    </>
  );
}

// Renderização
ReactDOM.createRoot(document.getElementById('react-header-links')).render(<HeaderLinks />);
ReactDOM.createRoot(document.getElementById('root')).render(<ModaisNexora />);
