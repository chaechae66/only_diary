import { BrowserRouter } from 'react-router-dom';
import Footer from './components/shared/footer/footer';
import Top from './components/shared/top/top';
import Routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <Top/>
        <Routes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
