# TreeTag

TreeTag is a Node.js and Express application for the All Is Well tree-tagging and donation workflow. It serves a static public website from `Public/` and exposes versioned JSON-file-backed APIs for GPS-tagged plants, certificates, donors, token generation, and related CRUD/reporting operations.

## Features

- Static All Is Well website, donation pages, GPS pages, map pages, and certificate UI under `Public/`.
- Versioned Express APIs under `/V14`, `/V15`, `/V16`, `/SV7`, and `/Token`.
- JSON-file persistence through table-specific files in the runtime `Data/` directory.
- Generated REST client examples under each module's `RestClients/` folder.
- Schema-driven table definitions in `Schemas/`.
- Token-based protected route support through the `KSToken` cookie.

## Tech Stack

- Node.js
- Express 5
- ES modules
- JSON Web Tokens
- Cookie parser
- Body parser
- Static HTML/CSS/JavaScript frontend assets

## Getting Started

### Prerequisites

- Node.js 18 or newer is recommended.
- npm

### Install dependencies

```bash
npm install
```

### Configure environment

The server defaults to port `5015` if no `PORT` environment variable is provided.

`dotenv` loads `.env` by default. This repository currently contains `.env.local`, so either set environment variables manually or create a local `.env` file if you want dotenv to load them automatically:

```env
PORT=5015
DataPath=Data
VERSION=V16
```

### Prepare data files

Runtime data is expected in a `Data/` directory. This directory is ignored by git, so create it locally before using endpoints that read or write data:

```text
Data/
  GpsTable.json
  Certificates.json
  Donors.json
```

Each file should contain valid JSON. A minimal starter file can be an empty array:

```json
[]
```

### Start the server

```bash
npm start
```

The app will be available at:

```text
http://localhost:5015
```

## Project Structure

```text
.
|-- app.js                  # Express app entry point
|-- package.json            # npm scripts and dependencies
|-- Public/                 # Static website and frontend pages
|-- Schemas/                # Table schemas used by generated APIs/frontends
|-- Token/                  # Token generation and validation routes
|-- V14/                    # Versioned APIs for Donors and GpsTable
|-- V15/                    # Versioned APIs for GpsCertificatedata and GpsTable
|-- V16/                    # Versioned APIs for Certificates and GpsTable
|-- SV7/                    # Protected versioned APIs
|-- OldSchema/              # Older schema snapshots
|-- BatchFiles/             # API/frontend generation scripts
`-- *.json                  # Seed/schema/reference JSON files
```

## Main URLs

- Website home: `http://localhost:5015/`
- Donation page: `http://localhost:5015/donate/V3/index.html`
- GPS pages: `http://localhost:5015/Gps/`
- Map pages: `http://localhost:5015/Maps/`
- Certificate pages: `http://localhost:5015/Certificate/`
- Generated versioned frontend pages: `http://localhost:5015/V21/`, `http://localhost:5015/V23/`, `http://localhost:5015/V24/`, `http://localhost:5015/V25/`

## API Overview

The server mounts these top-level route groups:

```text
/Token
/V14
/SV7
/V15
/V16
```

### Current V16 modules

```text
/V16/GpsTable
/V16/Certificates
```

Common subroutes include:

```text
Read
Insert
Alter
Delete
```

### Read endpoints

Representative `Read` endpoints:

```text
GET  /V16/GpsTable/Read/AsIs
GET  /V16/GpsTable/Read/RowDataWithPk/:id
POST /V16/GpsTable/Read/SelColsAsArray
POST /V16/GpsTable/Read/SelColumns
GET  /V16/GpsTable/Read/SingleColumn/:ColumnName
GET  /V16/GpsTable/Read/SetSingleColumn/:ColumnName
GET  /V16/GpsTable/Read/KeyCount/:ColumnName
GET  /V16/GpsTable/Read/MaxRow
```

Example:

```http
GET http://localhost:5015/V16/GpsTable/Read/AsIs
```

### Insert endpoints

Representative `Insert` endpoints:

```text
POST /V16/GpsTable/Insert/AsIs
POST /V16/GpsTable/Insert/AsIsNoPk
POST /V16/GpsTable/Insert/AsIsAndTS
POST /V16/GpsTable/Insert/ColumnExist
POST /V16/GpsTable/Insert/SchemaColumnsOnly
POST /V16/GpsTable/Insert/Default
POST /V16/GpsTable/Insert/OnlyDefault
POST /V16/GpsTable/Insert/PkReturn
```

Example body for GPS data:

```json
{
  "DateTime": "2026-05-30T10:00:00.000Z",
  "TreeName": "Coconut",
  "Latitude": "16.9891",
  "Longitude": "82.2475",
  "UserName": "volunteer"
}
```

### Token endpoints

Token routes are mounted under:

```text
POST /Token/Generate/Validate/AsIs
```

Protected routes expect a cookie named `KSToken`. The `/SV7` route group is protected by the token middleware in `app.js`.

## Schemas

Schema files define table names, columns, input fields, and frontend options.

- `Schemas/GpsTable.json`
- `Schemas/Certificates.json`

`GpsTable` contains fields such as `DateTime`, `TreeName`, `Latitude`, `Longitude`, `UserName`, and `pk`.

`Certificates` contains fields such as `username`, `password`, `name`, `date`, `plantNo`, `lat`, and `lng`.

## REST Client Examples

Most generated API folders include `.http` files under `RestClients/`. These can be opened with a REST Client extension in VS Code or used as reference for route paths and payloads.

Example:

```text
V16/GpsTable/Read/RestClients/1_AsIs.http
```

## Generation Scripts

The repository includes Windows batch scripts and one Linux shell script for regenerating APIs/frontends:

```text
generateFrontEnd.bat
GulPHBSFrontEnd.bat
GulPHBSFrontEndNonSec.bat
V3.bat
BatchFiles/generateApiVersion.bat
BatchFiles/alterEnvFile.bat
BatchFiles/Linux/genFrontEnd.sh
```

Review the script contents before running them, because they can regenerate large sections of `Public/` or versioned API folders.

## npm Scripts

```bash
npm start
```

Starts the Express server.

```bash
npm test
```

Currently this is a placeholder and exits with an error.

## Notes

- `Data/*.*` is ignored by git, so runtime data must be provisioned separately per environment.
- `node_modules/` is ignored and should be installed with `npm install`.
- `app.js` serves `Public/` as static files before mounting API routes.
- Several generated help files contain encoding artifacts in emoji text; API behavior is still discoverable from the route files and `.http` clients.
