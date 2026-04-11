import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User Service API",
      version: "1.0.0",
      description: "User management service API documentation",
      contact: {
        name: "Restaurant Management System",
        url: "http://localhost:3000",
      },
    },
    servers: [
      {
        url: `http://localhost:3000`,
        description: "Development Server",
      },
      {
        url: `${process.env.API_BASE_URL || "http://localhost:3000"}`,
        description: "Production Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "User ID",
            },
            email: {
              type: "string",
              format: "email",
              description: "User email",
            },
            phone: {
              type: "string",
              description: "User phone number",
            },
            firstName: {
              type: "string",
              description: "User first name",
            },
            lastName: {
              type: "string",
              description: "User last name",
            },
            role: {
              type: "string",
              enum: ["customer", "restaurant_owner", "admin"],
              description: "User role",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Account creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Last update timestamp",
            },
          },
        },
        RegisterRequest: {
          type: "object",
          required: ["email", "password", "firstName", "lastName", "phone"],
          properties: {
            email: {
              type: "string",
              format: "email",
              description: "User email",
            },
            password: {
              type: "string",
              minLength: 6,
              description: "User password (minimum 6 characters)",
            },
            firstName: {
              type: "string",
              description: "User first name",
            },
            lastName: {
              type: "string",
              description: "User last name",
            },
            phone: {
              type: "string",
              description: "User phone number",
            },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              description: "User email",
            },
            password: {
              type: "string",
              description: "User password",
            },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              description: "Success status",
            },
            message: {
              type: "string",
              description: "Response message",
            },
            data: {
              type: "object",
              properties: {
                user: {
                  $ref: "#/components/schemas/User",
                },
                accessToken: {
                  type: "string",
                  description: "JWT access token",
                },
                refreshToken: {
                  type: "string",
                  description: "JWT refresh token",
                },
              },
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              description: "Error message",
            },
            statusCode: {
              type: "integer",
              description: "HTTP status code",
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      {
        name: "Authentication",
        description: "User authentication endpoints",
      },
      {
        name: "Profile",
        description: "User profile endpoints",
      },
      {
        name: "Admin",
        description: "Admin management endpoints (requires admin role)",
      },
    ],
  },
  apis: ["./src/routes/route.ts", "./src/controller/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
