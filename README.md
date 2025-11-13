# Clinica San Miguel Chatbot

An intelligent chatbot for Clinica San Miguel with 10,000 Q&A pairs about services, pricing, locations, and healthcare information.

## Features

- 🤖 **10,000 Q&A Pairs**: Comprehensive database covering all aspects of Clinica San Miguel
- 🎨 **Custom Design**: Poppins font with #C1001F, white, and black color scheme
- 🔍 **Smart Search**: Fuzzy matching using Fuse.js for accurate answers
- 💬 **Interactive UI**: Modern chat interface with floating button
- 🌐 **Bilingual**: English and Spanish support
- 📱 **Responsive**: Works on all devices

## Color Scheme

- **Primary**: #C1001F (Clinica San Miguel Red)
- **Secondary**: White (#FFFFFF)
- **Tertiary**: Black (#000000)

## Font

- **Poppins** (Google Fonts) - All weights

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Generate Q&A Database

```bash
node scripts/generate-qa.js
```

This will create a `data/qa-database.json` file with 10,000 questions and answers.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
mcm-chatbot/
├── app/
│   ├── api/
│   │   └── qa/
│   │       └── route.ts          # API endpoint for Q&A data
│   ├── globals.css               # Global styles with Poppins font
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main chatbot component
├── data/
│   └── qa-database.json          # 10,000 Q&A pairs (generated)
├── scripts/
│   └── generate-qa.js            # Script to generate Q&A database
├── package.json
├── tailwind.config.ts            # Tailwind with custom colors
└── tsconfig.json
```

## Q&A Database

The chatbot includes 10,000 questions covering:

- **Pricing**: Visit costs, payment options, insurance
- **Services**: Medical services, treatments, procedures
- **Locations**: 17 Texas locations (Dallas, Houston, San Antonio, etc.)
- **Appointments**: Walk-in care, scheduling, wait times
- **Staff**: Bilingual services, language support
- **Insurance**: Medicaid, Medicare, uninsured options
- **Symptoms**: Common health concerns and treatments
- **Medical Conditions**: Chronic and acute condition management
- **General Info**: Hours, parking, accessibility

## Key Information

- **Cost**: $19 per visit
- **Insurance**: Not required
- **Appointments**: Walk-in, no appointment needed
- **Locations**: 17 across Texas
- **Languages**: English & Spanish
- **Mission**: Making healthcare a right, not a privilege

## Technologies

- **Next.js 14**: React framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Fuse.js**: Fuzzy search
- **Lucide React**: Icons

## Customization

### Update Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: '#C1001F',
  secondary: '#FFFFFF',
  tertiary: '#000000',
}
```

### Update Font

Edit `app/globals.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
```

### Add More Q&A

Edit `scripts/generate-qa.js` and regenerate:

```bash
node scripts/generate-qa.js
```

## Deployment

Deploy to Vercel, Netlify, or any Next.js hosting platform:

```bash
npm run build
```

## Support

For questions about Clinica San Miguel:
- Website: https://new.clinicsanmiguel.com
- 17 locations across Texas
- Affordable $19 visits

## License

© 2025 Clinica San Miguel. All Rights Reserved.
