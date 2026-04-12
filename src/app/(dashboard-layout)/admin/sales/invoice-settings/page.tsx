'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

const mockWarrantyTemplates = [
  { id: '1', name: '1 Year Official Warranty', duration: '12 Months', status: 'Active' },
  { id: '2', name: '6 Months Warranty', duration: '6 Months', status: 'Active' },
  { id: '3', name: '3 Months Display Warranty', duration: '3 Months', status: 'Active' },
];

const mockTermsTemplates = [
  { id: '1', title: 'Standard Sale Terms', content: 'Goods once sold cannot be returned unless defective...', status: 'Active' },
  { id: '2', title: 'EMI Terms', content: 'EMI is subject to bank approval. Late fee applies...', status: 'Active' },
  { id: '3', title: 'Pre-order Conditions', content: 'Advance payment is non-refundable if cancelled...', status: 'Active' },
];

export default function InvoiceSettingsPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Invoice Settings</h1>
        <p className="text-muted-foreground">Manage warranty templates and terms & conditions</p>
      </div>

      <Tabs defaultValue="warranty" className="w-full">
        <TabsList className="grid w-full sm:w-[400px] grid-cols-2">
          <TabsTrigger value="warranty">Warranty Templates</TabsTrigger>
          <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
        </TabsList>
        
        {/* Warranty Tab */}
        <TabsContent value="warranty" className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search templates..." className="pl-8" />
            </div>
            {/* Add Warranty Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Warranty
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Warranty Template</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Template Name</Label>
                    <Input placeholder="e.g. 1 Year Official Warranty" />
                  </div>
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Input placeholder="e.g. 12 Months" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Template</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="bg-card border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <th className="p-4 font-semibold">Title</th>
                  <th className="p-4 font-semibold text-center">Duration</th>
                  <th className="p-4 font-semibold text-center">Status</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y relative">
                {mockWarrantyTemplates.map((template) => (
                  <tr key={template.id} className="hover:bg-muted/30">
                    <td className="p-4 font-medium">{template.name}</td>
                    <td className="p-4 text-center">{template.duration}</td>
                    <td className="p-4 text-center">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">{template.status}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        {/* Edit Warranty Dialog */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-blue-600">
                              <Edit className="w-4 h-4"/>
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Warranty Template</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label>Template Name</Label>
                                <Input defaultValue={template.name} />
                              </div>
                              <div className="space-y-2">
                                <Label>Duration</Label>
                                <Input defaultValue={template.duration} />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="submit">Update Template</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        
                        <Button variant="ghost" size="icon" className="text-red-600">
                          <Trash2 className="w-4 h-4"/>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Terms Tab */}
        <TabsContent value="terms" className="mt-4 space-y-4">
           <div className="flex items-center justify-between">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search terms..." className="pl-8" />
            </div>
            {/* Add Terms Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add T&C
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Terms & Conditions</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input placeholder="e.g. Standard Return Policy" />
                  </div>
                  <div className="space-y-2">
                    <Label>Content</Label>
                    <Textarea 
                      placeholder="Write your terms and conditions here..." 
                      className="min-h-[150px]"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save T&C</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="bg-card border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <th className="p-4 font-semibold w-1/3">Title</th>
                  <th className="p-4 font-semibold">Content Preview</th>
                  <th className="p-4 font-semibold text-center w-24">Status</th>
                  <th className="p-4 font-semibold text-right w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y relative">
                {mockTermsTemplates.map((template) => (
                  <tr key={template.id} className="hover:bg-muted/30">
                    <td className="p-4 font-medium">{template.title}</td>
                    <td className="p-4 text-muted-foreground truncate max-w-[200px]">{template.content}</td>
                    <td className="p-4 text-center">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">{template.status}</span>
                    </td>
                    <td className="p-4 text-right">
                      {/* Flex wrapper for row-wise alignment */}
                      <div className="flex items-center justify-end gap-2">
                        {/* Edit Terms Dialog */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-blue-600">
                              <Edit className="w-4 h-4"/>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Edit Terms & Conditions</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label>Title</Label>
                                <Input defaultValue={template.title} />
                              </div>
                              <div className="space-y-2">
                                <Label>Content</Label>
                                <Textarea 
                                  defaultValue={template.content} 
                                  className="min-h-[150px]"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="submit">Update T&C</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        
                        <Button variant="ghost" size="icon" className="text-red-600">
                          <Trash2 className="w-4 h-4"/>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
