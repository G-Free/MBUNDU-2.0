
import { MOCK_CATEGORIES, MOCK_PROVIDERS, MOCK_PROMOTIONS, MOCK_USER, MOCK_ORDERS } from '../constants';
import { ServiceCategory, ServiceProvider, Promotion, User, Order } from '../types';

const SIMULATED_DELAY = 500; // ms

// Simulates fetching all service categories
export const fetchCategories = (): Promise<ServiceCategory[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(MOCK_CATEGORIES);
    }, SIMULATED_DELAY);
  });
};

// Simulates fetching service providers by category ID
export const fetchProvidersByCategory = (categoryId: string): Promise<ServiceProvider[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const filteredProviders = MOCK_PROVIDERS.filter(p => p.category === categoryId);
      resolve(filteredProviders);
    }, SIMULATED_DELAY);
  });
};

// Simulates fetching details for a single service provider
export const fetchProviderDetails = (providerId: string): Promise<ServiceProvider | undefined> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const provider = MOCK_PROVIDERS.find(p => p.id === providerId);
            resolve(provider);
        }, SIMULATED_DELAY);
    });
};

// Simulates fetching promotions
export const fetchPromotions = (): Promise<Promotion[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(MOCK_PROMOTIONS);
        }, SIMULATED_DELAY);
    });
};

// Simulates fetching user data
export const fetchUser = (userId: string): Promise<User> => {
    return new Promise(resolve => {
        setTimeout(() => {
            // Always returns the same mock user for this simulation
            resolve(MOCK_USER);
        }, SIMULATED_DELAY);
    });
};

// Simulates fetching a user's orders
export const fetchOrders = (userId: string): Promise<Order[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            // Always returns the same mock orders for this simulation
            resolve(MOCK_ORDERS);
        }, SIMULATED_DELAY);
    });
};
