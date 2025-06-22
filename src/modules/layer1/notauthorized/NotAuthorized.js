const NotAuthorized = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>403 - No Autorizado</h1>
      <p style={styles.message}>
        Lo sentimos, no tienes permisos para acceder a esta página.
      </p>
      <a href="/agroparque_prenomina" style={styles.link}>Volver al inicio</a>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#ffff',
    textAlign: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '2.5rem',
    color: '#dc3545',
  },
  message: {
    fontSize: '1.2rem',
    color: '#6c757d',
    margin: '20px 0',
  },
  link: {
    fontSize: '1rem',
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default NotAuthorized;
