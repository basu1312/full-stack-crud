import { useEffect, useState } from 'react';
import { CustomerSchema } from '../schemas/customerSchema';

export const CustomerForm = ({
  onSubmit,
  initialData = null,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      CustomerSchema.omit({ id: true }).parse(formData);
      setErrors({});
      onSubmit(formData);
    } catch (error) {
      const fieldErrors = {};
      error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.formGroup}>
        <label htmlFor="firstName">First Name *</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          style={styles.input}
          disabled={isLoading}
        />
        {errors.firstName && (
          <span style={styles.error}>{errors.firstName}</span>
        )}
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="lastName">Last Name *</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          style={styles.input}
          disabled={isLoading}
        />
        {errors.lastName && <span style={styles.error}>{errors.lastName}</span>}
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          disabled={isLoading}
        />
        {errors.email && <span style={styles.error}>{errors.email}</span>}
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          style={styles.input}
          disabled={isLoading}
        />
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          style={styles.input}
          disabled={isLoading}
        />
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          style={styles.input}
          disabled={isLoading}
        />
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="state">State</label>
        <input
          type="text"
          id="state"
          name="state"
          value={formData.state}
          onChange={handleChange}
          style={styles.input}
          disabled={isLoading}
        />
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="zipCode">Zip Code</label>
        <input
          type="text"
          id="zipCode"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          style={styles.input}
          disabled={isLoading}
        />
      </div>

      <button type="submit" style={styles.button} disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save Customer'}
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '500px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontFamily: 'inherit',
  },
  button: {
    padding: '0.75rem',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  error: {
    color: '#dc3545',
    fontSize: '0.875rem',
  },
};
