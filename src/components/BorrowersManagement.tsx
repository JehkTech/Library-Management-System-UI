import { useState } from 'react';
import { Search, Plus, Edit, Trash2, User, Mail, Phone, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Avatar, AvatarFallback } from './ui/avatar';

interface Borrower {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipType: 'student' | 'faculty' | 'public';
  joinDate: string;
  activeLoans: number;
  totalBorrowed: number;
  fines: number;
  status: 'active' | 'suspended' | 'expired';
}

const mockBorrowers: Borrower[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    membershipType: 'student',
    joinDate: '2024-01-15',
    activeLoans: 2,
    totalBorrowed: 15,
    fines: 0,
    status: 'active',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    phone: '+1 (555) 987-6543',
    membershipType: 'faculty',
    joinDate: '2023-08-20',
    activeLoans: 1,
    totalBorrowed: 32,
    fines: 0,
    status: 'active',
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike.chen@email.com',
    phone: '+1 (555) 456-7890',
    membershipType: 'public',
    joinDate: '2024-03-10',
    activeLoans: 0,
    totalBorrowed: 8,
    fines: 15.50,
    status: 'active',
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@student.edu',
    phone: '+1 (555) 321-0987',
    membershipType: 'student',
    joinDate: '2023-12-05',
    activeLoans: 3,
    totalBorrowed: 22,
    fines: 0,
    status: 'suspended',
  },
];

export function BorrowersManagement() {
  const [borrowers, setBorrowers] = useState<Borrower[]>(mockBorrowers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingBorrower, setEditingBorrower] = useState<Borrower | null>(null);

  const filteredBorrowers = borrowers.filter(borrower => {
    const matchesSearch = borrower.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         borrower.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         borrower.phone.includes(searchTerm);
    const matchesType = selectedType === 'all' || borrower.membershipType === selectedType;
    return matchesSearch && matchesType;
  });

  const getStatusBadge = (status: Borrower['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-[#10b981] text-white">Active</Badge>;
      case 'suspended':
        return <Badge className="bg-[#ef4444] text-white">Suspended</Badge>;
      case 'expired':
        return <Badge className="bg-[#6b7280] text-white">Expired</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getMembershipBadge = (type: Borrower['membershipType']) => {
    const colors = {
      'student': 'bg-[#3b82f6] text-white',
      'faculty': 'bg-[#7c3aed] text-white',
      'public': 'bg-[#059669] text-white',
    };
    return (
      <Badge className={colors[type]}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2>Borrowers Management</h2>
          <p className="text-muted-foreground">Manage library members and borrowers</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#FFD77B] hover:bg-[#fee772] text-gray-800">
              <Plus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Member</DialogTitle>
            </DialogHeader>
            <BorrowerForm onClose={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] border-none">
          <CardContent className="p-6">
            <div className="flex items-center">
              <User className="h-8 w-8 text-white" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-white">
                  {borrowers.filter(b => b.membershipType === 'student').length}
                </p>
                <p className="text-blue-100 text-sm">Students</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#7c3aed] to-[#5b21b6] border-none">
          <CardContent className="p-6">
            <div className="flex items-center">
              <User className="h-8 w-8 text-white" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-white">
                  {borrowers.filter(b => b.membershipType === 'faculty').length}
                </p>
                <p className="text-purple-100 text-sm">Faculty</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#059669] to-[#047857] border-none">
          <CardContent className="p-6">
            <div className="flex items-center">
              <User className="h-8 w-8 text-white" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-white">
                  {borrowers.filter(b => b.membershipType === 'public').length}
                </p>
                <p className="text-green-100 text-sm">Public</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#ef4444] to-[#dc2626] border-none">
          <CardContent className="p-6">
            <div className="flex items-center">
              <User className="h-8 w-8 text-white" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-white">
                  {borrowers.filter(b => b.status === 'suspended').length}
                </p>
                <p className="text-red-100 text-sm">Suspended</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Members Directory</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search members by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="all">All Types</option>
              <option value="student">Students</option>
              <option value="faculty">Faculty</option>
              <option value="public">Public</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Active Loans</TableHead>
                  <TableHead>Fines</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBorrowers.map((borrower) => (
                  <TableRow key={borrower.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback className="bg-[#FFD77B] text-gray-800">
                            {getInitials(borrower.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{borrower.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Joined {new Date(borrower.joinDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                          {borrower.email}
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                          {borrower.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getMembershipBadge(borrower.membershipType)}</TableCell>
                    <TableCell>{getStatusBadge(borrower.status)}</TableCell>
                    <TableCell>
                      <Badge variant={borrower.activeLoans > 0 ? "default" : "secondary"}>
                        {borrower.activeLoans}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {borrower.fines > 0 ? (
                        <Badge className="bg-[#ef4444] text-white">
                          ${borrower.fines.toFixed(2)}
                        </Badge>
                      ) : (
                        <Badge className="bg-[#10b981] text-white">$0.00</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingBorrower(borrower)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {editingBorrower && (
        <Dialog open={!!editingBorrower} onOpenChange={() => setEditingBorrower(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Member</DialogTitle>
            </DialogHeader>
            <BorrowerForm
              borrower={editingBorrower}
              onClose={() => setEditingBorrower(null)}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function BorrowerForm({ borrower, onClose }: { borrower?: Borrower; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: borrower?.name || '',
    email: borrower?.email || '',
    phone: borrower?.phone || '',
    membershipType: borrower?.membershipType || 'student',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the borrower data
    console.log('Saving borrower:', formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="type">Membership Type</Label>
        <select
          id="type"
          value={formData.membershipType}
          onChange={(e) => setFormData({ ...formData, membershipType: e.target.value as any })}
          className="w-full px-3 py-2 border rounded-md bg-background"
          required
        >
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
          <option value="public">Public</option>
        </select>
      </div>
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" className="bg-[#FFD77B] hover:bg-[#fee772] text-gray-800">
          {borrower ? 'Update' : 'Add'} Member
        </Button>
      </div>
    </form>
  );
}