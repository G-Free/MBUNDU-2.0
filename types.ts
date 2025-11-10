// FIX: Import `ComponentType` as a type to resolve the "Cannot find namespace 'React'" error.
import type { ComponentType } from 'react';

export type UserRole = 'customer' | 'provider' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  isMbunduPrime: boolean;
  role: UserRole;
}

export interface ServiceCategory {
  id: string;
  name: string;
  // FIX: Use the imported `ComponentType` directly.
  icon: ComponentType<{ className?: string }>;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ServiceProvider {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  distance: string;
  basePrice: number;
  imageUrl: string;
  description: string;
  availability: { day: string; hours: string }[];
  reviews: Review[];
}

export interface PriceBreakdown {
    basePrice: number;
    serviceFee: number;
    travelFee?: number;
    urgencyFee?: number;
    primeDiscount?: number;
    promoDiscount?: number;
}

export interface Order {
  id:string;
  provider: Pick<ServiceProvider, 'id' | 'name' | 'imageUrl' | 'category'>;
  user: Pick<User, 'id' | 'name'>;
  date: string;
  time: string;
  status: 'In Progress' | 'Completed' | 'Cancelled';
  total: number;
  orderCode: string;
  address: string;
  serviceDetails: string;
  priceBreakdown: PriceBreakdown;
}


export interface Promotion {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface ChatMessage {
    id: string;
    sender: 'user' | 'provider' | 'system';
    text: string;
    timestamp: string;
    type: 'text' | 'image' | 'system';
    isRead?: boolean;
}

// Enum to manage different pages/views in the app without a router
export enum AppView {
  SPLASH,
  LOGIN,
  HOME,
  SERVICE_LIST,
  SERVICE_DETAILS,
  BOOKING,
  PROFILE,
  ORDERS,
  ORDER_DETAILS,
  MBUNDU_PRIME,
  FAVORITES,
  CHAT,
  EDIT_PROFILE,
  CHANGE_PASSWORD,
  NOTIFICATIONS,
  SUPPORT,
  // Future modules (placeholders for now)
  // PROVIDER_DASHBOARD,
  // ADMIN_DASHBOARD,
}