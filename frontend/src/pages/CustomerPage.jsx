import { useState } from 'react';
import { CustomerForm } from '../components/CustomerForm';
import { CustomerList } from '../components/CustomerList';
import {
  useCreateCustomer,
  useCustomers,
  useUpdateCustomer,
} from '../hooks/useCustomer';

export const CustomerPage = () => {
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const { data: customers, isLoading: isLoadingCustomers } = useCustomers();
  const createCustomer = useCreateCustomer();
  const updateCustomer = useUpdateCustomer();

  const handleCreate = async (formData) => {
    try {
      await createCustomer.mutateAsync(formData);
      setShowForm(false);
      setEditingCustomer(null);
    } catch (error) {
      alert('Failed to create customer: ' + error.message);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await updateCustomer.mutateAsync({
        id: editingCustomer.id,
        customer: formData,
      });
      setEditingCustomer(null);
      setShowForm(false);
    } catch (error) {
      alert('Failed to update customer: ' + error.message);
    }
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCustomer(null);
  };

  const handleNewCustomer = () => {
    setEditingCustomer(null);
    setShowForm(true);
  };

  return (
    <div style={styles.container}>
      <h1>Customer Management</h1>

      {showForm ? (
        <div style={styles.formSection}>
          <h2>{editingCustomer ? 'Edit Customer' : 'New Customer'}</h2>
          <CustomerForm
            initialData={editingCustomer}
            onSubmit={editingCustomer ? handleUpdate : handleCreate}
            isLoading={createCustomer.isPending || updateCustomer.isPending}
          />
          <button
            onClick={handleCancel}
            style={styles.cancelButton}
            disabled={createCustomer.isPending || updateCustomer.isPending}
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <button onClick={handleNewCustomer} style={styles.newButton}>
            + New Customer
          </button>
          <CustomerList
            customers={customers}
            isLoading={isLoadingCustomers}
            onEdit={handleEdit}
          />
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
  },
  formSection: {
    backgroundColor: '#f8f9fa',
    padding: '2rem',
    borderRadius: '8px',
  },
  newButton: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
  },
  cancelButton: {
    marginTop: '1rem',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
