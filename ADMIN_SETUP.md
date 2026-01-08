# Admin Setup Guide

## Creating the Admin User

To create the admin user in the database, follow these steps:

1. Navigate to the server directory:
```bash
cd server
```

2. Run the admin creation script:
```bash
npm run create-admin
```

This will create an admin user with the following credentials:
- **Email:** admin@insurecare.com
- **Password:** Admin@123

## Admin Login

Once the admin user is created:

1. Start the server (if not already running):
```bash
npm run dev
```

2. Navigate to the admin login page at: `http://localhost:5173/admin/login`

3. Use the credentials:
   - Email: `admin@insurecare.com`
   - Password: `Admin@123`

## Notes

- The script will check if an admin already exists before creating a new one
- The password is securely hashed using bcrypt before storing in the database
- Admin sessions are valid for 12 hours
- The admin collection is separate from regular users
