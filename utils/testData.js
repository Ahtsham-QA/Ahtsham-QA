const testData = {
  users: {
    standard: { username: 'standard_user', password: 'secret_sauce' },
    invalid: { username: 'invalid_user', password: 'wrong_password' },
  },
  products: {
    backpack: 'Sauce Labs Backpack',
    bikeLight: 'Sauce Labs Bike Light',
    boltTShirt: 'Sauce Labs Bolt T-Shirt',
  },
  checkout: {
    valid: { firstName: 'John', lastName: 'Doe', postalCode: '22003' },
    errors: {
      missingFirstName: 'First Name is required',
      missingLastName: 'Last Name is required',
      missingPostalCode: 'Postal Code is required',
    },
  },
};

export default testData;
