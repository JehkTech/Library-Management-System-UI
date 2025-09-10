import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Download, TrendingUp, BookOpen, Users, DollarSign } from 'lucide-react';
import { useState } from 'react';

const monthlyStats = [
  { month: 'Jan', issued: 145, returned: 142, overdue: 8 },
  { month: 'Feb', issued: 132, returned: 135, overdue: 5 },
  { month: 'Mar', issued: 158, returned: 150, overdue: 12 },
  { month: 'Apr', issued: 167, returned: 160, overdue: 15 },
  { month: 'May', issued: 189, returned: 175, overdue: 9 },
  { month: 'Jun', issued: 203, returned: 195, overdue: 7 },
  { month: 'Jul', issued: 178, returned: 180, overdue: 6 },
  { month: 'Aug', issued: 195, returned: 188, overdue: 11 },
];

const categoryData = [
  { name: 'Fiction', value: 45, color: '#ef4444' },
  { name: 'Computer Science', value: 25, color: '#3b82f6' },
  { name: 'Mathematics', value: 15, color: '#10b981' },
  { name: 'History', value: 10, color: '#FFD77B' },
  { name: 'Science', value: 5, color: '#8b5cf6' },
];

const membershipData = [
  { type: 'Students', count: 458, percentage: 65 },
  { type: 'Faculty', count: 124, percentage: 18 },
  { type: 'Public', count: 120, percentage: 17 },
];

const finesData = [
  { month: 'Jan', amount: 245.50 },
  { month: 'Feb', amount: 189.75 },
  { month: 'Mar', amount: 312.25 },
  { month: 'Apr', amount: 287.00 },
  { month: 'May', amount: 195.50 },
  { month: 'Jun', amount: 156.25 },
  { month: 'Jul', amount: 298.75 },
  { month: 'Aug', amount: 234.50 },
];

export function ReportsAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2>Reports & Analytics</h2>
          <p className="text-muted-foreground">Comprehensive library statistics and insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-[#FFD77B] hover:bg-[#fee772] text-gray-800">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-[#FFD77B] to-[#fee772] border-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">Total Circulation</p>
                <p className="text-3xl font-bold text-gray-900">1,467</p>
                <p className="text-xs text-gray-700 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% from last month
                </p>
              </div>
              <BookOpen className="h-8 w-8 text-gray-700" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] border-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Active Members</p>
                <p className="text-3xl font-bold text-white">702</p>
                <p className="text-xs text-blue-100 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8% from last month
                </p>
              </div>
              <Users className="h-8 w-8 text-white" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#10b981] to-[#059669] border-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Return Rate</p>
                <p className="text-3xl font-bold text-white">94.2%</p>
                <p className="text-xs text-green-100 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +2.1% from last month
                </p>
              </div>
              <BookOpen className="h-8 w-8 text-white" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#f59e0b] to-[#d97706] border-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Total Fines</p>
                <p className="text-3xl font-bold text-white">$1,919</p>
                <p className="text-xs text-yellow-100 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  -5% from last month
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-white" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Circulation Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="issued" fill="#FFD77B" name="Issued" />
                <Bar dataKey="returned" fill="#10b981" name="Returned" />
                <Bar dataKey="overdue" fill="#ef4444" name="Overdue" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Book Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name} ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Membership Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {membershipData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: ['#3b82f6', '#7c3aed', '#059669'][index] }}
                    ></div>
                    <span className="font-medium">{item.type}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-bold">{item.count}</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full"
                        style={{ 
                          width: `${item.percentage}%`,
                          backgroundColor: ['#3b82f6', '#7c3aed', '#059669'][index]
                        }}
                      ></div>
                    </div>
                    <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fine Collection Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={finesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#f59e0b" 
                  strokeWidth={3}
                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Summary Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Borrowed Books</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', count: 42 },
                { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', count: 38 },
                { title: 'To Kill a Mockingbird', author: 'Harper Lee', count: 35 },
                { title: 'Pride and Prejudice', author: 'Jane Austen', count: 32 },
                { title: 'Clean Code', author: 'Robert C. Martin', count: 29 },
              ].map((book, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">{book.title}</p>
                    <p className="text-sm text-muted-foreground">by {book.author}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{book.count}</p>
                    <p className="text-xs text-muted-foreground">borrows</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Most Active Borrowers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Sarah Johnson', type: 'Faculty', count: 28 },
                { name: 'John Smith', type: 'Student', count: 24 },
                { name: 'Emily Davis', type: 'Student', count: 22 },
                { name: 'Mike Chen', type: 'Public', count: 19 },
                { name: 'Alex Wilson', type: 'Faculty', count: 17 },
              ].map((borrower, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">{borrower.name}</p>
                    <p className="text-sm text-muted-foreground">{borrower.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{borrower.count}</p>
                    <p className="text-xs text-muted-foreground">books</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}