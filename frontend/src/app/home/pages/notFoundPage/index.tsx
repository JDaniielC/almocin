import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div style={
      {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: '1rem'
      }
    }>
      <h1>Página não encontrada</h1>

      <p>Desculpe, mas a página que você está procurando não existe.</p>

      <p>
        <Link to="/">Voltar para a página inicial</Link>
      </p>
    </div>
  );
}

export default NotFoundPage;