import './style/index.less';
import { BrowserRouter } from 'react-router-dom';
import Routes from 'app/routes';

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
