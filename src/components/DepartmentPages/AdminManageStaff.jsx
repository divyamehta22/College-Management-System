import React, { useState } from "react";
import { Button } from "../Common/Button";
import { Dialog, DialogContent, DialogTitle } from "../Common/Dialog";
import { Input } from "../Common/Input";
import { Trash2, Plus } from "lucide-react";

const initialStaff = [
  { id: 1, name: "Dr. Smith", email: "smith@college.edu", department: "Physics", role: "Professor" },
  { id: 2, name: "Jane Doe", email: "jane@college.edu", department: "Chemistry", role: "Lecturer" },
  { id: 3, name: "John Lee", email: "john@college.edu", department: "Math", role: "Assistant" },
];

export default function AdminManageStaff() {
  const [staffList, setStaffList] = useState(initialStaff);
  const [open, setOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({ name: "", email: "", department: "", role: "" });

  const handleAdd = () => {
    const id = Math.max(...staffList.map(s => s.id)) + 1;
    setStaffList([...staffList, { id, ...newStaff }]);
    setNewStaff({ name: "", email: "", department: "", role: "" });
    setOpen(false);
  };

  const handleDelete = (id) => {
    setStaffList(staffList.filter((staff) => staff.id !== id));
  };

  return (
    <div className="p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Manage Staff</h2>
        <Button onClick={() => setOpen(true)}><Plus className="mr-2 h-4 w-4" /> Add Staff</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Department</th>
              <th className="text-left p-2">Role</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map((staff) => (
              <tr key={staff.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{staff.name}</td>
                <td className="p-2">{staff.email}</td>
                <td className="p-2">{staff.department}</td>
                <td className="p-2">{staff.role}</td>
                <td className="p-2">
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(staff.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>Add New Staff</DialogTitle>
          <div className="grid gap-4 py-4">
            <Input placeholder="Name" value={newStaff.name} onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })} />
            <Input placeholder="Email" value={newStaff.email} onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })} />
            <Input placeholder="Department" value={newStaff.department} onChange={(e) => setNewStaff({ ...newStaff, department: e.target.value })} />
            <Input placeholder="Role" value={newStaff.role} onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })} />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleAdd}>Add Staff</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
