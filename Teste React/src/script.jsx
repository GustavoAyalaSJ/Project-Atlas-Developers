function FooterComModals() {
    //'null' para definir que o modal não irá abrir;
    const [modalAberto, setModalAberto] = React.useState(null);

    //'termos e perguntas' os modals que serão abertos;
    const handleAbrirTermos = () => { setModalAberto('termos'); };
    const handleAbrirPerguntas = () => { setModalAberto('perguntas'); };
    const handleFecharModal = () => { setModalAberto(null); };

    return (
        <React.Fragment>
            <footer className="rodape">
                <div className="rodape-links">
                    <button onClick={handleAbrirTermos} className="link-button">Termos e Serviços</button>
                    <span className="separador">|</span>
                    <button onClick={handleAbrirPerguntas} className="link-button">Perguntas Frequentes</button>
                </div>
            </footer>

            {modalAberto === 'termos' && (
                <div id="TermosModal" className="modal">
                    <div className="modal-content">
                        <button onClick={handleFecharModal} style={{ float: 'right' }}>X</button>
                        <h2 className="informações-text">Termos e Serviços</h2>
                        <p className="informações">PLACEHOLDER</p>
                    </div>
                </div>
            )}

            {modalAberto === 'perguntas' && (
                <div id="PerguntasModal" className="modal">
                    <div className="modal-content">
                        <button onClick={handleFecharModal} style={{ float: 'right' }}>X</button>
                        <h2>Selecione o tipo de pergunta pelos <span className="destacar">botões</span> abaixo:</h2>
                        <div className="button-group">
                            <button className="pergunta1">Botão 1</button>
                            <button className="pergunta2">Botão 2</button>
                            <button className="pergunta3">Botão 3</button>
                            <button className="pergunta4">Botão 4</button>
                            <button className="pergunta5">Botão 5</button>
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}

const container = document.getElementById('react-footer-e-modals');
const root = ReactDOM.createRoot(container);
root.render(<FooterComModals />);