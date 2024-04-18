// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
// import Product from './pages/Product';
// import Nav from './components/Nav';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        {/* <Nav /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path='/search/:query' element={<SearchResult />} /> */}
          {/* {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="/product" element={<Product />} /> */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
