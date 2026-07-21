import { useDeleteCustomer } from '../hooks/useCustomer';

export const CustomerList = ({ customers, isLoading, onEdit }) => {
  const deleteCustomer = useDeleteCustomer();

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      deleteCustomer.mutate(id);
    }
  };

  if (isLoading) {
    return <div style={styles.loading}>Loading customers...</div>;
  }

  if (!customers || customers.length === 0) {
    return (
      <div style={styles.empty}>
        No customers found. Create one to get started!
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>
                {customer.firstName} {customer.lastName}
              </td>
              <td>{customer.email}</td>
              <td>{customer.phone || '-'}</td>
              <td>{customer.city || '-'}</td>
              <td>
                <button
                  onClick={() => onEdit(customer)}
                  style={{ ...styles.button, ...styles.editButton }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(customer.id)}
                  style={{ ...styles.button, ...styles.deleteButton }}
                  disabled={deleteCustomer.isPending}
                >
                  {deleteCustomer.isPending ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem',
  },
  loading: {
    textAlign: 'center',
    padding: '2rem',
    color: '#666',
  },
  empty: {
    textAlign: 'center',
    padding: '2rem',
    color: '#999',
  },
  button: {
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '0.5rem',
  },
  editButton: {
    backgroundColor: '#28a745',
    color: 'white',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: 'white',
  },
};
