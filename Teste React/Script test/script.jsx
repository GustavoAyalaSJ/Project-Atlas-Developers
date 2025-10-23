function ModaisNexora() {
  const [modalAberto, setModalAberto] = React.useState(null);
  const [mostrarSenha, setMostrarSenha] = React.useState(false);

  const handleAbrirTermos = () => setModalAberto('termos');
  const handleAbrirSuporte = () => setModalAberto('suporte');
  const handleAbrirForm = () => setModalAberto('formulário');
  const handleFecharModal = () => setModalAberto(null);

  return (
    <React.Fragment>
      <header>
        <div>
          <a onClick={handleAbrirTermos} style={{ cursor: 'pointer' }}>Termos e Serviços</a>
          <a onClick={handleAbrirSuporte} style={{ cursor: 'pointer', marginLeft: '10px' }}>Suporte</a>
          <a onClick={handleAbrirForm} style={{ cursor: 'pointer', marginLeft: '10px' }}>Cadastro</a>
        </div>
      </header>

      {modalAberto === 'termos' && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={handleFecharModal} style={{ float: 'right' }}>X</button>
            <h2 className="informações-text">Termos e Serviços</h2>
            <p className="informações">PLACEHOLDER</p>
          </div>
        </div>
      )}

      {modalAberto === 'suporte' && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={handleFecharModal} style={{ float: 'right' }}>X</button>
            <h2 className="suporte-header">Suporte</h2>
            <div className="modal-body">
              <form>
                <div className="nameArea">
                  <label htmlFor="nome" className="form-label">Nome:</label>
                  <input type="text" id="nome" name="nome" className="form-control" placeholder="Informe seu nome completo" />
                </div>
                <div className="emailArea">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input type="text" id="email" name="email" className="form-control" placeholder="Informe seu email" />
                </div>
                <div className="numberArea">
                  <label htmlFor="phone" className="form-label">Número:</label>
                  <input type="tel" id="phone" name="phone" className="form-control" placeholder="Informe seu número de telefone" />
                </div>
                <div className="problemArea">
                  <label htmlFor="problema" className="form-label">Selecione o problema</label>
                  <select id="problema" name="problema" className="form-selector">
                    <option value="">Selecione</option>
                    <option value="problema1">Problema 1#.</option>
                    <option value="problema2">Problema 2#.</option>
                    <option value="problema3">Problema 3#.</option>
                    <option value="problema4">Problema 4#.</option>
                  </select>
                </div>
                <div className="MessageBox">
                  <label htmlFor="mensagem">Mensagem:</label>
                  <textarea id="mensagem" cols="50" rows="10" maxLength="500"></textarea>
                </div>
                <div className="Buttons">
                  <button type="submit">Enviar</button>
                  <button type="reset">Limpar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {modalAberto === 'formulário' && (
        <div className="modal-card">
          <h2>Você está cadastrado como?</h2>
          <a href="#" className="role-candidato">CANDIDATO</a>
          <p>ou</p>
          <a href="#" className="role-empresa">EMPRESA</a>
        </div>
      )}

      <div className="login-card">
        <p className="selection-info">Você selecionou: <strong>CANDIDATO</strong></p>
        <form className="login-form" id="candidato">
          <div className="emailArea">
            <label htmlFor="email" className="form-label">Email:</label>
            <input type="text" id="email" name="email" className="form-control" placeholder="Digite seu email" />
          </div>
          <a href="#" className="forgot-email">Esqueceu o email?</a>
          <div className="passArea">
            <label htmlFor="password" className="form-label">Senha:</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type={mostrarSenha ? "text" : "password"}
                id="password"
                name="password"
                className="form-control"
                placeholder="Digite sua senha"
              />
              <span
                style={{ cursor: "pointer", marginLeft: "10px" }}
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                <i className="bi bi-eye-fill"></i>
              </span>
            </div>
          </div>
          <a href="#" className="forgot-password">Esqueceu a senha?</a>
          <button type="submit" className="login-button">LOGAR</button>
          <a href="#" className="register-button">CADASTRE-SE</a>

          <p className="terms-privacy">
            Ao conectar-se com este site, você estará concordando com nossos{" "}
            <a onClick={handleAbrirTermos} style={{ cursor: 'pointer' }}>Termos de Uso</a> e{" "}
            <a onClick={() => alert("Política de Privacidade")} style={{ cursor: 'pointer' }}>Políticas de Privacidade</a>.
          </p>
        </form>
      </div>
    </React.Fragment>
  );
}

// Renderização
const container = document.getElementById('react-header-links');
const root = ReactDOM.createRoot(container);
root.render(<ModaisNexora />);
