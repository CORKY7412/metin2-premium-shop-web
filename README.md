# Metin2 Premium Shop

A modern, responsive web application for a Metin2 premium item shop with an integrated lottery system (Tombola). Built with React, TypeScript, and TailwindCSS.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![React](https://img.shields.io/badge/React-19.2-blue)

## Features

### **Premium Shop**
- Browse premium items with detailed descriptions
- Filter items by categories (All, New, Hot Items)
- Add multiple items with quantity controls
- Earn Yabbie Coins and bonus rewards on purchases
- Mobile-first design with hamburger menu navigation

### **Tombola Lottery**
- Choose between Bronze, Silver, and Gold tiers
- Items have different drop rates
- Spinning wheel with idle rotation
- Instant feedback on wins and penalties

### **Reward Mechanics**
- Guaranteed 10% coins on every purchase
- Random chance to earn lottery tickets
- Receive currency vouchers
- Random chance for extra items

### **RESTAPI integration & Mock data**
- Services for a RESTAPI integration
- Working without database using mockdata through env


### Setup
After cloning the repository:
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

By default, you receive mock data. This is controlled by the env.development file. Set ``VITE_USE_MOCK`` to ``false`` if you want to integrate your own database.

## Contributing

Contributions are welcome!