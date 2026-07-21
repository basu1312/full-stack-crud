import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import { CustomerPage } from './pages/CustomerPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CustomerPage />
    </QueryClientProvider>
  );
}

export default App;
