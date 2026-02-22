# Admin Dashboard - Complete Guide

## Overview
The Admin Dashboard provides complete control over all website content including Services, Projects, Reviews, and Messages.

## Features

### 1. Dashboard Overview
- **Statistics Cards**: View key metrics at a glance
  - Active Services count
  - Total Projects count
  - Unread Messages count
  - Active Reviews count
- **Recent Messages**: Quick view of latest customer inquiries
- **Recent Reviews**: Latest customer testimonials

### 2. Services Management
**Features:**
- View all services in a grid layout
- Search services by title (English/Arabic)
- Add new services
- Edit existing services
- Delete services
- Each service includes:
  - Title (English & Arabic)
  - Description (English & Arabic)
  - Price
  - Delivery Time
  - Features list (English & Arabic)
  - Active/Inactive status

**Actions:**
- Click "Add Service" to create new service
- Click edit icon to modify service
- Click delete icon to remove service

### 3. Projects Management
**Features:**
- View all projects in a grid layout
- Search projects by title
- Filter by category
- Add new projects
- Edit existing projects
- Delete projects
- Each project includes:
  - Title (English & Arabic)
  - Description (English & Arabic)
  - Category
  - Client name
  - Images
  - Tags

**Actions:**
- Click "Add Project" to create new project
- Click edit icon to modify project
- Click delete icon to remove project
- Use category filters to view specific types

### 4. Reviews Management ⭐ NEW
**Features:**
- View all reviews (active and inactive)
- Filter by status (All/Active/Inactive)
- Add new reviews
- Edit existing reviews
- Delete reviews
- Toggle active/inactive status
- Each review includes:
  - Customer name (English & Arabic)
  - Review text (English & Arabic)
  - Rating (1-5 stars)
  - Customer image
  - Verified badge
  - Active/Inactive status

**Actions:**
- Click "Add Review" to create new review
- Click "Activate/Deactivate" to toggle visibility
- Click edit icon to modify review
- Click delete icon to remove review

### 5. Messages Inbox
**Features:**
- View all customer messages
- Filter by status (All/Unread/Read)
- Mark messages as read
- Delete messages
- Each message includes:
  - Customer name, email, phone
  - Company name
  - Service interest
  - Message content
  - Timestamp
  - Read/Unread status

**Actions:**
- Click "Mark as Read" to mark message as read
- Click delete icon to remove message
- Use filters to view specific message types

## API Endpoints

### Services
- `GET /api/services` - Get all active services
- `GET /api/services/:id` - Get single service
- `POST /api/services` - Create service (Admin only)
- `PUT /api/services/:id` - Update service (Admin only)
- `DELETE /api/services/:id` - Delete service (Admin only)

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (Admin only)
- `PUT /api/projects/:id` - Update project (Admin only)
- `DELETE /api/projects/:id` - Delete project (Admin only)

### Reviews ⭐ NEW
- `GET /api/reviews` - Get all active reviews (Public)
- `GET /api/reviews/admin/all` - Get all reviews including inactive (Admin only)
- `GET /api/reviews/:id` - Get single review
- `POST /api/reviews` - Create review (Admin only)
- `PUT /api/reviews/:id` - Update review (Admin only)
- `PATCH /api/reviews/:id/toggle` - Toggle active status (Admin only)
- `DELETE /api/reviews/:id` - Delete review (Admin only)

### Messages
- `GET /api/messages` - Get all messages (Admin only)
- `POST /api/messages` - Submit message (Public)
- `PATCH /api/messages/:id/read` - Mark as read (Admin only)
- `DELETE /api/messages/:id` - Delete message (Admin only)

## Data Structure

### Review Object
```json
{
  "id": "1",
  "name": {
    "en": "Customer Name",
    "ar": "اسم العميل"
  },
  "text": {
    "en": "Review text in English",
    "ar": "نص المراجعة بالعربية"
  },
  "image": "https://i.pravatar.cc/300",
  "rating": 5,
  "verified": true,
  "active": true,
  "createdAt": "2024-01-15T10:00:00.000Z"
}
```

### Service Object
```json
{
  "id": "1",
  "title": {
    "en": "Service Title",
    "ar": "عنوان الخدمة"
  },
  "description": {
    "en": "Service description",
    "ar": "وصف الخدمة"
  },
  "price": 2500,
  "deliveryTime": "2-4 weeks",
  "features": {
    "en": ["Feature 1", "Feature 2"],
    "ar": ["ميزة 1", "ميزة 2"]
  },
  "active": true
}
```

### Project Object
```json
{
  "id": "1",
  "title": {
    "en": "Project Title",
    "ar": "عنوان المشروع"
  },
  "description": {
    "en": "Project description",
    "ar": "وصف المشروع"
  },
  "category": "Web Development",
  "client": "Client Name",
  "images": ["url1", "url2"],
  "tags": ["React", "Node.js"],
  "featured": true
}
```

## Access Control
- All admin routes require authentication
- Login with admin credentials:
  - Email: `admin@4pixels.com`
  - Password: `admin123`
- JWT token is stored in localStorage
- Token is sent with all admin API requests

## Frontend Components

### Admin.jsx
Main admin dashboard component with:
- Sidebar navigation
- Tab-based content switching
- Modal for add/edit operations
- Toast notifications for user feedback

### Tabs:
1. **OverviewTab** - Dashboard statistics and recent items
2. **ServicesTab** - Services management
3. **ProjectsTab** - Projects management
4. **ReviewsTab** - Reviews management ⭐ NEW
5. **MessagesTab** - Messages inbox

### Modal Component
Reusable modal for creating/editing:
- Services
- Projects
- Reviews ⭐ NEW

## Styling
- Responsive design for mobile and desktop
- Dark mode support
- Smooth animations with Framer Motion
- Professional admin UI with cards and grids

## Testing Checklist

### Services
- [ ] View all services
- [ ] Search services
- [ ] Add new service
- [ ] Edit service
- [ ] Delete service
- [ ] Verify bilingual support

### Projects
- [ ] View all projects
- [ ] Search projects
- [ ] Filter by category
- [ ] Add new project
- [ ] Edit project
- [ ] Delete project
- [ ] Verify bilingual support

### Reviews ⭐
- [ ] View all reviews
- [ ] Filter by status
- [ ] Add new review
- [ ] Edit review
- [ ] Toggle active/inactive
- [ ] Delete review
- [ ] Verify reviews appear on homepage
- [ ] Verify bilingual support

### Messages
- [ ] View all messages
- [ ] Filter by read/unread
- [ ] Mark as read
- [ ] Delete message
- [ ] Verify message submission from contact form

### General
- [ ] Login/Logout functionality
- [ ] Token authentication
- [ ] Error handling
- [ ] Toast notifications
- [ ] Responsive design
- [ ] Dark mode
- [ ] Data persistence

## Troubleshooting

### Reviews not showing on homepage
1. Check if reviews are marked as "active" in admin
2. Verify API endpoint `/api/reviews` is working
3. Check browser console for errors
4. Ensure server is running

### Cannot add/edit items
1. Verify you're logged in as admin
2. Check token in localStorage
3. Verify API endpoints are accessible
4. Check server logs for errors

### Data not persisting
1. Ensure server has write permissions to `server/data/` folder
2. Check if JSON files exist
3. Verify `writeJSON` function in `server/db.js`

## Future Enhancements
- Image upload functionality
- Bulk operations
- Export data to CSV
- Analytics and reports
- Email notifications
- Content scheduling
- SEO management
- Multi-language content editor
