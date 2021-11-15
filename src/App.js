import { BrowserRouter } from 'react-router-dom';
import Footer from './components/footer/footer';
import Top from './components/top/top';
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
