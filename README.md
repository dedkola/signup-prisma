# 🚀 Signup Form with Prisma Database

A beautiful, modern signup form built with **Next.js 15**, **TypeScript**, **Prisma ORM**, and **PostgreSQL**. This project demonstrates a complete user registration system with real-time validation, error handling, and secure data storage.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

- 🎨 **Modern UI Design** - Clean, responsive interface with Tailwind CSS
- 🔒 **Secure Validation** - Client-side and server-side email validation
- 💾 **Database Integration** - PostgreSQL database with Prisma ORM
- 🚫 **Duplicate Prevention** - Prevents multiple accounts with same email
- 📱 **Fully Responsive** - Works perfectly on all device sizes
- 🌙 **Dark Mode Support** - Beautiful light and dark themes
- ⚡ **Real-time Feedback** - Instant validation and error messages
- 🔄 **Loading States** - Smooth user experience with loading indicators
- 🛡️ **Type Safety** - Full TypeScript support throughout
- 🎯 **Production Ready** - Optimized for deployment

## 🏗️ Tech Stack

| Technology            | Purpose            | Version |
| --------------------- | ------------------ | ------- |
| **Next.js**           | React Framework    | 15.x    |
| **TypeScript**        | Type Safety        | 5.x     |
| **Prisma**            | Database ORM       | 6.x     |
| **PostgreSQL**        | Database           | Latest  |
| **Tailwind CSS**      | Styling            | 4.x     |
| **Heroicons**         | Icon Library       | 2.x     |
| **Prisma Accelerate** | Connection Pooling | Latest  |

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0 or later
- **PostgreSQL** database (local or cloud)
- **pnpm** (recommended) or npm

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/signup-prisma.git
cd signup-prisma
```

### 2. Install Dependencies

```bash
pnpm install
# or
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL="your-postgresql-connection-string"

# For Prisma Accelerate (optional)
# DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=your-api-key"
```

### 4. Database Setup

```bash
# Generate Prisma client
pnpm prisma generate

# Push schema to database
pnpm prisma db push

# (Optional) Open Prisma Studio to view data
pnpm prisma studio
```

### 5. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the signup form.

## 📁 Project Structure

```
signup-prisma/
├── app/
│   ├── api/
│   │   └── signup/
│   │       └── route.ts          # Signup API endpoint
│   ├── components/
│   │   └── SignupForm.tsx        # Main signup form component
│   ├── generated/
│   │   └── prisma/               # Generated Prisma client
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Homepage
├── lib/
│   └── prisma.ts                 # Prisma client configuration
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── migrations/               # Database migrations
├── public/                       # Static assets
├── .env                          # Environment variables
├── package.json                  # Dependencies
├── tailwind.config.ts            # Tailwind configuration
└── tsconfig.json                 # TypeScript configuration
```

## 🗄️ Database Schema

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  posts     Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🔧 API Endpoints

### POST `/api/signup`

Register a new user with email and optional name.

**Request Body:**

```json
{
  "email": "user@example.com",
  "name": "John Doe"
}
```

**Success Response (201):**

```json
{
  "message": "Account created successfully!",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**Error Responses:**

- `400` - Validation error (invalid email, missing fields)
- `409` - User already exists
- `500` - Internal server error

## 🛠️ Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint

# Generate Prisma client
pnpm prisma generate

# Apply database changes
pnpm prisma db push

# Create new migration
pnpm prisma migrate dev

# Open Prisma Studio
pnpm prisma studio

# Reset database (⚠️ destroys data)
pnpm prisma migrate reset
```

## 🌟 Features Breakdown

### Form Validation

- ✅ Real-time email format validation
- ✅ Required field validation
- ✅ Duplicate email prevention
- ✅ Custom error messages

### User Experience

- ✅ Loading states during submission
- ✅ Success and error feedback
- ✅ Form auto-reset after success
- ✅ Responsive design
- ✅ Accessibility features

### Security

- ✅ Server-side validation
- ✅ SQL injection prevention (Prisma)
- ✅ Input sanitization
- ✅ Error handling

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

This project can be deployed on any platform that supports Next.js:

- **Netlify**
- **Railway**
- **AWS Amplify**
- **Google Cloud Run**
- **Azure Static Web Apps**

## 🔧 Configuration

### Environment Variables

| Variable       | Description                          | Required |
| -------------- | ------------------------------------ | -------- |
| `DATABASE_URL` | PostgreSQL connection string         | ✅       |
| `NODE_ENV`     | Environment (development/production) | ❌       |

### Prisma Configuration

The project uses Prisma with the following features:

- **Connection pooling** with Prisma Accelerate
- **Type-safe** database queries
- **Auto-generated** TypeScript types
- **Migration** system for schema changes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Prisma Team** - For the excellent database toolkit
- **Tailwind CSS** - For the utility-first CSS framework
- **Heroicons** - For the beautiful icon library

## 📧 Contact

Your Name - [@dedkola](https://github.com/dedkola)
