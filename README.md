
# E-pharma Nigeria - Full Application Documentation

## 1. Project Overview

**E-pharma Nigeria** is a modern, full-stack e-pharmacy web application designed to connect users in Nigeria with verified local pharmacies. It provides a seamless platform for ordering authentic medications, tracking deliveries in real-time, and accessing telehealth services. The application is built with a focus on user experience, performance, and scalability, featuring a sophisticated administrative system for comprehensive platform management.

---

## 2. For Developers

This section provides technical details for developers working on the project.

### 2.1. Core Technologies & Tools

*   **Framework:** Next.js 15 (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS with CSS Custom Properties for dynamic theming.
*   **UI Components:** ShadCN UI - A collection of reusable and accessible components.
*   **Animations:** Framer Motion for smooth page transitions and micro-interactions.
*   **Artificial Intelligence:** Genkit for AI-powered features like the drug interaction checker.
*   **Mapping & Geolocation:**
    *   **Leaflet:** For displaying interactive maps.
    *   **Distancematrix.ai:** Used via API for geocoding addresses and calculating delivery distances/costs.

### 2.2. Getting Started & Setup

**Prerequisites:**
*   Node.js (v18 or later)
*   npm or yarn

**Installation Steps:**

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root of the project and add the following required keys. You can use the existing `.env` file as a template.

    ```env
    # Distancematrix.ai API Key (Required for Checkout & Geolocation)
    # Get a key from https://distancematrix.ai/
    DISTANCEMATRIX_AI_KEY="YOUR_DISTANCEMATRIX_AI_KEY"

    # Paystack Public Key (Required for Online Payments)
    # Get this from your Paystack dashboard
    NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY="YOUR_PAYSTACK_PUBLIC_KEY"

    # Genkit / Google AI API Key (Required for AI features)
    # Get a key from Google AI Studio
    GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

    # Mapillary Access Token (Optional, for street-view maps)
    # Get a token from https://www.mapillary.com/dashboard/developers
    NEXT_PUBLIC_MAPILLARY_ACCESS_TOKEN="YOUR_MAPILLARY_TOKEN"
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

### 2.3. Project Structure Highlights

```
/src
├── app/                  # Next.js App Router: all pages and layouts
│   ├── (main)/           # Main marketing/public pages
│   ├── admin/            # Admin dashboard layouts and pages
│   ├── dashboard/        # Customer dashboard
│   ├── dispatcher/       # Dispatcher dashboard
│   ├── hospital/         # Hospital dashboard
│   ├── pharmacy/         # Pharmacy dashboard
│   └── api/              # API routes (e.g., /api/geocode)
├── components/           # Reusable components (UI, landing, dashboard, etc.)
│   ├── admin/
│   ├── dashboard/
│   ├── landing/
│   ├── ui/               # ShadCN UI components
│   └── ...
├── contexts/             # React Context providers (Auth, Cart, Theme)
├── hooks/                # Custom hooks (e.g., useOrders, useMessaging)
├── lib/                  # Utility functions, mock data, and theme definitions
└── types/                # TypeScript type definitions
```

### 2.4. Theming System

The application uses a dynamic, CSS variable-based theming system managed by `src/contexts/theme-context.tsx`.

*   **Theme Definitions:** Predefined themes are located in `src/lib/themes.ts`.
*   **Applying Themes:** The `ThemeProvider` reads the selected theme (from localStorage or defaults) and applies its HSL color values to CSS variables defined in `src/app/globals.css`.
*   **Tailwind Integration:** `tailwind.config.ts` is configured to use these CSS variables, ensuring all Tailwind utility classes and ShadCN components automatically adopt the active theme.

### 2.5. API & External Services

*   **Distancematrix.ai:** Used for calculating delivery fees and geocoding addresses. The API is called from server-side route handlers in `/src/app/api/`.
*   **Paystack:** Integrated on the client-side in `/src/app/checkout/page.tsx` for processing online payments. It includes logic for successful callbacks and cancellations.
*   **Genkit (Google AI):** AI flows are defined in `/src/ai/flows/`. These server-side functions are called from client components to perform tasks like checking for drug interactions.

---

## 3. For Administrators

The platform features a three-tier admin system to delegate responsibilities effectively.

### 3.1. Admin Roles & Responsibilities

1.  **Super Admin:**
    *   **Access:** `yourdomain.com/admin/login` (Select "Super Admin" role)
    *   **Responsibilities:** Has complete oversight of the platform. Manages pharmacies, patients, dispatchers, and other administrators. Views platform-wide analytics and performance metrics.

2.  **Finance Admin:**
    *   **Access:** `yourdomain.com/admin/login` (Select "Finance Admin" role)
    *   **Responsibilities:** Manages all financial aspects, including viewing transaction reports, managing payouts to partners, and handling disputes or refunds.

3.  **Content Admin:**
    *   **Access:** `yourdomain.com/admin/login` (Select "Content Admin" role)
    *   **Responsibilities:** Manages the website's content. This includes creating and managing blog posts, uploading homepage slider images, and **changing the website's theme**.

### 3.2. Logging In

To access any admin dashboard, navigate to the **Admin Portal** at `yourdomain.com/admin/login`. You will be prompted to select your role and enter your credentials. For this demo, mock credentials are used.

---

## 4. For Users & Partners

Welcome to E-pharma! Here’s how to get started.

### 4.1. For Customers

*   **Create an Account:** Sign up for a free account at `yourdomain.com/signup`.
*   **Order Medication:** Search for products, add them to your cart, and proceed to checkout.
*   **Pin Location:** At checkout, you can pin your exact delivery location on the map to ensure accurate and fast delivery.
*   **Track Orders:** Once your order is placed, you can track its status in real-time from your customer dashboard.
*   **Dashboard:** Access your dashboard at `yourdomain.com/dashboard` to view order history, manage your profile, and more.

### 4.2. For Partners (Pharmacies, Dispatchers, Hospitals)

Interested in joining our network?

*   **Register:** Visit `yourdomain.com/partner` to begin the registration process. Select whether you are a Pharmacy, Dispatcher, or Hospital.
*   **Verification:** After submitting your application, our team will review it. You will be notified once your account is approved.
*   **Login:** Once approved, you can log in to your dedicated partner dashboard via `yourdomain.com/partner/login`.
*   **Dashboard Features:** Each partner dashboard is tailored to your needs:
    *   **Pharmacies:** Manage inventory, process incoming orders, and view sales analytics.
    *   **Dispatchers:** View and accept new delivery assignments, see customer locations on a map, and track your delivery history.
    *   **Hospitals:** Place bulk orders, manage staff access, and communicate with pharmacy partners.

---

*This documentation was last updated on July 29, 2024.*
