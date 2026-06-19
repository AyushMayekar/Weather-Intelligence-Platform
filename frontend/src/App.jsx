import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import HistoryPage from './pages/HistoryPage';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
