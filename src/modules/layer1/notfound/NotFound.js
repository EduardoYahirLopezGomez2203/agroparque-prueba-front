import React from 'react';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.message}>Page Not Found</p>
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
    backgroundColor: '#fff',
    color: '#343a40',
  },
  title: {
    fontSize: '6rem',
    margin: 0,
  },
  message: {
    fontSize: '1.5rem',
  },
  link: {
    fontSize: '1rem',
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default NotFound;
