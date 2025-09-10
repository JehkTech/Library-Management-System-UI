import { Book, Users, BookOpen, AlertCircle, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface DashboardStats {
  totalBooks: number;
  availableBooks: number;
  totalBorrowers: number;
  activeLoans: number;
  overdueBooks: number;
}

const mockStats: DashboardStats = {
  totalBooks: 2450,
  availableBooks: 1892,
  totalBorrowers: 856,
  activeLoans: 558,
  overdueBooks: 23,
};

const recentActivities = [
  {
    id: 1,
    type: 'return',
    message: 'John Smith returned "The Great Gatsby"',
    time: '2 hours ago',
    color: 'bg-green-500'
  },
  {
    id: 2,
    type: 'new_book',
    message: 'New book added: "Introduction to Python"',
    time: '4 hours ago',
    color: 'bg-[#FFD77B]'
  },
  {
    id: 3,
    type: 'borrow',
    message: 'Sarah Johnson borrowed "Data Structures"',
    time: '6 hours ago',
    color: 'bg-blue-500'
  },
  {
    id: 4,
    type: 'overdue',
    message: '"Advanced Mathematics" is 3 days overdue',
    time: '1 day ago',
    color: 'bg-red-500'
  },
];

const quickActions = [
  {
    id: 'add-book',
    label: 'Add Book',
    icon: Book,
    color: 'bg-[#FFD77B] hover:bg-[#fee772] text-gray-800',
    description: 'Add new book to catalog',
    targetSection: 'books'
  },
  {
    id: 'add-member',
    label: 'Add Member',
    icon: Users,
    color: 'bg-blue-500 hover:bg-blue-600 text-white',
    description: 'Register new member',
    targetSection: 'borrowers'
  },
  {
    id: 'issue-book',
    label: 'Issue Book',
    icon: BookOpen,
    color: 'bg-green-500 hover:bg-green-600 text-white',
    description: 'Issue book to member',
    targetSection: 'loans'
  },
  {
    id: 'view-reports',
    label: 'View Reports',
    icon: AlertCircle,
    color: 'bg-orange-500 hover:bg-orange-600 text-white',
    description: 'Generate reports',
    targetSection: 'reports'
  },
];

interface DashboardProps {
  onSectionChange: (section: string) => void;
}

export function Dashboard({ onSectionChange }: DashboardProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's what's happening at your library today.</p>
        </div>
        <div className="hidden sm:flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-green-700">All Systems Online</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden border-0 shadow-sm bg-gradient-to-br from-[#FFD77B] to-[#fee772]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800 mb-1">Total Books</p>
                <div className="flex items-baseline space-x-2">
                  <p className="text-3xl font-bold text-gray-900">{mockStats.totalBooks.toLocaleString()}</p>
                  <div className="flex items-center text-xs text-gray-700">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>+12%</span>
                  </div>
                </div>
                <p className="text-xs text-gray-700 mt-1">Complete catalog</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <Book className="h-6 w-6 text-gray-800" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-sm bg-gradient-to-br from-green-500 to-green-600">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-100 mb-1">Available Books</p>
                <div className="flex items-baseline space-x-2">
                  <p className="text-3xl font-bold text-white">{mockStats.availableBooks.toLocaleString()}</p>
                  <div className="flex items-center text-xs text-green-100">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>+8%</span>
                  </div>
                </div>
                <p className="text-xs text-green-100 mt-1">Ready to borrow</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-sm bg-gradient-to-br from-blue-500 to-blue-600">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-100 mb-1">Active Members</p>
                <div className="flex items-baseline space-x-2">
                  <p className="text-3xl font-bold text-white">{mockStats.totalBorrowers.toLocaleString()}</p>
                  <div className="flex items-center text-xs text-blue-100">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>+5%</span>
                  </div>
                </div>
                <p className="text-xs text-blue-100 mt-1">Registered users</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-sm bg-gradient-to-br from-red-500 to-red-600">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-100 mb-1">Overdue Books</p>
                <div className="flex items-baseline space-x-2">
                  <p className="text-3xl font-bold text-white">{mockStats.overdueBooks}</p>
                  <div className="flex items-center text-xs text-red-100">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    <span>-2%</span>
                  </div>
                </div>
                <p className="text-xs text-red-100 mt-1">Requires attention</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="xl:col-span-2">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900">Recent Activity</CardTitle>
                <button 
                  type="button"
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  View All
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50/50 rounded-2xl hover:bg-gray-100/50 transition-colors">
                    <div className={`w-3 h-3 rounded-full ${activity.color} mt-2 flex-shrink-0`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 leading-relaxed">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
              <p className="text-sm text-gray-500">Common tasks and shortcuts</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.id}
                      type="button"
                      onClick={() => onSectionChange(action.targetSection)}
                      className={`p-4 rounded-2xl transition-all duration-200 text-left group hover:shadow-sm ${action.color}`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{action.label}</p>
                          <p className="text-xs opacity-75 mt-0.5">{action.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Books Issued Today</p>
                <p className="text-2xl font-bold text-purple-900 mt-1">47</p>
              </div>
              <div className="w-10 h-10 bg-purple-200 rounded-xl flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-purple-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 to-orange-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Books Returned Today</p>
                <p className="text-2xl font-bold text-orange-900 mt-1">52</p>
              </div>
              <div className="w-10 h-10 bg-orange-200 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-orange-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-teal-50 to-teal-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-teal-700">New Members Today</p>
                <p className="text-2xl font-bold text-teal-900 mt-1">8</p>
              </div>
              <div className="w-10 h-10 bg-teal-200 rounded-xl flex items-center justify-center">
                <Users className="h-5 w-5 text-teal-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}