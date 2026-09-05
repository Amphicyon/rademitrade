# Rademitrade Data Sync Engine

Backend service for importing, processing, reviewing and synchronizing supplier product data with the Rademitrade WooCommerce store.

## Architecture

Supplier Sources
→ Parser / Connector
→ Data Validation
→ Product Normalization
→ Pricing Engine
→ Content Processing
→ Media Processing
→ Review Queue
→ WooCommerce Sync

## Core Modules

### Supplier Connectors
Each supplier has an independent connector.

Preferred data sources:
1. Official API
2. XML / CSV / product feed
3. Authorized public website data

### Product Data
The system may process:
- Product name
- SKU / Manufacturer SKU
- Manufacturer
- Categories
- Price
- Currency
- Stock availability
- Specifications
- Dimensions and weight
- Lead time
- Shipping information
- Images
- Documentation
- Product URL

### Pricing Engine
Supplier prices are never published directly.

Supplier Price
→ Currency Conversion
→ Rademitrade Pricing Rules
→ Margin / Markup
→ Shipping / Risk Rules
→ Final Selling Price

WooCommerce base currency: USD.

### Content Processing
Supplier descriptions are normalized and rewritten into the
Rademitrade catalog style while preserving factual and technical data.

Technical specifications must not be invented or altered.

### Media Processing
Images must pass through the Rademitrade media pipeline before publication:

Original Image
→ Validation
→ Duplicate Check
→ Resize / Crop
→ Optimization
→ WebP / AVIF
→ Rademitrade Branding
→ WooCommerce

A black-and-white Rademitrade brand stamp is placed discreetly in a
bottom corner without covering the product or important details.

Original authorized source images are retained separately from processed versions.

### Synchronization
Three operating modes are planned:

- Import — initial product import
- Sync — update existing product data
- Review — require approval for significant changes

Products should be matched primarily by stable supplier identifiers / SKU.

A missing supplier product must not be automatically deleted from WooCommerce.
It should be flagged for review or marked unavailable according to source rules.

### WooCommerce
WooCommerce is the source of truth for the live Rademitrade catalog,
orders, inventory state and storefront.

The Sync Engine communicates with WooCommerce through authenticated APIs.

### Security
Secrets must NEVER be committed to this repository.

Examples:
- WooCommerce Consumer Key
- WooCommerce Consumer Secret
- API tokens
- AI API keys
- Supplier credentials
- Webhook secrets

Secrets are stored in Vercel Environment Variables.

### Reliability
The synchronization system must:
- log every synchronization run
- avoid duplicate products
- avoid duplicate media uploads
- validate data before publication
- retry temporary failures safely
- prevent one supplier failure from affecting the store
- support rollback/review of important changes

## Deployment

Code repository:
GitHub — Amphicyon/rademitrade

Runtime:
Vercel

Store:
Rademitrade WordPress / WooCommerce

Production storefront:
https://rademitrade.com

## Status

Rademitrade Data Sync Engine — initial architecture.
