
import { Product, Category, User, Order } from '../types';

export const MOCK_USERS: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      address: '123 Tech Lane, Silicon Valley, CA 94000',
      isVIP: true,
      status: 'active',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '098-765-4321',
      address: '456 Code Avenue, Bangalore, KA 560001',
      isVIP: false,
      status: 'active',
    },
    {
      id: 3,
      name: 'Sam Brown',
      email: 'sam.brown@example.com',
      phone: '555-555-5555',
      address: '789 Blocked St, Forbidden City, CN 100000',
      isVIP: false,
      status: 'blocked',
    }
];

export const MOCK_USER: User = MOCK_USERS[0];

export const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: 'Mobiles', image: 'https://picsum.photos/id/11/100/100', isFeatured: true },
  { id: 2, name: 'Laptops', image: 'https://picsum.photos/id/12/100/100', isFeatured: true },
  { id: 3, name: 'Fashion', image: 'https://picsum.photos/id/13/100/100', isFeatured: true },
  { id: 4, name: 'Home', image: 'https://picsum.photos/id/14/100/100', isFeatured: true },
  { id: 5, name: 'Appliances', image: 'https://picsum.photos/id/15/100/100', isFeatured: false },
  { id: 6, name: 'Electronics', image: 'https://picsum.photos/id/16/100/100', isFeatured: true },
  { id: 7, name: 'Grocery', image: 'https://picsum.photos/id/17/100/100', isFeatured: false },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: 101, categoryId: 1, name: 'Galaxy S23 Ultra', description: 'Premium smartphone with advanced camera features.', price: 119999, stock: 15, image: 'https://picsum.photos/id/101/400/400' },
  { id: 102, categoryId: 1, name: 'iPhone 15 Pro', description: 'The latest iPhone with A17 Bionic chip.', price: 134900, stock: 10, image: 'https://picsum.photos/id/102/400/400' },
  { id: 103, categoryId: 1, name: 'Google Pixel 8', description: 'The smart and helpful phone from Google.', price: 75999, stock: 25, image: 'https://picsum.photos/id/103/400/400' },
  { id: 201, categoryId: 2, name: 'MacBook Air M2', description: 'Lightweight and powerful laptop for everyday use.', price: 99900, stock: 20, image: 'https://picsum.photos/id/201/400/400' },
  { id: 202, categoryId: 2, name: 'Dell XPS 15', description: 'High-performance laptop with a stunning display.', price: 150000, stock: 8, image: 'https://picsum.photos/id/202/400/400' },
  { id: 203, categoryId: 2, name: 'HP Spectre x360', description: 'A versatile 2-in-1 laptop with powerful performance.', price: 125000, stock: 15, image: 'https://picsum.photos/id/203/400/400' },
  { id: 301, categoryId: 3, name: 'Nike Air Max', description: 'Comfortable and stylish sneakers.', price: 8999, stock: 50, image: 'https://picsum.photos/id/301/400/400' },
  { id: 302, categoryId: 3, name: "Levi's 501 Jeans", description: 'Classic straight-fit jeans for timeless style.', price: 3999, stock: 100, image: 'https://picsum.photos/id/302/400/400' },
  { id: 401, categoryId: 4, name: 'Smart Sofa', description: 'A comfortable sofa with built-in chargers.', price: 25000, stock: 12, image: 'https://picsum.photos/id/401/400/400' },
  { id: 402, categoryId: 4, name: 'Philips Hue Starter Kit', description: 'Smart lighting for your entire home.', price: 6500, stock: 40, image: 'https://picsum.photos/id/402/400/400' },
  { id: 501, categoryId: 5, name: 'LG Smart TV 55"', description: '4K UHD Smart TV with WebOS.', price: 55000, stock: 18, image: 'https://picsum.photos/id/501/400/400' },
  { id: 502, categoryId: 5, name: 'Samsung Refrigerator', description: 'Double door refrigerator with digital inverter.', price: 35000, stock: 22, image: 'https://picsum.photos/id/502/400/400' },
  { id: 601, categoryId: 6, name: 'Sony WH-1000XM5', description: 'Industry leading noise cancelling headphones.', price: 29990, stock: 30, image: 'https://picsum.photos/id/601/400/400' },
  { id: 602, categoryId: 6, name: 'Bose Smart Soundbar 600', description: 'Immersive sound for movies and music.', price: 45000, stock: 18, image: 'https://picsum.photos/id/602/400/400' },
  { id: 701, categoryId: 7, name: 'Organic Apples', description: 'Fresh and juicy organic apples, pack of 6.', price: 250, stock: 200, image: 'https://picsum.photos/id/701/400/400' },
];

export const MOCK_ORDERS: Order[] = [
    {
        id: 'OD123456789',
        userId: 1,
        items: [
            { ...MOCK_PRODUCTS[0], quantity: 1 },
            { ...MOCK_PRODUCTS[4], quantity: 2 },
        ],
        totalAmount: 119999 + 150000 * 2,
        status: 'Dispatched',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        address: '123 Tech Lane, Silicon Valley, CA 94000',
    },
    {
        id: 'OD987654321',
        userId: 2,
        items: [
            { ...MOCK_PRODUCTS[3], quantity: 1 },
        ],
        totalAmount: 99900,
        status: 'Delivered',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        address: '456 Code Avenue, Bangalore, KA 560001',
    },
    {
        id: 'OD555555555',
        userId: 1,
        items: [
            { ...MOCK_PRODUCTS[6], quantity: 1 },
            { ...MOCK_PRODUCTS[7], quantity: 3 },
        ],
        totalAmount: 8999 + 3999*3,
        status: 'Placed',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        address: '123 Tech Lane, Silicon Valley, CA 94000',
    },
    {
        id: 'OD333333333',
        userId: 3,
        items: [
            { ...MOCK_PRODUCTS[10], quantity: 1 },
        ],
        totalAmount: 55000,
        status: 'Pending Confirmation',
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        address: '789 Blocked St, Forbidden City, CN 100000',
    },
];

export const MOCK_ACTIVITY_LOG = [
    { id: 1, user: 'Jane Smith', action: 'placed a new order', target: 'OD987654321', time: '5 minutes ago' },
    { id: 2, user: 'John Doe', action: 'viewed product', target: 'Galaxy S23 Ultra', time: '15 minutes ago' },
    { id: 3, user: 'Admin', action: 'updated stock for', target: 'Nike Air Max', time: '1 hour ago' },
    { id: 4, user: 'Jane Smith', action: 'added to cart', target: 'MacBook Air M2', time: '3 hours ago' },
    { id: 5, user: 'John Doe', action: 'updated his profile', target: '', time: 'Yesterday' },
];