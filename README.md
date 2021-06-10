# Express store - pet project

## Installation

Tested with MongoDB version 4.4.6, Atlas Azure cluster.

1. Open terminal in project directory.
1. Run `npm i --production`.
1. *(can be done before previous step is finished)* Create *config/.env* file (as a reference can use *config/.env.example*).
   
   The **only required** configuration is `EXPE_MONGO_DB` - MongoDB connection string. If database name is missing, `main` database will be used.
   
   All configuration properties are prefixed with `EXPE_` to avoid conflicts.
   
   Shell in *config/.env* comments or empty lines can generate warning when starting.
1. Run `npm start`. By default `localhost:5000` will be listened to as HTTP (refer to previous step to change this behaviour).

Let's assume`{originUrl}` is similar to `http://localhost:5000`.

The API is available at `{originUrl}/api/v1`.

The OpenAPI 3.0.3 JSON document can be found at `{originUrl}/api/v1/api-docs`

## General architecture
All components were meticulously chosen, based on experience, known issues & pitfalls.

### Goals
- Create a backend service with transparent internal project structure.
- Devise multi-tier architecture, with clear borders between tiers.
- Keep the code base extensible yet without additional complication.
- Provide simple, transparent, yet powerful configuration mechanism.
- Provide simple, implementation-agnostic, yet powerful and semantic-logging-ready logging mechanism.
- Automate thorough HTTP request validation that doesn't require external services.
- Generate Swagger/OpenAPI documentation from code. 
- Provide streamlined mechanism of non-2xx HTTP responses with clear structure and proper HTTP status codes.

### Key points
The points are outlined top-to-down, from general to specifics.

- TypeScript is used as the only language of the project. Null-safety & explicit typing is enforced.
- Advanced typing (mainly see *src/lib/types.ts*) & code linting with autorefactoring (see *.eslintrc.js*) are used to ensure code safety.  
- The project consists of 2 parts:
  - Infrastructure - application-agnostic & shared part, that doesn't depend on the domain of the application.
  - API - REST API implementation.
- Infrastructure part includes:
  - Configuration - (see *src/lib/config.ts*) `dotenv` library is used. 
        
    It updates `process.env` with values from `.env` file. If file is not found, the app will still work, because configuration is loaded as environment variables.
    
    Additional validation & mapping are done to keep access type-safe and report some very basic errors immediately, not late in app initialization process.
    
    I used to be a fan of hierarchical configuration (see NPM modules [config](https://www.npmjs.com/package/config), [nconf](https://www.npmjs.com/package/nconf)), but they appeared to be superfluous and overdoing things. Plain pre-processed environment variables are usually enough.
  - Logging - (see *src/lib/logger.ts*) `log4js` library is used.
    
    It is by far the best logging library I have ever seen in several eco-systems (Node.JS, .NET, Python).
    
    It is very simple, easily customizable & extendable, supports complex logging scenarios, like semantic logging out-of-the-box. Many logging backends are also provided.
  - Exit handling - (see *src/lib/exit-handler.ts*) handler to process unhandled exceptions & Promise rejections and exit signals processing.
    
    It is possible to schedule some asynchronous tasks when process is shutting down.
    
    Shutting down process is extensively logged, so that user knows, what is going on with the process.
  - Dependency injection - (see *src/di*) `inversify` library is used.
    
    The most conventional & functional DI solution I found.
    
    JavaScript doesn't have reflection or type introspection. It is handled by decorators & symbols for providers.
    
    Some services need to be initialized asynchronously. But to get them asynchronously will complicate all code utilizing them. That's why all initialization Promises are combined as a single promise to be awaited once (see *src/lib/object-lifecycle.ts*).
    
    Some services need a to clear all the resources (similar to `Dispose()` from .NET). To do that a special interface & helper class are created. All services are disposed of when container is disposed of (see *src/lib/object-lifecycle.ts*).
    
    All containers are disposed of when OS signal is received or a fatal error happened & the process is shutting down.
  - Unified error handling. All errors, sent to user, are subtypes of `{ code: string; }` (e.g. `{ "code": "notFound" }`).

    Unified errors are implemented, using OOP hierarchy of classes (see `src/errors`).
  - Resource management - all things that need to be shared are mostly shared using DI container (for common services see *src/services*, *src/repositories*). It includes MongoDB connection and some business logic.
  - Code sharing - the most common code is combined in files & directories. For most of it refer to *src/lib*.
- REST API implementation is located at *src/apis/v1*. It even has a separate DI, based on parent DI (see *src/apis/v1/di*).
  
  Such approach allows having entirely separate APIs in one project, with ability to share common logic & code.
- REST API implementation heavily relies on `express-openapi` library.

  This library allows **entirely code-first approach** when designing OpenAPI-compliant REST API.
  
  Different parts are shared using TypeScript methods (see *src/apis/v1/openapi*, especially *src/apis/v1/openapi/components*).
- REST API implementation consists of 3 parts:
  - General functionality.
  - Routing & request-response handling - with regard to general functionality.
  - Business logic.
- General REST API functionality includes:
  - Request validation, according to OpenAPI docs (see *src/apis/v1/app*, *src/apis/v1/openapi/index*, and `apiDoc` from files in *src/apis/v1/resolvers*).
  - Optional response validation for debugging purposes (see *src/apis/v1/middlewares/validate-responses.middleware.ts*).
  - OpenAPI documentation generation (see *src/apis/v1/app*, *src/apis/v1/openapi/index*, and `apiDoc` from files in *src/apis/v1/resolvers*).
  - Unified errors from infrastructure part, enhanced by OpenAPI.

    Depending on code, some additional properties might be present. For example, for OpenAPI errors they are `ajv` errors and similar, telling, what exactly is wrong (see *src/apis/v1/openapi/index*, *src/apis/v1/middlewares*).
- Routing in `express-openapi` is peculiar. It interprets directory tree at a particular point as REST API URL endpoint tree.
  
  In the project such URL is *src/apis/v1/resolvers*. It contains file *src/apis/v1/resolvers/diamonds-assessed.ts*, which contains `Express.Handler = (req, res, next) => void` for HTTP methods. 

  File *src/apis/v1/resolvers/diamonds-assessed.ts* with exported property `post` corresponds to URL `POST {originUrl}/api/v1/diamonds-assessed`.

  If there is a need to access some resource by id, it would be located at *src/apis/v1/resolvers/diamonds-assessed/{diamondId}.ts* and would have exported `get` property.
- Business logic is located in services.

  Implementation agnostic business logic is located in *src/services*.

  API-connected logic (handling application errors (like custom not found errors for entities), collecting data from several sources, etc.) is located in *src/apis/v1/services/\*.common.ts* files. These files are somewhat similar to controllers in other terms.

  Files *src/apis/v1/resolvers/\*.ts* just handle status codes and other HTTP-related things.

## FIXME:
- Maybe, `eslint` requires some tweaking.
- The `express-openapi` library doesn't support `content`, `style` & `explode` in parameters definitions, so a hacky workaround is used. 
