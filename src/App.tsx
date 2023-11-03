import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import Bookmarks from './Bookmarks/Bookmarks';
import SideBar from './SideBar/SideBar';
import { useState } from 'react';
import { Tab } from './globalTypes';
import ErrorBoundary from './ErrorBoundary';
import ErrorBoundaryUI from './ErrorBoundaryUI/ErrorBoundaryUI';

const queryClient = new QueryClient()

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('Bookmarks')
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallback={<ErrorBoundaryUI message='There was an error' />}>
          <div className="App">
          
          <SideBar onChangeTab={(tab: Tab) => setActiveTab(tab)} />
          {activeTab === 'Bookmarks' && <Bookmarks />}
          </div>
      </ErrorBoundary>
      
    </QueryClientProvider>
    
  );
}

export default App;
