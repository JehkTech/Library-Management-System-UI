import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { BooksManagement } from './components/BooksManagement';
import { BorrowersManagement } from './components/BorrowersManagement';
import { LoansManagement } from './components/LoansManagement';
import { ReportsAnalytics } from './components/ReportsAnalytics';

export default function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard onSectionChange={setActiveSection} />;
      case 'books':
        return <BooksManagement />;
      case 'borrowers':
        return <BorrowersManagement />;
      case 'loans':
        return <LoansManagement />;
      case 'reports':
        return <ReportsAnalytics />;
      case 'settings':
        return (
          <div className="space-y-6">
            <div>
              <h2>Settings</h2>
              <p className="text-muted-foreground">Configure your library management system</p>
            </div>
            <div className="bg-gradient-to-br from-[#FFD77B] to-[#fee772] rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Settings Panel</h3>
              <p className="text-gray-700">System configuration options will be available here.</p>
            </div>
          </div>
        );
      default:
        return <Dashboard onSectionChange={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navigation 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      
      <div className="pl-0 lg:pl-72">
        <main className="min-h-screen pt-16">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            {renderActiveSection()}
          </div>
        </main>
      </div>
    </div>
  );
}