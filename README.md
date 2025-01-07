# Mimo Frontend

This is a frontend of Mimo ecommerce developed using vue.js and typescript with a focus on state management, API requests, form validation, and routing.

## Project Structure

```
mimo-frontend/
├── public/                        # Public files (index.html, favicon.ico)
│   └── index.html
│   └── favicon.ico
├── src/
│   ├── api/                       # API client and request logic
│   │   └── apiClient.ts
│   │   └── authApi.ts
│   ├── assets/                    # Static assets (images, logos)
│   │   └── logo.png
│   │   └── bg-pattern.svg
│   ├── components/                # Reusable UI components
│   │   ├── form/                  # Form components
│   │   ├── layout/                # Layout components
│   ├── composables/               # Reusable logic for state, forms, API calls
│   │   ├── useApiRequest.ts
│   │   ├── useFormValidation.ts
│   ├── forms/                     # Form components for specific pages
│   ├── layouts/                   # Global page layouts
│   ├── router/                    # Routing configuration
│   │   └── index.ts
│   ├── stores/                    # State management with Pinia
│   ├── styles/                    # Global styling
│   ├── utils/                     # Utility files (validation schemas, etc.)
│   └── views/                     # Main views of the application
│       ├── RegisterView.vue
│       ├── LoginView.vue
│       └── ResetPasswordView.vue
├── .gitignore                     # Git ignore file
├── package.json                   # Project dependencies and scripts
├── tailwind.config.js             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
├── vite.config.ts                 # Vite configuration
└── README.md                      # This file
```

## Getting Started

1. Clone the repository:

   ```bash
   git clone git@github.com:DaniOmer/mimo-frontend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd mimo-frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open `http://localhost:5173` in your browser.

## Features

- State management with Pinia
- API handling with Axios
- Form validation using Zod
- Routing with Vue Router
- Responsive design with TailwindCSS

## License

This project is licensed under the [MIT License](LICENSE).

## Credit

Mimo frontend Project is developed and maintained by [Omer DOTCHAMOU](https://www.omerdotchamou.com), [Saidou IBRAHIM](https://github.com/isaidou), [Johnny CHEN](https://github.com/johnnyhelloworld) and [Faez BACAR ZOUBEIRI](https://github.com/FAEZ10).
