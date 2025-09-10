import { useState } from 'react';
import { Search, Plus, RotateCcw, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback } from './ui/avatar';

interface Loan {
  id: string;
  bookTitle: string;
  bookAuthor: string;
  borrowerName: string;
  borrowerId: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'active' | 'returned' | 'overdue' | 'renewed';
  renewalCount: number;
  fineAmount: number;
}

const mockLoans: Loan[] = [
  {
    id: '1',
    bookTitle: 'The Great Gatsby',
    bookAuthor: 'F. Scott Fitzgerald',
    borrowerName: 'John Smith',
    borrowerId: '1',
    issueDate: '2024-08-15',
    dueDate: '2024-09-15',
    status: 'active',
    renewalCount: 0,
    fineAmount: 0,
  },
  {
    id: '2',
    bookTitle: 'To Kill a Mockingbird',
    bookAuthor: 'Harper Lee',
    borrowerName: 'Sarah Johnson',
    borrowerId: '2',
    issueDate: '2024-08-20',
    dueDate: '2024-09-20',
    status: 'active',
    renewalCount: 1,
    fineAmount: 0,
  },
  {
    id: '3',
    bookTitle: 'Introduction to Algorithms',
    bookAuthor: 'Thomas H. Cormen',
    borrowerName: 'Mike Chen',
    borrowerId: '3',
    issueDate: '2024-07-10',
    dueDate: '2024-08-10',
    status: 'overdue',
    renewalCount: 0,
    fineAmount: 15.50,
  },
  {
    id: '4',
    bookTitle: 'Pride and Prejudice',
    bookAuthor: 'Jane Austen',
    borrowerName: 'Emily Davis',
    borrowerId: '4',
    issueDate: '2024-08-01',
    dueDate: '2024-09-01',
    returnDate: '2024-08-30',
    status: 'returned',
    renewalCount: 0,
    fineAmount: 0,
  },
];

export function LoansManagement() {
  const [loans, setLoans] = useState<Loan[]>(mockLoans);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isIssueDialogOpen, setIsIssueDialogOpen] = useState(false);

  const filteredLoans = loans.filter(loan => {
    const matchesSearch = loan.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.borrowerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.bookAuthor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || loan.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (loan: Loan) => {
    switch (loan.status) {
      case 'active':
        return <Badge className="bg-[#3b82f6] text-white">Active</Badge>;
      case 'returned':
        return <Badge className="bg-[#10b981] text-white">Returned</Badge>;
      case 'overdue':
        return <Badge className="bg-[#ef4444] text-white">Overdue</Badge>;
      case 'renewed':
        return <Badge className="bg-[#f59e0b] text-white">Renewed</Badge>;
      default:
        return <Badge variant="secondary">{loan.status}</Badge>;
    }
  };

  const getDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleReturn = (loanId: string) => {
    setLoans(loans.map(loan => 
      loan.id === loanId 
        ? { ...loan, status: 'returned', returnDate: new Date().toISOString().split('T')[0] }
        : loan
    ));
  };

  const handleRenew = (loanId: string) => {
    setLoans(loans.map(loan => 
      loan.id === loanId 
        ? { 
            ...loan, 
            status: 'renewed',
            renewalCount: loan.renewalCount + 1,
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          }
        : loan
    ));
  };

  const activeLoans = loans.filter(loan => loan.status === 'active' || loan.status === 'renewed').length;
  const overdueLoans = loans.filter(loan => loan.status === 'overdue').length;
  const totalFines = loans.reduce((sum, loan) => sum + loan.fineAmount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2>Loans Management</h2>
          <p className="text-muted-foreground">Track book loans, returns, and renewals</p>
        </div>
        <Dialog open={isIssueDialogOpen} onOpenChange={setIsIssueDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#FFD77B] hover:bg-[#fee772] text-gray-800">
              <Plus className="h-4 w-4 mr-2" />
              Issue Book
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Issue New Book</DialogTitle>
            </DialogHeader>
            <IssueBookForm onClose={() => setIsIssueDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] border-none">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-white" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-white">{activeLoans}</p>
                <p className="text-blue-100 text-sm">Active Loans</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#ef4444] to-[#dc2626] border-none">
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-white" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-white">{overdueLoans}</p>
                <p className="text-red-100 text-sm">Overdue</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#10b981] to-[#059669] border-none">
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-white" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-white">
                  {loans.filter(loan => loan.status === 'returned').length}
                </p>
                <p className="text-green-100 text-sm">Returned</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#f59e0b] to-[#d97706] border-none">
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-white" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-white">${totalFines.toFixed(2)}</p>
                <p className="text-yellow-100 text-sm">Total Fines</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Loan Records</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by book title, author, or borrower..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="returned">Returned</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="renewed">Renewed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Book & Borrower</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Renewals</TableHead>
                  <TableHead>Fine</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLoans.map((loan) => (
                  <TableRow key={loan.id}>
                    <TableCell>
                      <div className="space-y-2">
                        <div>
                          <p className="font-medium">{loan.bookTitle}</p>
                          <p className="text-sm text-muted-foreground">by {loan.bookAuthor}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-[#FFD77B] text-gray-800 text-xs">
                              {getInitials(loan.borrowerName)}
                            </AvatarFallback>
                          </Avatar>
                          <p className="text-sm">{loan.borrowerName}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p>{new Date(loan.issueDate).toLocaleDateString()}</p>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>{new Date(loan.dueDate).toLocaleDateString()}</p>
                        {loan.status !== 'returned' && (
                          <p className="text-xs text-muted-foreground">
                            {getDaysRemaining(loan.dueDate) >= 0 
                              ? `${getDaysRemaining(loan.dueDate)} days left`
                              : `${Math.abs(getDaysRemaining(loan.dueDate))} days overdue`
                            }
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(loan)}</TableCell>
                    <TableCell>
                      <Badge variant={loan.renewalCount > 0 ? "default" : "secondary"}>
                        {loan.renewalCount}x
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {loan.fineAmount > 0 ? (
                        <Badge className="bg-[#ef4444] text-white">
                          ${loan.fineAmount.toFixed(2)}
                        </Badge>
                      ) : (
                        <Badge className="bg-[#10b981] text-white">$0.00</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {loan.status !== 'returned' && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleReturn(loan.id)}
                              className="text-[#10b981] hover:text-[#10b981]"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRenew(loan.id)}
                              className="text-[#f59e0b] hover:text-[#f59e0b]"
                              disabled={loan.renewalCount >= 2}
                            >
                              <RotateCcw className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function IssueBookForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    bookId: '',
    borrowerId: '',
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the loan data
    console.log('Issuing book:', formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="book">Select Book</Label>
        <Select value={formData.bookId} onValueChange={(value) => setFormData({ ...formData, bookId: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a book to issue" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">The Great Gatsby - F. Scott Fitzgerald</SelectItem>
            <SelectItem value="3">Introduction to Algorithms - Thomas H. Cormen</SelectItem>
            <SelectItem value="4">Pride and Prejudice - Jane Austen</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="borrower">Select Borrower</Label>
        <Select value={formData.borrowerId} onValueChange={(value) => setFormData({ ...formData, borrowerId: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a borrower" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">John Smith (john.smith@email.com)</SelectItem>
            <SelectItem value="2">Sarah Johnson (sarah.johnson@university.edu)</SelectItem>
            <SelectItem value="3">Mike Chen (mike.chen@email.com)</SelectItem>
            <SelectItem value="4">Emily Davis (emily.davis@student.edu)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="dueDate">Due Date</Label>
        <Input
          id="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          required
        />
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" className="bg-[#FFD77B] hover:bg-[#fee772] text-gray-800">
          Issue Book
        </Button>
      </div>
    </form>
  );
}