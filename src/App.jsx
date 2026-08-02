import React from 'react';
import Header from './components/Header';
import FoundationsModule from './components/FoundationsModule';
import FoundationsDetail from './components/FoundationsDetail';
import UsersModule from './components/UsersModule';
import UsersServices from './components/UsersServices';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <>
      <Header />
      <FoundationsModule />
      <FoundationsDetail />
      <UsersModule />
      <UsersServices />
      <Footer />
    </>
  );
}

export default App;
