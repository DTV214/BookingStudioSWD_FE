// src/app/admin/studios/studios.tsx
"use client";

import React, { useState, useEffect } from "react";
import StudiosForm from "@/components/AdminPage/StudiosForm";
import { StudioAPI, StudioData, StudioCreateRequest } from "@/infrastructure/AdminAPI/Studio";
import { LocationAPI, LocationData } from "@/infrastructure/AdminAPI/Location";
import { StudioTypesService } from "@/infrastructure/AdminAPI/Studio-TypesAPI/studioTypesService";


type Studio = {
  id: string;
  name: string;
  image: string;
  studioTypeId: string;
  studioTypeName: string;
  locationId: string;
  locationName: string;
  acreage: number;
  startTime: string;
  endTime: string;
  description: string;
  status: "AVAILABLE" | "MAINTENANCE";
};

type StudioType = {
  id: string;
  name: string;
  description: string;
  minArea: number;
  maxArea: number;
  bufferTime?: string | null;
  services: string[];
};

type StudioFormData = {
  name: string;
  image: File | string; // Support both File upload and URL string
  studioTypeId: string;
  locationId: string;
  acreage: number;
  startTime: string;
  endTime: string;
  description: string;
  status: "AVAILABLE" | "MAINTENANCE";
};

// Type for debugging test functions
interface TestStudioAPI {
  testConnection: typeof StudioAPI.testConnection;
  testCreateStudio: typeof StudioAPI.testCreateStudio;
  getAllStudios: typeof StudioAPI.getAllStudios;
  createStudio: typeof StudioAPI.createStudio;
}

// Helper function để validate URL
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Helper function để convert API data sang UI format
const convertAPIDataToUI = (apiData: StudioData, studioTypes: StudioType[], locations: LocationData[]): Studio => {
  // Null check for apiData
  if (!apiData) {
    console.error('convertAPIDataToUI: apiData is null or undefined');
    throw new Error('API data is missing');
  }

  // Backend đã trả về locationName và studioTypeName trực tiếp, sử dụng chúng
  const studioTypeName = apiData.studioTypeName || 'Unknown';
  const locationName = apiData.locationName || 'Unknown';

  return {
    id: apiData.id || '',
    name: apiData.studioName || '',
    image: apiData.imageUrl || '',
    studioTypeId: apiData.studioTypeId || '',
    studioTypeName: studioTypeName,
    locationId: apiData.locationId || '',
    locationName: locationName,
    acreage: apiData.acreage || 0,
    startTime: apiData.startTime ? apiData.startTime.substring(0, 5) : '00:00', // Convert "08:00:00" to "08:00"
    endTime: apiData.endTime ? apiData.endTime.substring(0, 5) : '00:00', // Convert "22:00:00" to "22:00"
    description: apiData.description || '',
    status: apiData.status || 'AVAILABLE'
  };
};

// Helper function để convert UI data sang API format
const convertUIToAPIData = async (uiData: StudioFormData): Promise<{data: StudioCreateRequest, file?: File}> => {
  // Ensure time format is correct
  const formatTime = (time: string) => {
    if (!time) return "00:00:00";
    if (time.includes(':')) {
      const parts = time.split(':');
      if (parts.length === 2) {
        return `${parts[0].padStart(2, '0')}:${parts[1].padStart(2, '0')}:00`;
      }
    }
    return time;
  };

  // Ensure acreage is a valid number with proper range
  const acreage = typeof uiData.acreage === 'number' && uiData.acreage > 0 && uiData.acreage <= 1000 ? uiData.acreage : 1;

  // Validate and clean data
  const studioName = uiData.name.trim();
  const description = uiData.description.trim();
  const locationId = uiData.locationId.trim();
  const studioTypeId = uiData.studioTypeId.trim();
  const startTime = formatTime(uiData.startTime);
  const endTime = formatTime(uiData.endTime);

  // Handle image - validate file size and fallback to placeholder if too large
  let imageFile: File | undefined;
  let usePlaceholder = false;
  
  if (uiData.image instanceof File) {
    // Check file size (limit to 2MB to avoid 413 error)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (uiData.image.size > maxSize) {
      console.log('File too large:', uiData.image.size, 'bytes. Using placeholder instead.');
      usePlaceholder = true;
    } else {
      imageFile = uiData.image;
      console.log('File upload detected:', imageFile.name, imageFile.size, imageFile.type);
    }
  } else {
    usePlaceholder = true;
  }

  // Additional validation
  if (!studioName || studioName.length < 3) {
    throw new Error('Studio name must be at least 3 characters');
  }
  if (!description || description.length < 10) {
    throw new Error('Description must be at least 10 characters');
  }
  if (!imageFile && !usePlaceholder) {
    throw new Error('Image file is required');
  }
  if (!locationId) {
    throw new Error('Location ID is required');
  }
  if (!studioTypeId) {
    throw new Error('Studio type ID is required');
  }
  if (startTime >= endTime) {
    throw new Error('End time must be greater than start time');
  }

  const result = {
    studioName,
    description,
    acreage,
    startTime,
    endTime,
    status: uiData.status,
    imageUrl: usePlaceholder ? "https://via.placeholder.com/400x300?text=Studio+Image" : undefined,
    locationId,
    studioTypeId
  };

  console.log('=== DATA CONVERSION ===');
  console.log('Input UI data:', uiData);
  console.log('Output API data:', result);
  console.log('Image file:', imageFile);
  
  return { data: result, file: imageFile };
};

export default function StudiosContainer() {
  // State management
  const [studiosList, setStudiosList] = useState<Studio[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null);
  const [editingStudio, setEditingStudio] = useState<Studio | null>(null);
  const [showNewStudioForm, setShowNewStudioForm] = useState<boolean>(false);
  const [newStudioFormData, setNewStudioFormData] = useState<StudioFormData>({
    name: "",
    image: "",
    studioTypeId: "",
    locationId: "",
    acreage: 0,
    startTime: "",
    endTime: "",
    description: "",
    status: "AVAILABLE"
  });
  const [newStudioErrors, setNewStudioErrors] = useState<Partial<Record<keyof StudioFormData, string>>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Dropdown data
  const [studioTypes, setStudioTypes] = useState<StudioType[]>([]);
  const [locations, setLocations] = useState<LocationData[]>([]);

  // Load studios from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Load studio types for dropdown
        const studioTypesData = await StudioTypesService.getAll();
        // Convert domain model to local type
        const convertedStudioTypes: StudioType[] = studioTypesData.map(st => ({
          id: st.id,
          name: st.name,
          description: st.description,
          minArea: st.minArea,
          maxArea: st.maxArea,
          bufferTime: st.bufferTime,
          services: st.services || [] // Convert undefined to empty array
        }));
        setStudioTypes(convertedStudioTypes);
        
        // Load locations for dropdown
        const locationsData = await LocationAPI.getAllLocations();
        setLocations(locationsData);
        
        // Load studios
        const apiData = await StudioAPI.getAllStudios();
        const uiData = apiData.map(studio => {
          if (!studio) {
            console.error('Studio data is null or undefined:', studio);
            return null;
          }
          return convertAPIDataToUI(studio, convertedStudioTypes, locationsData);
        }).filter((studio): studio is Studio => studio !== null); // Remove null entries with type guard
        setStudiosList(uiData);
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
        // Fallback to empty arrays
        setStudiosList([]);
        setStudioTypes([]);
        setLocations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Expose test functions to global scope for debugging
    (window as typeof window & { testStudioAPI: TestStudioAPI }).testStudioAPI = {
      testConnection: StudioAPI.testConnection,
      testCreateStudio: StudioAPI.testCreateStudio,
      getAllStudios: StudioAPI.getAllStudios,
      createStudio: StudioAPI.createStudio
    };
  }, []);

  // Filter studios based on search term
  const filteredStudios = studiosList.filter(studio =>
    studio.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    studio.studioTypeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    studio.locationName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Event handlers
  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  const handleViewDetails = (studio: Studio) => {
    setSelectedStudio(studio);
  };

  const handleCloseDetails = () => {
    setSelectedStudio(null);
  };

  const handleEdit = (studioId: string) => {
    const studio = studiosList.find(s => s.id === studioId);
    if (studio) {
      setEditingStudio({ ...studio });
    }
  };

  const handleCloseEdit = () => {
    setEditingStudio(null);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!editingStudio) return;
    
    const { name, value } = e.target;
    setEditingStudio(prev => ({
      ...prev!,
      [name]: name === "acreage" ? Number(value) : value
    }));
  };

  const handleSaveEdit = async () => {
    if (!editingStudio) return;
    
    // Validate acreage before saving
    if (editingStudio.acreage <= 0) {
      alert("Diện tích phải lớn hơn 0");
      return;
    } else if (editingStudio.acreage > 1000) {
      alert("Area out of range");
      return;
    }
    
    try {
      const { data: apiData, file: imageFile } = await convertUIToAPIData(editingStudio);
      const updatedStudioData = await StudioAPI.updateStudio(editingStudio.id, {
        ...apiData,
        id: editingStudio.id
      }, imageFile);
      
      // Check if updatedStudioData is valid before converting
      if (!updatedStudioData) {
        throw new Error('No data returned from update API');
      }
      
      const updatedStudio = convertAPIDataToUI(updatedStudioData, studioTypes, locations);
      
      // Update local state
      setStudiosList(prev => 
        prev.map(studio => 
          studio.id === editingStudio.id ? updatedStudio : studio
        )
      );
      
      setEditingStudio(null);
      alert("Studio đã được cập nhật thành công!");
    } catch (err) {
      console.error('Error updating studio:', err);
      alert(err instanceof Error ? err.message : 'Failed to update studio');
    }
  };

  const handleDelete = async (studioId: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa studio này?")) {
      try {
        console.log('=== DELETE STUDIO DEBUG ===');
        console.log('Deleting studio with ID:', studioId);
        
        // Test API connection first
        const isConnected = await StudioAPI.testConnection();
        if (!isConnected) {
          // Fallback: Delete studio locally
          console.log('API not connected, deleting studio locally');
          setStudiosList(prev => prev.filter(studio => studio.id !== studioId));
          alert("Studio đã được xóa thành công (chế độ offline)!");
          return;
        }

        await StudioAPI.deleteStudio(studioId);
        
        // Update local state
        setStudiosList(prev => prev.filter(studio => studio.id !== studioId));
        
        alert("Studio đã được xóa thành công!");
      } catch (err) {
        console.error('=== DELETE ERROR HANDLING ===');
        console.error('Error in handleDelete:', err);
        console.error('Error type:', typeof err);
        console.error('Error message:', err instanceof Error ? err.message : 'Unknown error');
        
        // Fallback: Delete studio locally if API fails
        console.log('API failed, deleting studio locally as fallback');
        setStudiosList(prev => prev.filter(studio => studio.id !== studioId));
        alert("Studio đã được xóa thành công (chế độ offline do lỗi API)!");
      }
    }
  };

  // New Studio Form handlers
  const handleNewStudioInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle file input specially
    if (name === "image" && e.target.type === "file") {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files?.[0];
      console.log('File selected:', file);
      setNewStudioFormData(prev => ({
        ...prev,
        [name]: file || ""
      }));
    } else {
      setNewStudioFormData(prev => ({
        ...prev,
        [name]: name === "acreage" ? Number(value) : value
      }));
    }
    
    // Clear error when user starts typing
    if (newStudioErrors[name as keyof StudioFormData]) {
      setNewStudioErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateNewStudioForm = (): boolean => {
    const newErrors: Partial<Record<keyof StudioFormData, string>> = {};
    
    console.log('=== VALIDATION DEBUG ===');
    console.log('newStudioFormData.image:', newStudioFormData.image);
    console.log('typeof newStudioFormData.image:', typeof newStudioFormData.image);
    console.log('newStudioFormData.image instanceof File:', newStudioFormData.image instanceof File);

    if (!newStudioFormData.name.trim()) {
      newErrors.name = "Tên studio là bắt buộc";
    } else if (newStudioFormData.name.trim().length < 3) {
      newErrors.name = "Tên studio phải có ít nhất 3 ký tự";
    }
    
    // Image is optional for now
    // if (!newStudioFormData.image || (typeof newStudioFormData.image === "string" && newStudioFormData.image.trim() === "")) {
    //   newErrors.image = "Hình ảnh là bắt buộc";
    // } else if (typeof newStudioFormData.image === "string" && !isValidUrl(newStudioFormData.image.trim())) {
    //   newErrors.image = "URL hình ảnh không hợp lệ";
    // }
    
    if (!newStudioFormData.studioTypeId.trim()) {
      newErrors.studioTypeId = "Loại studio là bắt buộc";
    }
    
    if (!newStudioFormData.locationId.trim()) {
      newErrors.locationId = "Địa điểm là bắt buộc";
    }
    
    if (newStudioFormData.acreage <= 0) {
      newErrors.acreage = "Diện tích phải lớn hơn 0";
    } else if (newStudioFormData.acreage > 1000) {
      newErrors.acreage = "Area out of range";
    }
    
    if (!newStudioFormData.startTime) {
      newErrors.startTime = "Giờ bắt đầu là bắt buộc";
    }
    
    if (!newStudioFormData.endTime) {
      newErrors.endTime = "Giờ kết thúc là bắt buộc";
    }
    
    // Validate time logic
    if (newStudioFormData.startTime && newStudioFormData.endTime) {
      const startTime = newStudioFormData.startTime;
      const endTime = newStudioFormData.endTime;
      
      if (startTime >= endTime) {
        newErrors.endTime = "Giờ kết thúc phải lớn hơn giờ bắt đầu";
      }
    }
    
    if (!newStudioFormData.description.trim()) {
      newErrors.description = "Mô tả là bắt buộc";
    } else if (newStudioFormData.description.trim().length < 10) {
      newErrors.description = "Mô tả phải có ít nhất 10 ký tự";
    }

    setNewStudioErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateNewStudio = async () => {
    if (validateNewStudioForm()) {
      try {
        console.log('=== UI FORM DATA ===');
        console.log('Form data before conversion:', newStudioFormData);

        // Test API connection first
        const isConnected = await StudioAPI.testConnection();
        if (!isConnected) {
          // Fallback: Create studio locally
          console.log('API not connected, creating studio locally');
          alert("⚠️ Cảnh báo: Không thể kết nối đến backend API.\n\nStudio sẽ được tạo ở chế độ offline và chỉ lưu tạm thời trên trình duyệt.");
          
          const localStudio: Studio = {
            id: Date.now().toString(),
            name: newStudioFormData.name,
            image: newStudioFormData.image instanceof File ? URL.createObjectURL(newStudioFormData.image) : newStudioFormData.image,
            studioTypeId: newStudioFormData.studioTypeId,
            studioTypeName: studioTypes.find(st => st.id === newStudioFormData.studioTypeId)?.name || 'Unknown',
            locationId: newStudioFormData.locationId,
            locationName: locations.find(loc => loc.id === newStudioFormData.locationId)?.locationName || 'Unknown',
            acreage: newStudioFormData.acreage,
            startTime: newStudioFormData.startTime,
            endTime: newStudioFormData.endTime,
            description: newStudioFormData.description,
            status: newStudioFormData.status
          };
          
          setStudiosList(prev => [...prev, localStudio]);
          resetForm();
          return;
        }

                const { data: apiData, file: imageFile } = await convertUIToAPIData(newStudioFormData);
                console.log('=== CONVERTED API DATA ===');
                console.log('API data after conversion:', apiData);
                console.log('Image file:', imageFile);
                
                const newStudioData = await StudioAPI.createStudio(apiData, imageFile);
                
                // Check if newStudioData is valid before converting
                if (!newStudioData) {
                  throw new Error('No data returned from create API');
                }
                
        const newStudio = convertAPIDataToUI(newStudioData, studioTypes, locations);
        
        // Update local state
        setStudiosList(prev => [...prev, newStudio]);
        resetForm();
        alert("Studio đã được tạo thành công!");
              } catch (err) {
                console.error('=== UI ERROR HANDLING ===');
                console.error('Error in handleCreateNewStudio:', err);
                console.error('Error type:', typeof err);
                console.error('Error message:', err instanceof Error ? err.message : 'Unknown error');
                
                // Check if it's a validation error
                if (err instanceof Error && (
                  err.message.includes('must be at least') ||
                  err.message.includes('is required') ||
                  err.message.includes('must be greater than') ||
                  err.message.includes('must be either')
                )) {
                  // Show validation error to user
                  alert(`Lỗi validation: ${err.message}`);
                  return;
                }
                
                // Check if it's a backend API error
                if (err instanceof Error && (
                  err.message.includes('500') ||
                  err.message.includes('Internal Server Error') ||
                  err.message.includes('Failed to create studio') ||
                  err.message.includes('Area out of range')
                )) {
                  // Show user-friendly error message
                  alert('Tạo studio không thành công, loại studio không hợp lệ, vui lòng thử lại');
                  return;
                }
                
                // For other errors, show generic error message
                alert('Tạo studio không thành công, vui lòng thử lại');
              }
    }
  };

  // Helper function to reset form
  const resetForm = () => {
    setNewStudioFormData({
      name: "",
      image: "",
      studioTypeId: "",
      locationId: "",
      acreage: 0,
      startTime: "",
      endTime: "",
      description: "",
      status: "AVAILABLE"
    });
    setNewStudioErrors({});
    setShowNewStudioForm(false);
  };

  const handleCancelNewStudio = () => {
    resetForm();
  };

  // Show loading state
  if (loading) {
    return (
      <div className="dashboard-layout">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải danh sách studio...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="dashboard-layout">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-red-600 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Backend API Status */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>Thông báo:</strong> Backend API đang kết nối với https://bookingstudioswd-be.onrender.com. 
              File ảnh lớn hơn 2MB sẽ tự động chuyển thành placeholder URL để tránh lỗi 413.
            </p>
          </div>
        </div>
      </div>

      <StudiosForm 
      studios={studiosList}
      filteredStudios={filteredStudios}
      searchTerm={searchTerm}
      selectedImage={selectedImage}
      selectedStudio={selectedStudio}
      editingStudio={editingStudio}
      showNewStudioForm={showNewStudioForm}
      newStudioFormData={newStudioFormData}
      newStudioErrors={newStudioErrors}
      studioTypes={studioTypes}
      locations={locations}
      onSearchChange={setSearchTerm}
      onImageClick={handleImageClick}
      onCloseImage={handleCloseImage}
      onViewDetails={handleViewDetails}
      onCloseDetails={handleCloseDetails}
      onEdit={handleEdit}
      onCloseEdit={handleCloseEdit}
      onEditInputChange={handleEditInputChange}
      onSaveEdit={handleSaveEdit}
      onDelete={handleDelete}
      onNewStudioInputChange={handleNewStudioInputChange}
      onCreateNewStudio={handleCreateNewStudio}
      onCancelNewStudio={handleCancelNewStudio}
        onShowNewStudioForm={() => setShowNewStudioForm(true)}
      />
    </div>
  );
}
