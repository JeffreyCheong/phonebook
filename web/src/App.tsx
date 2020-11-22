import React from 'react';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import Main from './pages/Main';
import { SearchProvider } from './providers/SearchProvider';

const App:React.FC = () => {

  return (
    <>
      <SearchProvider>
        <div style={{textAlign: 'center'}}>
          <Header></Header>
          <Main></Main>
          <Footer></Footer>
        </div> 
      </SearchProvider>
    </>
  )
}

export default App;
