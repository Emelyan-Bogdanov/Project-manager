# Express.js + SQLite Migration Prompt for Agent

You are tasked with migrating a backend server from **Flask** to **Express.js** and changing the database from its current system to **SQLite**, while preserving the existing database schema and models structure. This is a test project, so the database will be deleted and recreated from scratch.

## Context

- **Current Setup**: Flask server with database models (structure to be provided)
- **Target Setup**: Express.js server with SQLite database
- **Client**: Electron desktop application that communicates with the backend
- **Goal**: Maintain API compatibility and data model structure during the migration
- **Scope**: This is a test project; database data loss is acceptable

---

## Phase 1: Analysis & Planning

### 1.1 Examine Current Flask Application
- [ ] Identify all Flask models (database schema definition)
- [ ] Document all API endpoints (routes, HTTP methods, request/response formats)
- [ ] List all dependencies and external integrations
- [ ] Map out database relationships (foreign keys, associations)
- [ ] Note any custom validation or business logic in models

### 1.2 Database Schema Documentation
- [ ] Extract the complete schema from Flask models
- [ ] Document field types, constraints, and default values
- [ ] Identify primary keys, foreign keys, and indexes
- [ ] List any enums or custom data types
- [ ] Note relationships between tables (one-to-many, many-to-many, etc.)

### 1.3 API Endpoint Inventory
- [ ] Create a list of all endpoints with:
  - HTTP method (GET, POST, PUT, DELETE, PATCH)
  - Route path
  - Request parameters/body structure
  - Response format
  - Authentication/authorization requirements

---

## Phase 2: Express.js Server Setup

### 2.1 Project Initialization
- [ ] Create new Express.js project with proper directory structure:
  ```
  express-server/
  ├── src/
  │   ├── models/
  │   ├── routes/
  │   ├── controllers/
  │   ├── middleware/
  │   ├── config/
  │   └── app.js
  ├── database/
  │   ├── migrations/
  │   └── init.sql (or JS-based initialization)
  ├── .env
  ├── .gitignore
  └── package.json
  ```
- [ ] Install core dependencies:
  - `express` - web framework
  - `sqlite3` or `better-sqlite3` - database driver
  - `sequelize` or `knex.js` - ORM/query builder
  - `dotenv` - environment variables
  - `cors` - for Electron communication
  - `body-parser` - JSON parsing

### 2.2 Environment Configuration
- [ ] Create `.env` file with:
  - `NODE_ENV` (development/test)
  - `PORT` (server port)
  - `DATABASE_URL` (SQLite file path)
  - Any other Flask configuration variables
- [ ] Create `config/database.js` for SQLite connection setup

### 2.3 Server Entry Point
- [ ] Create `src/app.js` with:
  - Express app initialization
  - CORS configuration (for Electron app)
  - JSON body parser middleware
  - Error handling middleware
  - Route mounting

---

## Phase 3: Database & ORM Setup

### 3.1 Choose ORM
- [ ] Select ORM (recommended: **Sequelize** for similarity to Flask-SQLAlchemy, or **Knex.js** for simpler migrations)
- [ ] If using Sequelize:
  - Initialize Sequelize configuration
  - Set up connection pooling
  - Configure SQLite dialect
- [ ] If using Knex.js:
  - Initialize Knex configuration
  - Set up migration system

### 3.2 SQLite Database Configuration
- [ ] Create `config/database.js`:
  - Connection settings (file path, memory vs file-based)
  - Connection pooling options
  - Error handling
- [ ] Set up database initialization script that:
  - Creates `database/` directory if not exists
  - Initializes empty `.db` file
  - Runs schema creation on startup

### 3.3 Migrate Models from Flask to ORM
- [ ] For each Flask model, create equivalent ORM model in `src/models/`:
  - Map field types (String → VARCHAR, Integer → INT, etc.)
  - Preserve constraints (nullable, unique, default values)
  - Recreate relationships (hasMany, belongsTo, etc.)
  - Copy validation logic
  - Example structure:
    ```javascript
    // src/models/User.js
    const { DataTypes } = require('sequelize');
    
    module.exports = (sequelize) => {
      return sequelize.define('User', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false
        }
        // ... other fields
      });
    };
    ```

### 3.4 Database Initialization
- [ ] Create `database/init.js` script that:
  - Syncs/creates all tables from models
  - For test environment: drops and recreates tables
  - Optionally seeds initial data
- [ ] Add initialization call to app startup

---

## Phase 4: API Routes & Controllers

### 4.1 Create Route Structure
- [ ] Create `src/routes/` directory with route files:
  - `userRoutes.js`, `projectRoutes.js`, etc. (based on your Flask routes)
  - Import and mount in `src/app.js`

### 4.2 Implement Controllers
- [ ] Create `src/controllers/` directory with controller files:
  - Logic separated from routes
  - Consistent error handling
  - Example structure:
    ```javascript
    // src/controllers/userController.js
    exports.getAllUsers = async (req, res) => {
      try {
        const users = await User.findAll();
        res.json(users);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
    ```

### 4.3 Map Flask Endpoints to Express Routes
- [ ] For each Flask endpoint, create equivalent Express route:
  - Maintain same HTTP method and path pattern
  - Replicate request/response format
  - Preserve any query parameters or request body structure
  - Example equivalence:
    ```python
    # Flask
    @app.route('/api/users', methods=['GET'])
    def get_users():
        users = User.query.all()
        return jsonify([u.to_dict() for u in users])
    ```
    ```javascript
    // Express
    router.get('/api/users', async (req, res) => {
      const users = await User.findAll();
      res.json(users);
    });
    ```

### 4.4 Implement Middleware
- [ ] Create `src/middleware/` directory:
  - Error handling middleware
  - Request validation middleware (if needed)
  - Authentication/authorization (if applicable)
  - Logging middleware (optional)

---

## Phase 5: Integration with Electron App

### 5.1 Update Electron Configuration
- [ ] Identify current Flask server URL/port in Electron app
- [ ] Update to Express.js server URL/port
- [ ] Ensure CORS is properly configured in Express for Electron origin

### 5.2 API Client Validation
- [ ] Update any hardcoded URLs in Electron app
- [ ] Test all API calls from Electron to Express server
- [ ] Verify response formats match expectations
- [ ] Check error handling and edge cases

### 5.3 Data Validation
- [ ] Ensure data types sent from Electron match Express expectations
- [ ] Test form submissions and API requests
- [ ] Validate response parsing in Electron

---

## Phase 6: Testing & Validation

### 6.1 Unit Testing
- [ ] Test individual models and their validations
- [ ] Test controller functions with mock data
- [ ] Create test database separate from production

### 6.2 Integration Testing
- [ ] Test full request/response cycles for each endpoint
- [ ] Test database operations (CRUD)
- [ ] Test error scenarios and edge cases

### 6.3 End-to-End Testing
- [ ] Run Electron app and test against Express server
- [ ] Test complete workflows from Electron UI
- [ ] Verify data persistence in SQLite database
- [ ] Test with fresh database (delete and recreate)

### 6.4 Performance & Validation
- [ ] Compare response times with Flask server
- [ ] Check database query performance
- [ ] Validate no data loss or schema mismatches

---

## Phase 7: Cleanup & Documentation

### 7.1 Code Quality
- [ ] Remove console.logs and debug code
- [ ] Ensure consistent code formatting
- [ ] Add JSDoc comments to complex functions

### 7.2 Configuration
- [ ] Verify `.env` and `.gitignore` are properly set up
- [ ] Ensure sensitive data is not committed

### 7.3 Final Verification
- [ ] Fresh database initialization works correctly
- [ ] All endpoints functional with Electron app
- [ ] No breaking changes from original Flask behavior

---

## Deliverables

1. ✅ **Express.js server** with all endpoints equivalent to Flask
2. ✅ **SQLite database** with schema matching original models
3. ✅ **ORM models** (Sequelize/Knex) reflecting Flask schema
4. ✅ **Database initialization script** for test environment
5. ✅ **Updated Electron app configuration** pointing to Express server
6. ✅ **Tested and validated** integration between Electron and Express

---

## Notes for Agent

- **Database Deletion**: Since this is a test project, the database can be safely deleted and recreated. Implement a simple initialization script.
- **Schema Preservation**: The critical requirement is maintaining the same schema structure. Any field names, types, or relationships must match the original Flask models.
- **API Compatibility**: Ensure all endpoints respond with the exact same format as Flask. The Electron app should not require changes beyond URL/port configuration.
- **Error Handling**: Implement consistent error responses matching Flask's behavior.
- **CORS**: Configure properly for Electron's local file:// protocol or Electron IPC if preferred.

---

## Optional Enhancements (If Time Allows)

- [ ] Add request validation with `joi` or `express-validator`
- [ ] Implement logging with `winston` or `morgan`
- [ ] Add database migrations system
- [ ] Create API documentation (Swagger/OpenAPI)
- [ ] Set up automated testing with Jest or Mocha
- [ ] Implement rate limiting middleware