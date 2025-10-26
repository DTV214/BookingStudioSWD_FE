"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PricingData, PriceTablePayload, PriceItem, PriceRule, PriceItemPayload, PriceRulePayload, usePriceItems, usePriceRules } from "@/infrastructure/AdminAPI/PricingManagementAPI";

interface Props {
  priceTables: PricingData[];
  onCreatePriceTable: (priceData: PriceTablePayload) => Promise<PricingData>;
  onUpdatePriceTable: (id: string, priceData: Partial<PriceTablePayload>) => Promise<PricingData>;
  onDeletePriceTable: (id: string) => Promise<void>;
}

// PricingManagement component for admin pricing management
export default function PricingManagement({ priceTables, onCreatePriceTable, onUpdatePriceTable, onDeletePriceTable }: Props) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isPriceItemDetailModalOpen, setIsPriceItemDetailModalOpen] = useState(false);
  const [isAddPriceItemModalOpen, setIsAddPriceItemModalOpen] = useState(false);
  const [isEditPriceItemModalOpen, setIsEditPriceItemModalOpen] = useState(false);
  const [isAddPriceRuleModalOpen, setIsAddPriceRuleModalOpen] = useState(false);
  const [isEditPriceRuleModalOpen, setIsEditPriceRuleModalOpen] = useState(false);
  const [editingPriceTable, setEditingPriceTable] = useState<PricingData | null>(null);
  const [editingPriceItem, setEditingPriceItem] = useState<PriceItem | null>(null);
  const [editingPriceRule, setEditingPriceRule] = useState<PriceRule | null>(null);
  const [viewingPriceTable, setViewingPriceTable] = useState<PricingData | null>(null);
  const [viewingPriceItem, setViewingPriceItem] = useState<PriceItem | null>(null);
  const [priceItems, setPriceItems] = useState<PriceItem[]>([]);
  const [priceRules, setPriceRules] = useState<PriceRule[]>([]);
  const [loadingPriceItems, setLoadingPriceItems] = useState(false);
  const [loadingPriceRules, setLoadingPriceRules] = useState(false);
  const { fetchPriceItemsByTableId, fetchPriceRulesByItemId, createPriceItem, updatePriceItem, deletePriceItem } = usePriceItems();
  const { createPriceRule, updatePriceRule, deletePriceRule } = usePriceRules();
  const [newPriceData, setNewPriceData] = useState<PriceTablePayload>({
    startDate: '',
    endDate: null,
    priority: 0,
    status: 'COMING_SOON'
  });
  const [editPriceData, setEditPriceData] = useState<Partial<PriceTablePayload>>({
    startDate: '',
    endDate: null,
    priority: 0,
    status: 'COMING_SOON'
  });
  const [newPriceItemData, setNewPriceItemData] = useState<PriceItemPayload>({
    priceTableId: '',
    studioTypeName: '',
    defaultPrice: 0
  });
  const [editPriceItemData, setEditPriceItemData] = useState<Partial<PriceItemPayload>>({
    studioTypeName: '',
    defaultPrice: 0
  });
  const [newPriceRuleData, setNewPriceRuleData] = useState<PriceRulePayload>({
    priceTableItemId: '',
    dayFilter: [],
    startTime: '',
    endTime: '',
    pricePerUnit: 0,
    unit: '',
    date: ''
  });
  const [editPriceRuleData, setEditPriceRuleData] = useState<Partial<PriceRulePayload>>({
    dayFilter: [],
    startTime: '',
    endTime: '',
    pricePerUnit: 0,
    unit: '',
    date: ''
  });

  // Step 1: Handle create new price table
  const handleAddPriceTable = async () => {
    try {
      console.log('Adding price table with data:', newPriceData);
      const result = await onCreatePriceTable(newPriceData);
      console.log('Price table added successfully:', result);

      setIsAddModalOpen(false);
      setNewPriceData({
        startDate: '',
        endDate: null,
        priority: 0,
        status: 'COMING_SOON'
      });
      alert('Price table added successfully!');
    } catch (error) {
      console.error('Error adding price table:', error);
      alert('Failed to add price table. Please try again.');
    }
  };

  // Step 2: Handle view price table details
  const handleViewPriceTable = async (priceTable: PricingData) => {
    console.log('Opening price table details for:', priceTable);
    console.log('Price table ID:', priceTable.id);
    
    setViewingPriceTable(priceTable);
    setIsDetailModalOpen(true);
    
    // Fetch price items for this price table
    try {
      setLoadingPriceItems(true);
      
      // Ensure we have a valid ID before making the API call
      if (!priceTable.id) {
        console.error('Price table ID is missing:', priceTable);
        setPriceItems([]);
        return;
      }
      
      console.log('Fetching price items for table ID:', priceTable.id);
      const items = await fetchPriceItemsByTableId(priceTable.id);
      console.log('Fetched price items:', items);
      setPriceItems(items);
    } catch (error) {
      console.error('Error fetching price items:', error);
      setPriceItems([]);
    } finally {
      setLoadingPriceItems(false);
    }
  };

  // Step 3: Handle edit price table
  const handleEditPriceTable = (priceTable: PricingData) => {
    setEditingPriceTable(priceTable);
    setEditPriceData({
      startDate: priceTable.startDate || '',
      endDate: priceTable.endDate || null,
      priority: priceTable.priority || 0,
      status: priceTable.status || 'COMING_SOON'
    });
    setIsEditModalOpen(true);
  };

  // Step 4: Handle update price table
  const handleUpdatePriceTable = async () => {
    if (!editingPriceTable) return;
    
    try {
      // Ensure we have valid data before sending
      const updateData = {
        startDate: editPriceData.startDate || editingPriceTable.startDate || '',
        endDate: editPriceData.endDate !== undefined ? editPriceData.endDate : editingPriceTable.endDate,
        priority: editPriceData.priority !== undefined ? editPriceData.priority : editingPriceTable.priority || 0,
        status: editPriceData.status || editingPriceTable.status || 'COMING_SOON'
      };
      
      await onUpdatePriceTable(editingPriceTable.id, updateData);
      setIsEditModalOpen(false);
      setEditingPriceTable(null);
      setEditPriceData({
        startDate: '',
        endDate: null,
        priority: 0,
        status: 'COMING_SOON'
      });
      alert('Price table updated successfully!');
    } catch (error) {
      console.error('Error updating price table:', error);
      alert('Failed to update price table. Please try again.');
    }
  };

  // Step 5: Handle delete price table
  const handleDeletePriceTable = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this price table?')) {
      try {
        await onDeletePriceTable(id);
        alert('Price table deleted successfully!');
      } catch (error) {
        console.error('Error deleting price table:', error);
        alert('Failed to delete price table. Please try again.');
      }
    }
  };

  // Step 7: Handle view price item details
  const handleViewPriceItem = async (priceItem: PriceItem) => {
    try {
      console.log('Opening price item details for:', priceItem);
      console.log('Price item ID:', priceItem.id);
      console.log('Price item ID type:', typeof priceItem.id);
      console.log('Price item ID length:', priceItem.id?.length);
      
      // Use existing price item data directly
      console.log('Using existing price item data for modal');
      setViewingPriceItem(priceItem);
      setIsPriceItemDetailModalOpen(true);
      
      // Fetch price rules for this price item
      try {
        setLoadingPriceRules(true);
        console.log('Fetching price rules for itemId:', priceItem.id);
        
        if (priceItem.id) {
          const rules = await fetchPriceRulesByItemId(priceItem.id);
          setPriceRules(rules);
          console.log('Fetched price rules:', rules);
          console.log('First rule details:', rules[0]);
          if (rules[0]) {
            console.log('dayFilter:', rules[0].dayFilter);
            console.log('unit:', rules[0].unit);
          }
        } else {
          console.warn('Price item ID is null, cannot fetch price rules');
          setPriceRules([]);
        }
      } catch (rulesError) {
        console.warn('Failed to fetch price rules:', rulesError);
        setPriceRules([]);
      } finally {
        setLoadingPriceRules(false);
      }
      
    } catch (error) {
      console.error('Error in handleViewPriceItem:', error);
      // Fallback to using the original price item data
      setViewingPriceItem(priceItem);
      setIsPriceItemDetailModalOpen(true);
    }
  };

  // Step 8: Close price item detail modal
  const handleClosePriceItemDetail = () => {
    setIsPriceItemDetailModalOpen(false);
    setViewingPriceItem(null);
    setPriceRules([]);
  };

  // Step 9: Handle add new price item
  const handleAddPriceItem = async () => {
    try {
      if (!viewingPriceTable?.id) {
        alert('Price table ID is missing');
        return;
      }

      const priceItemData = {
        ...newPriceItemData,
        priceTableId: viewingPriceTable.id
      };

      const newPriceItem = await createPriceItem(priceItemData);
      setPriceItems(prev => [...prev, newPriceItem]);
      setIsAddPriceItemModalOpen(false);
      setNewPriceItemData({
        priceTableId: '',
        studioTypeName: '',
        defaultPrice: 0
      });
      alert('Price item added successfully!');
    } catch (error) {
      console.error('Error adding price item:', error);
      alert('Failed to add price item. Please try again.');
    }
  };

  // Step 10: Handle edit price item
  const handleEditPriceItem = (priceItem: PriceItem) => {
    setEditingPriceItem(priceItem);
    setEditPriceItemData({
      studioTypeName: priceItem.studioTypeName,
      defaultPrice: priceItem.defaultPrice
    });
    setIsEditPriceItemModalOpen(true);
  };

  // Step 11: Handle update price item
  const handleUpdatePriceItem = async () => {
    if (!editingPriceItem?.id) return;
    
    try {
      await updatePriceItem(editingPriceItem.id, editPriceItemData);
      setPriceItems(prev => 
        prev.map(item => 
          item.id === editingPriceItem.id 
            ? { ...item, ...editPriceItemData }
            : item
        )
      );
      setIsEditPriceItemModalOpen(false);
      setEditingPriceItem(null);
      setEditPriceItemData({
        studioTypeName: '',
        defaultPrice: 0
      });
      alert('Price item updated successfully!');
    } catch (error) {
      console.error('Error updating price item:', error);
      alert('Failed to update price item. Please try again.');
    }
  };

  // Step 12: Handle delete price item
  const handleDeletePriceItem = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this price item?')) {
      try {
        await deletePriceItem(id);
        setPriceItems(prev => prev.filter(item => item.id !== id));
        alert('Price item deleted successfully!');
      } catch (error) {
        console.error('Error deleting price item:', error);
        alert('Failed to delete price item. Please try again.');
      }
    }
  };

  // Step 13: Handle add new price rule
  const handleAddPriceRule = async () => {
    try {
      if (!viewingPriceItem?.id) {
        alert('Price item ID is missing');
        return;
      }

      const priceRuleData = {
        ...newPriceRuleData,
        priceTableItemId: viewingPriceItem.id
      };

      const newPriceRule = await createPriceRule(priceRuleData);
      setPriceRules(prev => [...prev, newPriceRule]);
      setIsAddPriceRuleModalOpen(false);
      setNewPriceRuleData({
        priceTableItemId: '',
        dayFilter: [],
        startTime: '',
        endTime: '',
        pricePerUnit: 0,
        unit: '',
        date: ''
      });
      alert('Price rule added successfully!');
    } catch (error) {
      console.error('Error adding price rule:', error);
      alert('Failed to add price rule. Please try again.');
    }
  };

  // Step 14: Handle edit price rule
  const handleEditPriceRule = (priceRule: PriceRule) => {
    setEditingPriceRule(priceRule);
    setEditPriceRuleData({
      dayFilter: priceRule.dayFilter,
      startTime: priceRule.startTime,
      endTime: priceRule.endTime,
      pricePerUnit: priceRule.pricePerUnit,
      unit: priceRule.unit,
      date: priceRule.date
    });
    setIsEditPriceRuleModalOpen(true);
  };

  // Step 15: Handle update price rule
  const handleUpdatePriceRule = async () => {
    if (!editingPriceRule?.id) return;
    
    try {
      await updatePriceRule(editingPriceRule.id, editPriceRuleData);
      setPriceRules(prev => 
        prev.map(rule => 
          rule.id === editingPriceRule.id 
            ? { ...rule, ...editPriceRuleData }
            : rule
        )
      );
      setIsEditPriceRuleModalOpen(false);
      setEditingPriceRule(null);
      setEditPriceRuleData({
        dayFilter: [],
        startTime: '',
        endTime: '',
        pricePerUnit: 0,
        unit: '',
        date: ''
      });
      alert('Price rule updated successfully!');
    } catch (error) {
      console.error('Error updating price rule:', error);
      alert('Failed to update price rule. Please try again.');
    }
  };

  // Step 16: Handle delete price rule
  const handleDeletePriceRule = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this price rule?')) {
      try {
        await deletePriceRule(id);
        setPriceRules(prev => prev.filter(rule => rule.id !== id));
        alert('Price rule deleted successfully!');
      } catch (error) {
        console.error('Error deleting price rule:', error);
        alert('Failed to delete price rule. Please try again.');
      }
    }
  };

  // Step 6: Format date for display
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      return date.toLocaleDateString('vi-VN');
    } catch {
      return 'Invalid Date';
    }
  };

  // Step 7: Get status display text and color
  const getStatusDisplay = (status: string | null | undefined) => {
    if (!status) {
      return { text: 'N/A', color: 'bg-gray-100 text-gray-800', dotColor: 'bg-gray-400' };
    }
    
    switch (status) {
      case 'COMING_SOON':
        return { text: 'COMING_SOON', color: 'bg-yellow-100 text-yellow-800', dotColor: 'bg-yellow-400' };
      case 'IS_HAPPENING':
        return { text: 'IS_HAPPENING', color: 'bg-green-100 text-green-800', dotColor: 'bg-green-400' };
      case 'ENDED':
        return { text: 'ENDED', color: 'bg-red-100 text-red-800', dotColor: 'bg-red-400' };
      default:
        return { text: status, color: 'bg-gray-100 text-gray-800', dotColor: 'bg-gray-400' };
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">Dashboard</h2>
        <nav>
          <ul>
            <li>
              <Link href="/admin/dashboard" className="menu-link">Dashboard</Link>
            </li>
            <li>
              <Link href="/admin/bookinglist" className="menu-link">Booking Management</Link>
            </li>
            <li>
              <Link href="/admin/account" className="menu-link">Account Management</Link>
            </li>
            <li>
              <Link href="/admin/studios" className="menu-link">Studios</Link>
            </li>
            <li>
              <Link href="/admin/studio-types" className="menu-link">Studio Types</Link>
            </li>
            <li>
              <Link href="/admin/location" className="menu-link">Location Management</Link>
            </li>
            <li>
              <Link href="/admin/service" className="menu-link">Service Management</Link>
            </li>
            <li>
              <Link href="/admin/pricing" className="menu-link">Pricing Management</Link>
            </li>
            <li>
              <Link href="/admin/notifications" className="menu-link">Notifications</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <section className="dashboard-root">
        {/* HEADER */}
        <header className="dashboard-header">
          <h1>Pricing Management</h1>
          <div className="dashboard-search">
            <input aria-label="Search" placeholder="Search" />
          </div>
        </header>

        {/* Pricing Content with Tailwind CSS */}
        <div className="service-tailwind-container">
          {/* Add Price Table Button */}
          <div className="mb-6 flex justify-end">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              <span>+ Add Price Table</span>
            </button>
          </div>

          {/* Price Tables Table */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                </svg>
                Price Tables List
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Start Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">End Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {priceTables.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center">
                          <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                          </svg>
                          <p className="text-lg font-medium text-gray-900 mb-1">No price tables found</p>
                          <p className="text-sm text-gray-500">Price tables will appear here when added</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    priceTables.map((priceTable, index) => {
                      const statusDisplay = getStatusDisplay(priceTable.status);
                      return (
                        <tr key={priceTable.id || `price-table-${index}`} className="hover:bg-gray-50 transition-colors duration-150">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {formatDate(priceTable.startDate)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {priceTable.endDate ? formatDate(priceTable.endDate) : 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {priceTable.priority ?? 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusDisplay.color}`}>
                              <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${statusDisplay.dotColor}`}></div>
                              {statusDisplay.text}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleViewPriceTable(priceTable)}
                                className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition-colors duration-150"
                                title="View Price Table Details"
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                  <circle cx="12" cy="12" r="3"/>
                                </svg>
                              </button>
                              <button
                                onClick={() => handleEditPriceTable(priceTable)}
                                className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50 transition-colors duration-150"
                                title="Edit Price Table"
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDeletePriceTable(priceTable.id)}
                                className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-colors duration-150"
                                title="Delete Price Table"
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="3,6 5,6 21,6"/>
                                  <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

       {/* Add Price Table Modal */}
       {isAddModalOpen && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
           <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Price Table</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={newPriceData.startDate}
                  onChange={(e) => setNewPriceData({...newPriceData, startDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={newPriceData.endDate || ''}
                  onChange={(e) => setNewPriceData({...newPriceData, endDate: e.target.value || null})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <input
                  type="number"
                  value={newPriceData.priority}
                  onChange={(e) => setNewPriceData({...newPriceData, priority: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter priority (0, 1, 2...)"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={newPriceData.status}
                  onChange={(e) => setNewPriceData({...newPriceData, status: e.target.value as 'COMING_SOON' | 'IS_HAPPENING' | 'ENDED'})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="COMING_SOON">Coming Soon</option>
                  <option value="IS_HAPPENING">Is Happening</option>
                  <option value="ENDED">Ended</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPriceTable}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Price Table
              </button>
            </div>
          </div>
        </div>
      )}

       {/* Edit Price Table Modal */}
       {isEditModalOpen && editingPriceTable && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
           <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Edit Price Table</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={editPriceData.startDate || ''}
                  onChange={(e) => setEditPriceData({...editPriceData, startDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={editPriceData.endDate || ''}
                  onChange={(e) => setEditPriceData({...editPriceData, endDate: e.target.value || null})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <input
                  type="number"
                  value={editPriceData.priority || 0}
                  onChange={(e) => setEditPriceData({...editPriceData, priority: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={editPriceData.status || 'COMING_SOON'}
                  onChange={(e) => setEditPriceData({...editPriceData, status: e.target.value as 'COMING_SOON' | 'IS_HAPPENING' | 'ENDED'})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="COMING_SOON">Coming Soon</option>
                  <option value="IS_HAPPENING">Is Happening</option>
                  <option value="ENDED">Ended</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdatePriceTable}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Update Price Table
              </button>
            </div>
          </div>
        </div>
      )}

       {/* View Price Table Details Modal */}
       {isDetailModalOpen && viewingPriceTable && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
           <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Price Table Details</h3>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ID</label>
                  <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{viewingPriceTable.id}</p>
                </div> */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{viewingPriceTable.priority}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{formatDate(viewingPriceTable.startDate)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
                    {viewingPriceTable.endDate ? formatDate(viewingPriceTable.endDate) : 'N/A'}
                  </p>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <div className="mt-1">
                    {(() => {
                      const statusDisplay = getStatusDisplay(viewingPriceTable.status);
                      return (
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusDisplay.color}`}>
                          <div className={`w-2 h-2 rounded-full mr-2 ${statusDisplay.dotColor}`}></div>
                          {statusDisplay.text}
                        </span>
                      );
                    })()}
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-md font-medium text-gray-900">Price Items</h4>
                  <button
                    onClick={() => setIsAddPriceItemModalOpen(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors duration-200"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12h14"/>
                    </svg>
                    <span>Add Price Item</span>
                  </button>
                </div>
                {loadingPriceItems ? (
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Loading price items...</p>
                  </div>
                ) : priceItems.length > 0 ? (
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            PRICE TABLE ID
                          </th> */}
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            STUDIO TYPE NAME
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            DEFAULT PRICE
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ACTIONS
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {priceItems.map((priceItem, index) => (
                          <tr key={priceItem.id || `price-item-${index}`} className="hover:bg-gray-50 transition-colors duration-150">
                            {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {priceItem.priceTableId || ''}
                            </td> */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {priceItem.studioTypeName || ''}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {priceItem.defaultPrice ? priceItem.defaultPrice.toLocaleString('vi-VN') + ' VND' : '0 VND'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleViewPriceItem(priceItem)}
                                  className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition-colors duration-150"
                                  title="View Price Item Details"
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                    <circle cx="12" cy="12" r="3"/>
                                  </svg>
                                </button>
                                <button
                                  onClick={() => handleEditPriceItem(priceItem)}
                                  className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50 transition-colors duration-150"
                                  title="Edit Price Item"
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                  </svg>
                                </button>
                                <button
                                  onClick={() => handleDeletePriceItem(priceItem.id!)}
                                  className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-colors duration-150"
                                  title="Delete Price Item"
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="3,6 5,6 21,6"/>
                                    <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600">No price items found for this price table.</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

       {/* Price Item Detail Modal */}
       {isPriceItemDetailModalOpen && viewingPriceItem && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
           <div className="bg-white rounded-lg p-6 w-full max-w-7xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Price Item Details</h3>
              <button
                onClick={handleClosePriceItemDetail}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ID</label>
                  <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{viewingPriceItem.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price Table ID</label>
                  <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{viewingPriceItem.priceTableId}</p>
                </div> */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Studio Type Name</label>
                  <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{viewingPriceItem.studioTypeName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Default Price</label>
                  <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
                    {viewingPriceItem.defaultPrice ? viewingPriceItem.defaultPrice.toLocaleString('vi-VN') + ' VND' : '0 VND'}
                  </p>
                </div>
              </div>
              
              {/* Price Rules Section */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-md font-medium text-gray-900">Price Rules</h4>
                  <button
                    onClick={() => setIsAddPriceRuleModalOpen(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors duration-200"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12h14"/>
                    </svg>
                    <span>Add Price Rule</span>
                  </button>
                </div>
                {loadingPriceRules ? (
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Loading price rules...</p>
                  </div>
                ) : priceRules.length > 0 ? (
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            DAYS OF WEEK
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            TIME RANGE
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            PRICE PER UNIT
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            UNIT
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            DATE
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ACTIONS
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {priceRules.map((rule, index) => (
                          <tr key={rule.id || `price-rule-${index}`} className="hover:bg-gray-50 transition-colors duration-150">
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                               {rule.dayFilter && rule.dayFilter.length > 0 ? rule.dayFilter.join(', ') : 'N/A'}
                             </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {rule.startTime && rule.endTime ? `${rule.startTime} - ${rule.endTime}` : 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {rule.pricePerUnit ? rule.pricePerUnit.toLocaleString('vi-VN') + ' VND' : '0 VND'}
                            </td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                               {rule.unit && rule.unit.trim() !== '' ? rule.unit : 'N/A'}
                             </td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                               {rule.date && rule.date !== null ? new Date(rule.date).toLocaleDateString('vi-VN') : 'N/A'}
                             </td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                               <div className="flex items-center space-x-2">
                                 <button
                                   onClick={() => handleEditPriceRule(rule)}
                                   className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50 transition-colors duration-150"
                                   title="Edit Price Rule"
                                 >
                                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                     <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                     <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                   </svg>
                                 </button>
                                 <button
                                   onClick={() => handleDeletePriceRule(rule.id)}
                                   className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-colors duration-150"
                                   title="Delete Price Rule"
                                 >
                                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                     <polyline points="3,6 5,6 21,6"/>
                                     <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
                                   </svg>
                                 </button>
                               </div>
                             </td>
                           </tr>
                         ))}
                      </tbody>
                    </table>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600">No price rules found for this price item.</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={handleClosePriceItemDetail}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Price Item Modal */}
      {isAddPriceItemModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Price Item</h3>
              <button
                onClick={() => setIsAddPriceItemModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Studio Type Name</label>
                <input
                  type="text"
                  value={newPriceItemData.studioTypeName}
                  onChange={(e) => setNewPriceItemData({...newPriceItemData, studioTypeName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter studio type name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Default Price</label>
                <input
                  type="number"
                  value={newPriceItemData.defaultPrice}
                  onChange={(e) => setNewPriceItemData({...newPriceItemData, defaultPrice: Number(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter default price"
                  min="0"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setIsAddPriceItemModalOpen(false)}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPriceItem}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Add Price Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Price Item Modal */}
      {isEditPriceItemModalOpen && editingPriceItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit Price Item</h3>
              <button
                onClick={() => setIsEditPriceItemModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Studio Type Name</label>
                <input
                  type="text"
                  value={editPriceItemData.studioTypeName || ''}
                  onChange={(e) => setEditPriceItemData({...editPriceItemData, studioTypeName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Default Price</label>
                <input
                  type="number"
                  value={editPriceItemData.defaultPrice || 0}
                  onChange={(e) => setEditPriceItemData({...editPriceItemData, defaultPrice: Number(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setIsEditPriceItemModalOpen(false)}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdatePriceItem}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Update Price Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Price Rule Modal */}
      {isAddPriceRuleModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Price Rule</h3>
              <button
                onClick={() => setIsAddPriceRuleModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Days of Week</label>
                <div className="grid grid-cols-2 gap-2">
                  {['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'].map(day => (
                    <label key={day} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newPriceRuleData.dayFilter.includes(day)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewPriceRuleData({
                              ...newPriceRuleData,
                              dayFilter: [...newPriceRuleData.dayFilter, day]
                            });
                          } else {
                            setNewPriceRuleData({
                              ...newPriceRuleData,
                              dayFilter: newPriceRuleData.dayFilter.filter(d => d !== day)
                            });
                          }
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm">{day}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                  <input
                    type="time"
                    value={newPriceRuleData.startTime}
                    onChange={(e) => setNewPriceRuleData({...newPriceRuleData, startTime: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                  <input
                    type="time"
                    value={newPriceRuleData.endTime}
                    onChange={(e) => setNewPriceRuleData({...newPriceRuleData, endTime: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price Per Unit</label>
                  <input
                    type="number"
                    value={newPriceRuleData.pricePerUnit}
                    onChange={(e) => setNewPriceRuleData({...newPriceRuleData, pricePerUnit: Number(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                  <select
                    value={newPriceRuleData.unit}
                    onChange={(e) => setNewPriceRuleData({...newPriceRuleData, unit: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select unit</option>
                    <option value="HOUR">Hour</option>
                    <option value="DAY">Day</option>
                    <option value="WEEK">Week</option>
                    <option value="MONTH">Month</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={newPriceRuleData.date}
                  onChange={(e) => setNewPriceRuleData({...newPriceRuleData, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setIsAddPriceRuleModalOpen(false)}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPriceRule}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Add Price Rule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Price Rule Modal */}
      {isEditPriceRuleModalOpen && editingPriceRule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit Price Rule</h3>
              <button
                onClick={() => setIsEditPriceRuleModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Days of Week</label>
                <div className="grid grid-cols-2 gap-2">
                  {['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'].map(day => (
                    <label key={day} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editPriceRuleData.dayFilter?.includes(day) || false}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setEditPriceRuleData({
                              ...editPriceRuleData,
                              dayFilter: [...(editPriceRuleData.dayFilter || []), day]
                            });
                          } else {
                            setEditPriceRuleData({
                              ...editPriceRuleData,
                              dayFilter: (editPriceRuleData.dayFilter || []).filter(d => d !== day)
                            });
                          }
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm">{day}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                  <input
                    type="time"
                    value={editPriceRuleData.startTime || ''}
                    onChange={(e) => setEditPriceRuleData({...editPriceRuleData, startTime: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                  <input
                    type="time"
                    value={editPriceRuleData.endTime || ''}
                    onChange={(e) => setEditPriceRuleData({...editPriceRuleData, endTime: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price Per Unit</label>
                  <input
                    type="number"
                    value={editPriceRuleData.pricePerUnit || 0}
                    onChange={(e) => setEditPriceRuleData({...editPriceRuleData, pricePerUnit: Number(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                  <select
                    value={editPriceRuleData.unit || ''}
                    onChange={(e) => setEditPriceRuleData({...editPriceRuleData, unit: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select unit</option>
                    <option value="HOUR">Hour</option>
                    <option value="DAY">Day</option>
                    <option value="WEEK">Week</option>
                    <option value="MONTH">Month</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={editPriceRuleData.date || ''}
                  onChange={(e) => setEditPriceRuleData({...editPriceRuleData, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setIsEditPriceRuleModalOpen(false)}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdatePriceRule}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Update Price Rule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}