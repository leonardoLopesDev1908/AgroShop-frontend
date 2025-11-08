import React, { useEffect, useState } from "react";
import { Card, Button, Spinner, Form, Table, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { toast } from "react-toastify";
import { getEnderecos, CadastroEndereco, 
    atualizarUsuario, getUsuarioDados, atualizarSenha } from "../component/services/UserService";

const PerfilUsuario = () => {
  const { user, setUser } = useAuth();
  const [enderecos, setEnderecos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModalPerfil, setShowModalPerfil] = useState(false);
  const [showModalEndereco, setShowModalEndereco] = useState(false)
  const [novoEndereco, setNovoEndereco] = useState(null)
  const [usuarioEditando, setUsuarioEditando] = useState(null)

  const [showModalSenha, setShowModalSenha] = useState(false);
  const [credenciais, setCredenciais] = useState({
    email: "",
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnderecos = async () => {
      try {
        const response = await getEnderecos();
        const usuarioAtual = await getUsuarioDados();

        console.log("Usuario: ", usuarioAtual)
        setUsuarioEditando(usuarioAtual.data)
        setEnderecos(response.data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEnderecos();
  }, []);

  const handleFecharModal = () => {
    setShowModalPerfil(false);
    setShowModalEndereco(false);
    setNovoEndereco(null);
  };

  const handleSalvarEndereco = async () => {
    try{
      const enderecoDTO = {
        endereco: novoEndereco.endereco,
        numero: novoEndereco.numero,
        complemento: novoEndereco.complemento,
        cidade: novoEndereco.cidade,
        estado: novoEndereco.estado,
        cep: novoEndereco.cep
      }
      const response = await CadastroEndereco(enderecoDTO)
      toast.success("Produto atualizado com sucesso!");
      setEnderecos((prev) => [...prev, response]);
      handleFecharModal();
    }catch(error){
      setError(error.message)
    } 

  }

  const handleSalvarUsuario = async () => {
    try{    
      const usuarioDTO = {
        nome: usuarioEditando.nome,
        sobrenome: usuarioEditando.sobrenome,
        email: usuarioEditando.email,
        telefone: usuarioEditando.telefone,
        senhaAtual: usuarioEditando.senhaAtual,
      }
      const response = await atualizarUsuario(usuarioDTO);
      setUser(usuarioDTO)
      handleFecharModal();
    }catch(error){
      setError(error.message)
    }
  }

  const handleEditarSenha = async () => {
    try{
      await atualizarSenha(credenciais.email, credenciais.senhaAtual,
                                            credenciais.novaSenha)
      toast.success("Senha alterada com sucesso!")
    } catch(error){
      setError(error.message)
    }
  }

  if (loading) return <Spinner animation="border" className="m-5" />;
  if (error) return <p className="text-danger text-center mt-5">{error}</p>;

  return (
    <div className="perfil-main">
      <div className="perfil-container">
        <div className="perfil-header">
          <div className="perfil-avatar">
            <div className="avatar-circle">
              {user.nome?.charAt(0)}{user.sobrenome?.charAt(0)}
            </div>
          </div>
          <div className="perfil-header-info">
            <h4>{user.nome} {user.sobrenome}</h4>
          </div>
          <div className="perfil-actions">
            <Button variant="primary" onClick={() => setShowModalPerfil(true)}>
              Editar Perfil
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            >
              Sair
            </Button>
          </div>
        </div>

        <div className="perfil-info">
          <div>
            <h5>Dados pessoais:</h5>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Telefone:</strong> {usuarioEditando.telefone}</p>
            <p><strong>CPF:</strong> {user?.cpf || "Não informado"}</p>
          </div>
          <div>
            <h5>Credenciais</h5>
            <p className="text-muted">
              Suas credenciais são confidenciais. 
            </p>
            <p className="text-muted">
              Não compartilhe suas informações de acesso.
            </p>
            <Button variant="outline-primary" onClick={() => setShowModalSenha(true)}>
              Alterar senha
            </Button>
          </div>
        </div>

        <div className="perfil-enderecos">
          <div className="perfil-title-line">
            <h5>Endereços cadastrados</h5>
            <Button variant="primary" onClick={() => setShowModalEndereco(true)}>
              Novo endereço
            </Button>
          </div>
          {enderecos.length === 0 ? (
            <p className="text-muted">Nenhum endereço cadastrado ainda.</p>
          ) : (
            <div className="enderecos-grid">
              {enderecos.map((end, index) => (
                <div key={index} className="endereco-card">
                  <p><strong>Rua:</strong> {end.endereco}</p>
                  <p><strong>Número:</strong> {end.numero}</p>
                  <p><strong>Bairro:</strong> {end.bairro}</p>
                  <p><strong>Cidade:</strong> {end.cidade}</p>
                  <p><strong>UF:</strong> {end.estado}</p>
                  <p><strong>CEP:</strong> {end.cep}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/*Editar dados do usuário*/}
      <Modal show={showModalPerfil} onHide={() => setShowModalPerfil(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form.Group className="mb-2">
            <Form.Label>Nome</Form.Label>
            <Form.Control 
              type="text" 
              defaultValue={usuarioEditando.nome}
              onChange={(e) =>
                setUsuarioEditando({
                  ...usuarioEditando,
                  nome: e.target.value
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Sobrenome</Form.Label>
            <Form.Control               
              type="text"
              defaultValue={usuarioEditando.sobrenome}
              onChange={(e) =>
                setUsuarioEditando({
                  ...usuarioEditando,
                  sobrenome: e.target.value
                })
              }/>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>E-mail</Form.Label>
            <Form.Control 
              type="text" 
              defaultValue={usuarioEditando.email}
              onChange={(e) =>
                setUsuarioEditando({
                  ...usuarioEditando,
                  email: e.target.value
                })
              }/>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Telefone</Form.Label>
            <Form.Control
              type="text" 
              defaultValue={usuarioEditando.telefone}
              onChange={(e) =>
                setUsuarioEditando({
                  ...usuarioEditando,
                  telefone: e.target.value
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Senha atual</Form.Label>
            <Form.Control
              type="password" 
              onChange={(e) =>
                setUsuarioEditando({
                  ...usuarioEditando,
                  senhaAtual: e.target.value
                })
              }
            />
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleFecharModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSalvarUsuario}>
            Salvar alterações
            </Button>
        </Modal.Footer>
      </Modal>

      {/*Modal para adição de endereço*/}
      <Modal show={showModalEndereco} onHide={() => setShowModalEndereco(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar endereço</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form.Group className="mb-2">
            <Form.Label>Endereço</Form.Label>
            <Form.Control 
              type="text" 
              onChange={(e) => 
                setNovoEndereco({
                ...novoEndereco, 
                endereco: e.target.value
              })
            }
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Número</Form.Label>
            <Form.Control 
              type="number" 
              onChange={(e) =>
                setNovoEndereco({
                  ...novoEndereco,
                  numero: e.target.value
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Complemento</Form.Label>
            <Form.Control type="text"
              onChange={(e) => 
                setNovoEndereco({
                  ...novoEndereco,
                  complemento: e.target.value
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Cidade</Form.Label>
            <Form.Control 
              type="text"
              onChange={(e) => 
                setNovoEndereco({
                  ...novoEndereco,
                  cidade: e.target.value
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Estado</Form.Label>
            <Form.Select
              onChange={(e) => 
                setNovoEndereco({
                  ...novoEndereco,
                  estado: e.target.value
                })}
              disabled={loading}
            >
              <option value="">Selecione um estado</option>
              <option value="AC">AC</option>
              <option value="AL">AL</option>
              <option value="AP">AP</option>
              <option value="AM">AM</option>
              <option value="BA">BA</option>
              <option value="CE">CE</option>
              <option value="DF">DF</option>
              <option value="ES">ES</option>
              <option value="GO">GO</option>
              <option value="MA">MA</option>
              <option value="MT">MT</option>
              <option value="MS">MS</option>
              <option value="MG">MG</option>
              <option value="PA">PA</option>
              <option value="PB">PB</option>
              <option value="PR">PR</option>
              <option value="PE">PE</option>
              <option value="PI">PI</option>
              <option value="RJ">RJ</option>
              <option value="RN">RN</option>
              <option value="RS">RS</option>
              <option value="RO">RO</option>
              <option value="RR">RR</option>
              <option value="SC">SC</option>
              <option value="SP">SP</option>
              <option value="SE">SE</option>
              <option value="TO">TO</option>
            </Form.Select>
          </Form.Group>


          <Form.Group className="mb-2">
            <Form.Label>CEP</Form.Label>
            <Form.Control 
              type="text"
              onChange={(e) => 
                setNovoEndereco({
                  ...novoEndereco,
                  cep: e.target.value
                })
              }
            />
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleFecharModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSalvarEndereco}>
            Salvar alterações
            </Button>
        </Modal.Footer>
      </Modal>

      {/*Editar senha*/}
      <Modal show={showModalSenha} onHide={() => setShowModalSenha(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Alterar senha</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              value={credenciais.email}
              onChange={(e) =>
                setCredenciais({ ...credenciais, email: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Senha atual</Form.Label>
            <Form.Control
              type="password"
              value={credenciais.senhaAtual}
              onChange={(e) =>
                setCredenciais({ ...credenciais, senhaAtual: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nova senha</Form.Label>
            <Form.Control
              type="password"
              value={credenciais.novaSenha}
              onChange={(e) =>
                setCredenciais({ ...credenciais, novaSenha: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirmar nova senha</Form.Label>
            <Form.Control
              type="password"
              value={credenciais.confirmarSenha}
              onChange={(e) =>
                setCredenciais({ ...credenciais, confirmarSenha: e.target.value })
              }
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalSenha(false)}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (credenciais.novaSenha !== credenciais.confirmarSenha) {
                alert("As senhas não coincidem!");
                return;
              }
              handleEditarSenha()
              setShowModalSenha(false);
            }}
          >
            Salvar nova senha
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PerfilUsuario;
