# Frontend - React Customer CRUD Application

Modern UI for managing customer information built with React, Vite, React Query, and Zod validation.

## Quick Start

### Prerequisites

- Node.js 16+
- npm or yarn

### Install and Run

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── CustomerForm.jsx      # Customer form component
│   │   └── CustomerList.jsx      # Customer list/table component
│   ├── hooks/
│   │   └── useCustomer.js        # Custom React Query hooks
│   ├── pages/
│   │   └── CustomerPage.jsx      # Main page component
│   ├── schemas/
│   │   └── customerSchema.js     # Zod validation schemas
│   ├── services/
│   │   └── customerAPI.js        # API client and HTTP requests
│   ├── App.jsx                   # Root app component
│   ├── App.css                   # Global styles
│   └── main.jsx                  # App entry point
├── index.html                    # HTML template
├── vite.config.js                # Vite configuration
├── package.json                  # Dependencies
└── README.md
```

## Features

### Customer Management

- ✅ **View All Customers** - Display list of all customers in a table
- ✅ **Create Customer** - Add new customer with form validation
- ✅ **Edit Customer** - Update existing customer details
- ✅ **Delete Customer** - Remove customer from system
- ✅ **Form Validation** - Real-time validation using Zod
- ✅ **Loading States** - Visual feedback during API calls
- ✅ **Error Handling** - User-friendly error messages

### Technical Features

- ✅ **Server State Management** - React Query for API data
- ✅ **Schema Validation** - Zod for robust input validation
- ✅ **Optimistic Updates** - Instant UI feedback
- ✅ **Automatic Refetching** - Keep data in sync with server
- ✅ **Responsive Design** - Works on all screen sizes
- ✅ **CORS Support** - Communicates with Spring Boot backend

## Components

### CustomerForm

Reusable form component for creating and editing customers.

**Props:**

- `onSubmit` (function) - Called with form data on submission
- `initialData` (object, optional) - Pre-populate form for editing
- `isLoading` (boolean, optional) - Disable form during submission

**Features:**

- Real-time form validation
- Field-level error messages
- Disabled state during submission

### CustomerList

Table component displaying all customers with action buttons.

**Props:**

- `customers` (array) - List of customer objects
- `isLoading` (boolean) - Show loading state
- `onEdit` (function) - Called when Edit button is clicked

**Features:**

- Sortable columns
- Edit/Delete actions
- Confirmation on delete
- Loading states

### CustomerPage

Main page component orchestrating the entire customer management interface.

**Features:**

- Toggle between list and form views
- Create new customers
- Edit existing customers
- Delete customers
- Error notifications

## Custom Hooks

### useCustomers()

Fetch all customers from the API.

```javascript
const { data: customers, isLoading, error } = useCustomers();
```

### useCustomer(id)

Fetch a single customer by ID.

```javascript
const { data: customer, isLoading, error } = useCustomer(id);
```

### useCreateCustomer()

Create a new customer.

```javascript
const createCustomer = useCreateCustomer();
await createCustomer.mutateAsync(customerData);
```

### useUpdateCustomer()

Update an existing customer.

```javascript
const updateCustomer = useUpdateCustomer();
await updateCustomer.mutateAsync({ id: 1, customer: customerData });
```

### useDeleteCustomer()

Delete a customer.

```javascript
const deleteCustomer = useDeleteCustomer();
await deleteCustomer.mutateAsync(id);
```

## Validation Schema

The application uses Zod for schema validation:

```javascript
CustomerSchema = {
  id: number (optional),
  firstName: string (1-50 chars, required),
  lastName: string (1-50 chars, required),
  email: string (valid email, required),
  phone: string (optional),
  address: string (optional),
  city: string (optional),
  state: string (optional),
  zipCode: string (optional)
}
```

## API Communication

The `customerAPI` service provides methods for all CRUD operations:

```javascript
// Get all customers
const customers = await customerAPI.getAll();

// Get single customer
const customer = await customerAPI.getById(id);

// Create customer
const newCustomer = await customerAPI.create(customerData);

// Update customer
const updated = await customerAPI.update(id, customerData);

// Delete customer
await customerAPI.delete(id);
```

## Configuration

### Vite Configuration

```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
});
```

The proxy configuration automatically proxies API calls to the backend during development.

## Styling

The application uses inline styles and a global CSS file for styling.

**CSS Files:**

- `App.css` - Global styles and responsive layouts

**Style Features:**

- Clean, modern design
- Focus states for accessibility
- Hover effects for interactivity
- Responsive tables
- Mobile-friendly layout

## npm Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Dependencies

### Production

- **react** - UI library
- **react-dom** - React DOM rendering
- **@tanstack/react-query** - Server state management
- **zod** - Schema validation
- **axios** - HTTP client

### Development

- **vite** - Build tool and dev server
- **@vitejs/plugin-react** - React support for Vite

## Troubleshooting

### API Connection Errors

```bash
# Make sure backend is running on port 8080
# Check CORS configuration in backend
# Verify proxy settings in vite.config.js
```

### Port Already in Use

```javascript
// In vite.config.js, change:
server: {
  port: 5174;
}
```

### Module Not Found Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Zod Validation Errors

Check that all required fields are provided with correct types before submitting forms.

## Development Tips

1. **Use React Query DevTools** - Add `@tanstack/react-query-devtools` for debugging
2. **Check Network Tab** - Monitor API requests in browser DevTools
3. **Use browser React DevTools** - Inspector for component debugging
4. **Enable Vite Debug** - Check server logs for detailed information

## Performance Optimization

- ✅ React Query caching reduces API calls
- ✅ Stale time configuration prevents unnecessary refetches
- ✅ Lazy loading of components
- ✅ Optimized bundle with Vite

## Next Steps

1. Run the frontend: `npm run dev`
2. In another terminal, run the backend: `cd ../backend && ./gradlew bootRun`
3. Open `http://localhost:5173` in your browser
4. Create, read, update, and delete customers!

## Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [React Query Documentation](https://tanstack.com/query)
- [Zod Documentation](https://zod.dev)
- [Axios Documentation](https://axios-http.com)
