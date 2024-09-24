# React Client for Flight Information and Booking System

This is the frontend client for the Flight Information and Booking System, built with React and TypeScript.

## Project Structure

```
src/
├── api-client/
│   └── apiClient.ts      
├── components/
│   ├── Footer.tsx        
│   └── Navbar.tsx
├── layouts/
│   ├── AuthLayout.tsx        
│   └── MainLayout.tsx          
├── pages/
│   ├── auth/             
│   ├── dashboard/        
│   ├── reservations/     
│   ├── Home.tsx          
│   └── Profile.tsx       
├── index.css             
└── index.tsx             
```

## Key Dependencies

- **TypeScript**: ^4.9.5
- **React Router**: ^6.26.2 - For routing
- **@tanstack/react-query**: ^5.56.2 - For data fetching and caching
- **@mui/material** and **@mui/icons-material**: ^6.1.1 - UI components
- **@mui/x-date-pickers**: ^7.18.0 - Date picker component
- **axios**: ^1.7.7 - HTTP client
- **react-hook-form**: ^7.53.0 - Form handling
- **tailwindcss**: ^3.4.12 - Utility-first CSS framework

## Scripts

- `npm start`: Runs the app in development mode
- `npm build`: Builds the app for production
- `npm test`: Runs the test runner
- `npm eject`: Ejects from Create React App
