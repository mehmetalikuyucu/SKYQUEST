# Server Component

This is the backend server for the Flight Information and Booking System, built with NestJS and MongoDB.

## Code Structure

```
src/
├── auth/                 # Authentication related files
├── dto/                  # Data Transfer Objects
├── reservations/         # Reservation module
├── schiphol-api/         # Schiphol API integration
├── users/                # User management
├── app.controller.ts     # Main app controller
├── app.module.ts         # Main app module
├── app.service.ts        # Main app service
├── databaseInitModule.ts # Database initialization
└── main.ts               # Entry point
```

## Environment Variables

The application uses the following environment variables:

- `SCHIPHOL_APP_ID`: Application ID for Schiphol API
- `SCHIPHOL_APP_KEY`: Application Key for Schiphol API
- `JWT_SECRET`: Secret key for JWT token generation

Ensure these are set in the `.env` file in the root of the server directory.


