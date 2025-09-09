PASS_PORTAL

Project Overview
pass_portal is a sophisticated MERN (MongoDB, Express.js, React, Node.js) stack application architected to serve as a command and pass requisition portal for satellite instruction scheduling at ISRO’s ISTRAC facility. The system is engineered to provide robust backend services coupled with a dynamic, responsive frontend UI, enabling seamless orchestration of satellite operational commands with strict scheduling and authentication protocols.
Architectural Composition

    Backend Layer
    The backend is developed using Node.js and Express.js, structured into modular components consisting of RESTful API routes, business logic controllers, and schema-driven data models implemented via Mongoose ORM for MongoDB interaction. Critical features include role-based access control, secure session management with Passport.js strategies, and asynchronous request handling for scalable operations. Configuration assets and core dataset files like data.json are strategically located at the root for streamlined access and maintainability.

    Frontend Layer
    The frontend leverages React.js with a component-driven architecture emphasizing reusable, state-managed UI elements. The codebase is organized with granular separation: presentational components, container components, context APIs for global state management, and thematic styling modules that support dynamic theming (including RTL layouts). The build system integrates webpack and Babel for optimized production delivery, and the public directory maintains static assets and essential PWA configuration manifests.

    Dependency & Environment Management
    Node package management (npm) is used for ecosystem dependency control, with package.json and package-lock.json ensuring deterministic builds and lockstep versioning. The node_modules directories are deliberately excluded from version control to maintain repository hygiene and minimize payload. Environment-specific configurations and secrets management are abstracted to facilitate deployment flexibility across development, staging, and production.

    Data and Backup Strategy
    The repository incorporates structured backups and archives (src_bkp_080824/, frontend_backup/) to ensure resilience and historical integrity of progressive development iterations, aiding in rollback and auditing capabilities during complex feature integrations or refactorings.

Developer Onboarding and Build Instructions
Prerequisites

    Node.js (recommend version >= X.Y.Z for compatibility and security)

    npm/yarn for package management

    MongoDB instance with required access permissions:

# BACKEND INITALIZATION    
# cd backend
# nnpm install
# Set environment variables and MongoDB connection credentials
# npm start 
# Launch API server with hot-reloading capabilities

# FRONTEND INITIALIZATION
# cd frontend
# npm install
# npm start
# Starts React development server with live reload


Critical Operational Notes

    Maintain .gitignore rigorously to exclude transient artifacts like node_modules/, build artifacts, and sensitive environment files.

    The data.json file exports critical domain-specific data; any modifications must ensure backward compatibility and data integrity.

    Authentication flows are tightly coupled with Passport.js strategies; ensure tokens and session secrets are rotated periodically.

    Backup directories are excluded from primary production workflows and intended for internal devOps reference and rollback.

Contribution Workflow

This repository espouses rigorous code review protocols, CI/CD pipelines, and feature-branch workflows to sustain high code quality and system robustness. All contributions should adhere to existing architectural patterns and include comprehensive testing coverage.
