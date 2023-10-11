import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import Bookmarks from './Bookmarks/Bookmarks';
import SideBar from './SideBar/SideBar';
import { useState } from 'react';
import { Tab } from './globalTypes';

const queryClient = new QueryClient()

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('Bookmarks')
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
      
      <SideBar onChangeTab={(tab: Tab) => setActiveTab(tab)} />
      {activeTab === 'Bookmarks' && <Bookmarks />}
    </div>
    </QueryClientProvider>
    
  );
}

export default App;
