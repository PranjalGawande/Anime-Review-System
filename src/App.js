// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import AnimeDetails from './pages/AnimeDetails';
import SearchResult from './pages/SearchResult';
import Explore from './pages/Explore';
import ViewMore from './pages/ViewMore';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <Router>
        <Toaster
          toastOptions={{
            className: '',
            style: {
              width: 'auto',
              padding: '16px',
              fontSize: '1rem',
              color: '#713200',
            },
          }}
        />
        <Header />
        {/* <Nav /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anime/:id" element={<AnimeDetails />} />
          <Route path='/search/:query' element={<SearchResult />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/viewmore/:type' element={<ViewMore />} />
          {/* {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="/product" element={<Product />} /> */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
