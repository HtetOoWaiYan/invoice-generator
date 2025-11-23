# Invoice Generator

A simple, client-side invoice generator designed for Myanmar businesses. Built with React, TypeScript, and Tailwind CSS.

## Features

- **Mobile-First Design**: Optimized for mobile usage.
- **Instant Preview**: Real-time invoice preview as you edit.
- **Image Export**: Download invoices as high-quality PNG images.
- **Myanmar Currency Support**: MMK currency formatting.
- **Delivery & Discount**: Support for delivery fees and discounts (amount or percentage).
- **Configurable Businesses**: Manage multiple business profiles via environment variables.

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- `html-to-image` for export
- `nanoid` for ID generation

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Configure Environment Variables:**
    Copy `.env.example` to `.env` and update the business profiles if needed.
    ```bash
    cp .env.example .env
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Build for production:**
    ```bash
    npm run build
    ```

## Configuration

You can configure business profiles using the `VITE_BUSINESSES` environment variable. It accepts a JSON string array of business objects.

Example `.env`:
```env
VITE_BUSINESSES='[{"id":"my-shop","name":"My Shop","phone":"09123456789","description":"KBZPay - 09...","themeColor":"#1e3a8a"}]'
```

## License

This project is licensed under the terms of the [LICENSE](LICENSE) file.
