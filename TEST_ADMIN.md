# Admin Dashboard Testing Guide

## Current Issues & Solutions

### Issue 1: Console 404 Errors from Contact.jsx
**Problem**: Browser console shows repeated 404 errors from Contact.jsx:264
**Cause**: Browser cache contains old version of Contact.jsx with fetchData function
**Solution**: Clear browser cache and hard refresh

**Steps to Fix**:
1. Open browser DevTools (F12)
2. Right-click on refresh button
3. Select "Empty Cache and Hard Reload" (Chrome) or "Clear Cache" (Firefox)
4. Or press: `Ctrl + Shift + Delete` → Clear cache → Reload page

### Issue 2: Changes Not Saving
**Problem**: Admin dashboard changes don't persist or show on website
**Possible Causes**:
- Server not running
- Wrong API endpoint
- Browser cache showing old data
- JSON file write permissions

## Testing Steps

### 1. Verify Server is Running
```bash
cd server
node server.js
```

Expected output:
```
🚀 Server running on port 5001
✅ Using local JSON database
📝 Admin credentials: admin@4pixels.com / admin123
```

### 2. Test Database Operations
Run the test script:
```bash
node test-admin.js
```

This will test:
- Reading from JSON files
- Writing to JSON files
- Creating new items
- Updating existing items

### 3. Test Admin Dashboard

#### A. Login
1. Go to: `http://localhost:3000/login`
2. Email: `admin@4pixels.com`
3. Password: `admin123`
4. Click "Login"

#### B. Test Services Tab
1. Click "Services" tab
2. Click "Add New Service"
3. Fill in:
   - Title (EN): "Test Service"
   - Title (AR): "خدمة تجريبية"
   - Description (EN): "This is a test"
   - Description (AR): "هذا اختبار"
   - Category: Select from dropdown (e.g., "Web Development")
   - Price: 100
   - Delivery Time: "1 week"
4. Click "Save"
5. Check if service appears in list
6. Open browser DevTools → Network tab
7. Look for POST request to `/api/services`
8. Check response status (should be 201)

#### C. Test Projects Tab
1. Click "Projects" tab
2. Click "Add New Project"
3. Fill in:
   - Title (EN): "Test Project"
   - Title (AR): "مشروع تجريبي"
   - Description (EN): "Test description"
   - Description (AR): "وصف تجريبي"
   - Category: Select from dropdown
   - Upload 1-3 images from your device
4. Click "Save"
5. Verify project appears in list with images

#### D. Test Reviews Tab
1. Click "Reviews" tab
2. Click "Add New Review"
3. Fill in:
   - Customer Name (EN): "John Doe"
   - Customer Name (AR): "محمد أحمد"
   - Review Text (EN): "Great service!"
   - Review Text (AR): "خدمة رائعة!"
   - Rating: 5 stars
   - Upload customer image
   - Active: Yes
4. Click "Save"
5. Verify review appears in list

### 4. Verify Changes on Website

#### A. Check Services Page
1. Go to: `http://localhost:3000/services`
2. Look for your new "Test Service"
3. Verify category is displayed
4. Click "View Details" to see full service page

#### B. Check Projects Page
1. Go to: `http://localhost:3000/projects`
2. Look for your new "Test Project"
3. Verify images are displayed
4. Click on project to see detail page

#### C. Check Home Page
1. Go to: `http://localhost:3000`
2. Scroll to Services section
3. Verify new service appears
4. Scroll to Projects section
5. Verify new project appears
6. Scroll to Reviews section
7. Verify new review appears

### 5. Check JSON Files Directly

Open these files to verify data was saved:
- `server/data/services.json`
- `server/data/projects.json`
- `server/data/reviews.json`

Look for your test items with:
- Correct titles
- Category field
- Images (Base64 encoded)
- createdAt timestamp

## Common Issues & Fixes

### Issue: "Failed to save"
**Check**:
1. Server is running on port 5001
2. You're logged in as admin
3. All required fields are filled
4. Check browser console for errors
5. Check server terminal for errors

### Issue: Changes don't appear on website
**Solutions**:
1. Hard refresh browser: `Ctrl + Shift + R`
2. Clear browser cache
3. Check if server restarted
4. Verify JSON file was actually updated

### Issue: Images not uploading
**Check**:
1. Image file size (should be < 5MB)
2. Image format (JPG, PNG, GIF, WebP)
3. Browser console for errors
4. Try smaller image

### Issue: Category not showing
**Check**:
1. Category dropdown is selected (not empty)
2. Service/Project was saved after adding category
3. Browser cache cleared
4. JSON file has "category" field

## API Endpoints Reference

### Services
- GET `/api/services` - Get all services
- GET `/api/services/:id` - Get single service
- POST `/api/services` - Create service (Admin)
- PUT `/api/services/:id` - Update service (Admin)
- DELETE `/api/services/:id` - Delete service (Admin)

### Projects
- GET `/api/projects` - Get all projects
- GET `/api/projects/:id` - Get single project
- POST `/api/projects` - Create project (Admin)
- PUT `/api/projects/:id` - Update project (Admin)
- DELETE `/api/projects/:id` - Delete project (Admin)

### Reviews
- GET `/api/reviews` - Get all reviews
- GET `/api/reviews/:id` - Get single review
- POST `/api/reviews` - Create review (Admin)
- PUT `/api/reviews/:id` - Update review (Admin)
- PATCH `/api/reviews/:id/toggle` - Toggle active status (Admin)
- DELETE `/api/reviews/:id` - Delete review (Admin)

### Messages
- POST `/api/messages` - Submit message (Public)
- GET `/api/messages` - Get all messages (Admin)
- PATCH `/api/messages/:id/read` - Mark as read (Admin)
- DELETE `/api/messages/:id` - Delete message (Admin)

## Browser DevTools Tips

### Network Tab
1. Open DevTools (F12)
2. Go to Network tab
3. Filter by "Fetch/XHR"
4. Perform action in Admin Dashboard
5. Check request/response:
   - Status code (200, 201, 400, 404, 500)
   - Request payload (data being sent)
   - Response data (what server returned)

### Console Tab
- Look for errors (red text)
- Check API call logs
- Verify data fetching

### Application Tab
- Check localStorage for auth token
- Clear storage if needed

## Success Checklist

- [ ] Server running on port 5001
- [ ] Client running on port 3000
- [ ] Can login to Admin Dashboard
- [ ] Can create new service with category
- [ ] Can create new project with multiple images
- [ ] Can create new review with image
- [ ] Changes appear in JSON files
- [ ] Changes appear on website after refresh
- [ ] No 404 errors in console (after cache clear)
- [ ] All images display correctly
- [ ] Categories show in dropdowns and on pages
