# Booking List Module - Modular Structure

## 📁 File Structure

```
src/app/admin/bookinglist/
├── page.tsx                    # Route Component
├── bookinglistcontainer.tsx    # Container Component (Data & Logic)
├── bookinglist.tsx            # Main Presentation Component
├── bookingfilter.tsx          # Search & Filter Component
├── bookingdetailmodal.tsx     # Detail Modal Component
├── bookingcustomerinfo.tsx    # Customer Info Component
├── bookingserviceinfo.tsx     # Service Info Component
├── bookingcostinfo.tsx        # Cost Calculation Component
├── bookingstatusinfo.tsx      # Status & History Component
├── bookingnotesection.tsx     # Notes Section Component
├── bookingactionbar.tsx       # Action Buttons Component
└── README.md                  # This file
```

## 📋 Component Responsibilities

### **Core Components**

#### `page.tsx` (Route Component)
- **Purpose**: Next.js route handler
- **Responsibility**: Import and render container component
- **Size**: ~5 lines

#### `bookinglistcontainer.tsx` (Container Component)
- **Purpose**: Data management and business logic
- **Responsibility**: 
  - Hold sample data
  - Pass data to presentation component
  - Handle data updates
- **Size**: ~200 lines (mostly data)

#### `bookinglist.tsx` (Main Presentation Component)
- **Purpose**: Main UI layout and table display
- **Responsibility**:
  - Render sidebar navigation
  - Display bookings table
  - Handle main state management
  - Coordinate child components
- **Size**: ~300 lines

### **Feature Components**

#### `bookingfilter.tsx` (Search & Filter)
- **Purpose**: Search functionality and add button
- **Features**:
  - Search input with icon
  - Real-time filtering
  - Add new booking button
- **Props**: `searchTerm`, `onSearchChange`, `onAddNewBooking`

#### `bookingdetailmodal.tsx` (Detail Modal)
- **Purpose**: Popup for viewing and editing booking details
- **Features**:
  - View mode (read-only)
  - Edit mode (editable)
  - Integrated all info components
  - Save/Cancel functionality
- **Props**: `booking`, `isOpen`, `onClose`, `onEdit`

#### `bookingcustomerinfo.tsx` (Customer Information)
- **Purpose**: Display and edit customer details
- **Features**:
  - Customer name, email, phone
  - Editable mode support
  - Clean card layout
- **Props**: `customer`, `isEditable`, `onCustomerChange`

#### `bookingserviceinfo.tsx` (Service Information)
- **Purpose**: Display services and calculate service total
- **Features**:
  - Service list with prices
  - Service total calculation
  - Tag-style display
- **Props**: `services`, `isEditable`, `onServicesChange`

#### `bookingcostinfo.tsx` (Cost Calculation)
- **Purpose**: Handle pricing breakdown and total calculation
- **Features**:
  - Studio price, service price, overtime fee
  - Automatic total calculation
  - Editable pricing fields
- **Props**: `pricing`, `isEditable`, `onPricingChange`

#### `bookingstatusinfo.tsx` (Status & History)
- **Purpose**: Display status and booking history
- **Features**:
  - Status badge with colors
  - Approval information
  - History timeline
  - Status editing
- **Props**: `status`, `approvedBy`, `history`, `isEditable`, `onStatusChange`

#### `bookingnotesection.tsx` (Notes Section)
- **Purpose**: Display and edit customer notes
- **Features**:
  - Notes display
  - Textarea editing
  - Placeholder text
- **Props**: `notes`, `isEditable`, `onNotesChange`

#### `bookingactionbar.tsx` (Action Buttons)
- **Purpose**: Action buttons for each booking row
- **Features**:
  - View details button
  - Edit button
  - Status-specific actions (approve, cancel)
  - Delete button
- **Props**: `onViewDetails`, `onEdit`, `onDelete`, `onApprove`, `onCancel`, `status`

## 🔧 Benefits of This Structure

### **1. Separation of Concerns**
- Each component has a single responsibility
- Easy to locate and modify specific functionality
- Clear boundaries between components

### **2. Reusability**
- Components can be reused in other parts of the app
- Props-based configuration allows flexibility
- Easy to create variations

### **3. Maintainability**
- Small, focused files are easier to understand
- Changes to one feature don't affect others
- Easy to debug and test individual components

### **4. Scalability**
- Easy to add new features by creating new components
- Existing components can be enhanced independently
- Clear structure for team collaboration

### **5. API Integration Ready**
- Each component can be easily connected to API endpoints
- Data flow is clear and predictable
- Easy to add loading states and error handling

## 🚀 Usage Examples

### **Adding a New Feature**
```typescript
// Create new component
// src/app/admin/bookinglist/bookingpaymentinfo.tsx
export default function BookingPaymentInfo({ payment, isEditable, onPaymentChange }) {
  // Component implementation
}

// Import in main component
import BookingPaymentInfo from "./bookingpaymentinfo";

// Use in JSX
<BookingPaymentInfo 
  payment={booking.payment}
  isEditable={isEditing}
  onPaymentChange={handlePaymentChange}
/>
```

### **Modifying Existing Component**
```typescript
// Edit bookingcustomerinfo.tsx
// Add new field
<input
  type="text"
  value={customer.address}
  onChange={(e) => handleInputChange('address', e.target.value)}
/>
```

### **API Integration**
```typescript
// In bookinglistcontainer.tsx
const [bookings, setBookings] = useState<Booking[]>([]);

useEffect(() => {
  fetchBookings().then(setBookings);
}, []);

const handleEditBooking = async (updatedBooking: Booking) => {
  await updateBooking(updatedBooking);
  setBookings(prev => 
    prev.map(booking => 
      booking.id === updatedBooking.id ? updatedBooking : booking
    )
  );
};
```

## 📝 Future Enhancements

- **Add `bookingapi.ts`**: API service functions
- **Add `bookinghooks.ts`**: Custom React hooks
- **Add `bookingvalidation.ts`**: Form validation
- **Add `bookingfilters.ts`**: Advanced filtering logic
- **Add `bookingexport.ts`**: Export functionality

## 🎯 Development Guidelines

1. **Keep components small**: Each file should have a single responsibility
2. **Use TypeScript**: Define proper interfaces for all props
3. **Follow naming convention**: Use descriptive, consistent names
4. **Document props**: Add JSDoc comments for complex props
5. **Test components**: Write unit tests for each component
6. **Optimize performance**: Use React.memo for expensive components
