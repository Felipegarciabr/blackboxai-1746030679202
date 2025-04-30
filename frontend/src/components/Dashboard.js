import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const Dashboard = () => {
  // State placeholders
  const [data, setData] = useState(null);
  const [filters, setFilters] = useState({
    period: 'last_28_days',
    device: 'all',
    location: 'all',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data from backend API (placeholder)
  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/search-console-data', {
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [filters]);

  // Placeholder chart data
  const chartData = {
    labels: ['Keyword 1', 'Keyword 2', 'Keyword 3', 'Keyword 4', 'Keyword 5'],
    datasets: [
      {
        label: 'Cliques',
        data: [100, 200, 150, 300, 250],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
      {
        label: 'Impressões',
        data: [500, 700, 600, 900, 850],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
      },
    ],
  };

  // Placeholder SEO recommendations
  const recommendations = [
    'Palavras com muita impressão e pouco clique: otimize os títulos e descrições.',
    'Foque em melhorar a posição média das palavras-chave com CTR baixa.',
  ];

  // CSV download handler (placeholder)
  const handleDownloadCSV = () => {
    // TODO: Implement CSV download based on data
    alert('Download CSV ainda não implementado.');
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard SEO</h1>
        <button
          onClick={handleDownloadCSV}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
          title="Baixar dados em CSV"
        >
          <i className="fas fa-download mr-2"></i> Baixar CSV
        </button>
      </header>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          Erro: {error}
        </div>
      )}

      {loading && <p>Carregando dados...</p>}

      {!loading && data && (
        <>
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Filtros</h2>
            <div className="flex space-x-4">
              <select
                value={filters.period}
                onChange={(e) => setFilters({ ...filters, period: e.target.value })}
                className="border rounded p-2"
                title="Filtrar por período"
              >
                <option value="last_7_days">Últimos 7 dias</option>
                <option value="last_28_days">Últimos 28 dias</option>
                <option value="last_3_months">Últimos 3 meses</option>
              </select>
              <select
                value={filters.device}
                onChange={(e) => setFilters({ ...filters, device: e.target.value })}
                className="border rounded p-2"
                title="Filtrar por dispositivo"
              >
                <option value="all">Todos os dispositivos</option>
                <option value="desktop">Desktop</option>
                <option value="mobile">Mobile</option>
                <option value="tablet">Tablet</option>
              </select>
              <select
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="border rounded p-2"
                title="Filtrar por localização"
              >
                <option value="all">Todas as localizações</option>
                {/* Add more locations as needed */}
              </select>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Gráficos</h2>
            <Line data={chartData} />
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Recomendações de SEO</h2>
            <ul className="list-disc list-inside space-y-2">
              {recommendations.map((rec, idx) => (
                <li key={idx}>{rec}</li>
              ))}
            </ul>
          </section>

          <section className="mb-6">
            <p className="italic text-gray-600">
              Clique aqui para ver suas palavras mais fortes
            </p>
          </section>
        </>
      )}

      {!loading && !data && !error && (
        <p>Nenhum dado disponível. Conecte sua conta Google para começar.</p>
      )}
    </div>
  );
};

export default Dashboard;
