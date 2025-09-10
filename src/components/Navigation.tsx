import { useState } from 'react';
import { Home, Book, Users, BookOpen, BarChart3, Settings, Search, Bell, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'books', label: 'Books', icon: Book },
  { id: 'borrowers', label: 'Borrowers', icon: Users },
  { id: 'loans', label: 'Loans', icon: BookOpen },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 h-16">
        <div className="flex items-center justify-between px-4 py-3 lg:px-6 h-full max-w-full">
          <div className="flex items-center space-x-3 min-w-0">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden flex-shrink-0"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            
            <div className="flex items-center space-x-3 min-w-0">
              <div className="w-8 h-8 bg-gradient-to-br from-[#FFD77B] to-[#fee772] rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                <Book className="h-4 w-4 text-gray-800" />
              </div>
              <h1 className="font-bold text-xl text-gray-900 hidden sm:block truncate">LibraryMS</h1>
            </div>
          </div>

          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search books, members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-48 md:w-64 lg:w-80 bg-gray-50/50 border-gray-200 focus:bg-white h-9"
              />
            </div>
            
            <Button variant="ghost" size="sm" className="relative flex-shrink-0">
              <Bell className="h-5 w-5 text-gray-600" />
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center p-0 border-2 border-white">
                3
              </Badge>
            </Button>
            
            <Avatar className="h-8 w-8 ring-2 ring-gray-100 flex-shrink-0">
              <AvatarFallback className="bg-gradient-to-br from-[#FFD77B] to-[#fee772] text-gray-800 font-medium">
                A
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 w-72 transform transition-transform duration-300 ease-in-out bg-white border-r border-gray-100 hidden lg:block">
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center px-6 py-4 mt-16 flex-shrink-0">
            <div className="w-2 h-8 bg-gradient-to-b from-[#FFD77B] to-[#fee772] rounded-full mr-4"></div>
            <div>
              <h3 className="font-semibold text-gray-900">Navigation</h3>
              <p className="text-sm text-gray-500">Manage your library</p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-6 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-left transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-[#FFD77B] to-[#fee772] text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-gray-800' : 'text-gray-500 group-hover:text-gray-700'}`} />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-gray-800 rounded-full"></div>
                  )}
                </button>
              );
            })}
          </nav>
          
          {/* Sidebar Footer */}
          <div className="p-6 border-t border-gray-100">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <h4 className="font-medium text-gray-900">System Status</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">All systems operational</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Available Books</span>
                  <span className="font-semibold text-gray-900">1,892</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Active Loans</span>
                  <span className="font-semibold text-gray-900">558</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-80 bg-white shadow-2xl z-50 lg:hidden transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#FFD77B] to-[#fee772] rounded-xl flex items-center justify-center shadow-sm">
                    <Book className="h-4 w-4 text-gray-800" />
                  </div>
                  <h1 className="font-bold text-xl text-gray-900">LibraryMS</h1>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Mobile Search */}
              <div className="p-6 border-b border-gray-100">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search books, members..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-50/50 w-full"
                  />
                </div>
              </div>
              
              <nav className="flex-1 px-6 py-6 space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        onSectionChange(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-left transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-[#FFD77B] to-[#fee772] text-gray-900 shadow-sm'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${isActive ? 'text-gray-800' : 'text-gray-500'}`} />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
              
              <div className="p-6 border-t border-gray-100">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <h4 className="font-medium text-gray-900">System Status</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">All systems operational</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Available Books</span>
                      <span className="font-semibold text-gray-900">1,892</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Active Loans</span>
                      <span className="font-semibold text-gray-900">558</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}