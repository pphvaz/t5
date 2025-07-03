# Pet Shop Management System

A full-stack pet shop management system built with Node.js backend (TypeScript, Express, Sequelize, SQLite) and React frontend.

## Project Structure

```
atvv/
├── backend/          # Node.js/TypeScript backend API
├── front/           # React frontend application
└── README.md        # This file
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## Backend Setup

The backend is a REST API built with Express, TypeScript, and Sequelize ORM with SQLite database.

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The backend will run on `http://localhost:3000`

### API Endpoints

- **Clients**: `GET/POST/PUT/DELETE /api/clientes`
- **Pets**: `GET/POST/PUT/DELETE /api/pets`
- **Products**: `GET/POST/PUT/DELETE /api/produtos`
- **Services**: `GET/POST/PUT/DELETE /api/servicos`
- **Consumption**: `GET/POST/PUT/DELETE /api/consumos`

## Frontend Setup

The frontend is a React application with TypeScript that provides a user interface for managing the pet shop operations.

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd front
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3001`

## Running the Complete System

1. **Start the backend first** (in one terminal):
   ```bash
   cd atvv/backend
   npm install
   npm start
   ```

2. **Start the frontend** (in another terminal):
   ```bash
   cd atvv/front
   npm install
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3001`

## Features

### Backend Features
- RESTful API with full CRUD operations
- SQLite database with Sequelize ORM
- TypeScript for type safety
- Input validation and error handling
- Modular architecture with controllers, models, and business logic

### Frontend Features
- React with TypeScript
- Modern UI with navigation
- Forms for data entry (clients, pets, products, services, consumption)
- List views for all entities
- Reports section
- Real-time API integration

## Troubleshooting

### Common Issues

1. **Port already in use**: If port 3000 or 3001 is already in use, the servers will automatically try the next available port.

2. **Database issues**: The SQLite database is automatically created when the backend starts. If you encounter database errors, delete the `database.sqlite` file in the backend directory and restart the server.

3. **Dependency issues**: If you encounter npm dependency errors, try:
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

### Backend Troubleshooting

- Check if the backend is running: `curl http://localhost:3000/api/clientes`
- View backend logs in the terminal where you started the server
- Ensure all dependencies are installed: `npm install`

### Frontend Troubleshooting

- Check if the frontend is running: Open `http://localhost:3001` in your browser
- Check browser console for JavaScript errors
- Ensure the backend is running before starting the frontend
- Clear browser cache if you see stale data

## Development

### Backend Development
- Main entry point: `backend/src/api/server.ts`
- Controllers: `backend/src/api/controllers/`
- Models: `backend/src/modelo/`
- Business logic: `backend/src/negocio/`

### Frontend Development
- Main entry point: `front/src/App.tsx`
- Components: `front/src/componentes/`
- Types: `front/src/types/`
- API service: `front/src/api.ts`

## Testing

### Backend Testing
Test the API endpoints using curl or a tool like Postman:

```bash
# Test clients endpoint
curl http://localhost:3000/api/clientes

# Test creating a client
curl -X POST http://localhost:3000/api/clientes \
  -H "Content-Type: application/json" \
  -d '{"nome":"John Doe","cpf":"12345678901","telefone":"11999999999"}'
```

### Frontend Testing
- Open the application in your browser
- Navigate through different sections
- Test form submissions
- Verify data is displayed correctly

## Contributing

1. Make sure both backend and frontend are running
2. Test your changes thoroughly
3. Ensure TypeScript compilation passes
4. Update documentation if needed

## License

This project is for educational purposes as part of the Fatec DSM course. 