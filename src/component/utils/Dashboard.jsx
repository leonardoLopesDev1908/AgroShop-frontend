
import React, {useState, useEffect} from "react";
import { Card, Form} from "react-bootstrap"
import {
  BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, PieChart,
  Pie, Cell} from "recharts";
import {getTotalProdutos, getTotalClientes, 
        getTotalVendas, getProdutosMaisVendidos,
        getVendasPorMes} from "../services/Dashboardservice"


const Dashboard = () => {
  const [vendasPorMes, setVendasPorMes] = useState([]);
  const [produtosMaisVendidos, setProdutosMaisVendidos] = useState([])
  const [totalVendas, setTotalVendas] = useState(0)
  const [produtos, setProdutos] = useState(0)
  const [clientes, setClientes] = useState(0)
  const [anoSelecionado, setAnoSelecionado] = useState(new Date().getFullYear());
  const [anoVendas, setAnoVendas] = useState(new Date().getFullYear())

  const hoje = new Date();
  const anoAtual = hoje.getFullYear();
  const mesAtual = hoje.getMonth() + 1;
  const inicioPadrao =
    mesAtual <= 6 ? `${anoAtual}-01-01` : `${anoAtual}-07-01`;
  const fimPadrao =
    mesAtual <= 6 ? `${anoAtual}-06-30` : `${anoAtual}-12-31`;

  const [dataInicio, setDataInicial] = useState(inicioPadrao);
  const [dataFim, setDataFinal] = useState(fimPadrao);

  const [error, setError] = useState("")

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const produtosValue = await getTotalProdutos()
        const clientesValue = await getTotalClientes()
        const vendasValue = await getTotalVendas()
        const vendasMes = await getVendasPorMes(anoSelecionado)
        const produtosVendidos = await getProdutosMaisVendidos(dataInicio, dataFim)

        setProdutos(produtosValue.data);
        setClientes(clientesValue.data);
        setTotalVendas(vendasValue.data)

        const produtosArray = Object.entries(produtosVendidos.data)
                                    .map(([nome, quantidade]) => ({
          nome,
          quantidade
        }));
        setProdutosMaisVendidos(produtosArray);

        const vendasArray = Object.entries(vendasMes.data)
                                    .map(([mes, valor]) => ({
          mes,
          valor
        }));
        setVendasPorMes(vendasArray)

        console.log("Vendas: ", vendasArray)
        console.log("Vendas: ", produtosArray)
      } catch (err) {
        console.error("Erro ao buscar dados do dashboard:", err);
        setError(err.message || "Erro desconhecido");
      }
    };

    fetchDados();
  }, []);

  useEffect(() => {
    if (anoSelecionado) {
      getVendasPorMes(anoSelecionado)
        .then(response => {
          const vendasArray = Object.entries(response.data)
                                    .map(([mes, valor]) => ({ mes, valor }));
          setVendasPorMes(vendasArray);
        })
        .catch(err => setError(err.message));
      }
    console.log("vendas: ", vendasPorMes)
    console.log("anoSeleciona: ", anoSelecionado)
  }, [anoSelecionado]);

  useEffect(() => {
    if (dataInicio && dataFim) {
      getProdutosMaisVendidos(dataInicio, dataFim)
        .then((response) => {
          const produtosArray = Object.entries(response.data).map(
            ([nome, quantidade]) => ({ nome, quantidade })
          );
          setProdutosMaisVendidos(produtosArray);
        })
        .catch((err) => setError(err.message));
    }
  }, [dataInicio, dataFim]);

  useEffect(() => {
    if(anoVendas){
        try{
          const vendas = getTotalVendas(anoVendas)
          setTotalVendas(vendas.data)
        }catch(error){
          setError(error.message)
        }
      }
  }, [anoVendas])

  const cores = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="dashboard-container">
      <div className="dashboard-indicators">
        <Card className="dashboard-card">
          <Card.Body className="p-5">
            <Card.Header className="chart-header">
              <Card.Title className="text-gray-500 text-sm">Total de Vendas</Card.Title>
              <Form>
                <Form.Group>
                  <Form.Label>Ano</Form.Label>
                  <Form.Select
                    value={anoVendas}
                    onChange={(e) => setAnoVendas(e.target.value)}
                  >
                    <option value="">Selecione o ano</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Card.Header>
              <p 
                className="text-2xl font-semibold"
                style={{color:"green"}}
                >
                R$ {totalVendas}
              </p>
          </Card.Body>
        </Card>

        <Card className="dashboard-card">
          <Card.Body className="p-5">
            <Card.Title className="text-gray-500 text-sm">Clientes Ativos</Card.Title>
            <p className="text-2xl font-semibold">{clientes}</p>
          </Card.Body>
        </Card>

        <Card className="dashboard-card">
          <Card.Body className="p-5">
            <Card.Title className="text-gray-500 text-sm">Produtos cadastrados</Card.Title>
            <p className="text-2xl font-semibold">{produtos}</p>
          </Card.Body>
        </Card>

        <Card className="dashboard-card profit">
          <Card.Body className="p-5">
            <Card.Title className="text-gray-500 text-sm">Lucro</Card.Title>
            <p className="text-2xl font-semibold text-green-600">(Não implementado)</p>
          </Card.Body>
        </Card>
      </div>

      <div className="dashboard-charts">
        <Card className="chart-card">
          <Card.Body className="p-5">
            <Card.Header className="chart-header">
              <Card.Title className="text-lg font-semibold mb-4">Vendas por Mês</Card.Title>
              <Form>
                <Form.Group>
                  <Form.Label>Ano</Form.Label>
                  <Form.Select
                    value={anoSelecionado}
                    onChange={(e) => setAnoSelecionado(e.target.value)}
                  >
                    <option value="">Selecione o ano</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Card.Header>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={vendasPorMes}>
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="valor" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card.Body>
        </Card>

        <Card className="chart-card">
          <Card.Body className="p-5">
            <Card.Header className="chart-header">
              <Card.Title className="text-lg font-semibold mb-4">Produtos mais vendidos</Card.Title>
              <Form>
                <Form.Group>
                  <Form.Label>Data Inicial</Form.Label>
                  <Form.Control
                    type="date"
                    value={dataInicio}
                    onChange={(e) => setDataInicial(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Form>
              <Form>
                <Form.Group>
                  <Form.Label>Data Final</Form.Label>
                  <Form.Control
                    type="date"
                    value={dataFim}
                    onChange={(e) => setDataFinal(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Form>
            </Card.Header>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={produtosMaisVendidos}
                  dataKey="quantidade"
                  nameKey="nome"
                  outerRadius={100}
                  label
                >
                  {produtosMaisVendidos.map((_, i) => (
                    <Cell key={i} fill={cores[i % cores.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

