import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Home from './pages/Home';
import FormBuilder from './pages/FormBuilder';
import FormFiller from './pages/FormFiller';
import Responses from './pages/Responses';
import { Navbar } from './components/layout/Navbar';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-slate-50 flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/forms/new" element={<FormBuilder />} />
              <Route path="/forms/:id/fill" element={<FormFiller />} />
              <Route path="/forms/:id/responses" element={<Responses />} />
            </Routes>
          </main>
          <footer className="py-12 text-center text-slate-400 text-sm border-t border-slate-100 bg-white">
            <p>© 2026 Forms Lite. Built for efficiency.</p>
          </footer>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
