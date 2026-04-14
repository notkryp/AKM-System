# Wireframe: Reservation Form Page
**Author:** Abhishek Pokharel (UX Lead)  
**Date:** 14 April 2026  
**Version:** 1.0

## Layout Description

```
┌─────────────────────────────────────────────────────┐
│  NAVBAR: [AKM Library]        [Login] [My Bookings] │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ← Back to Books                                   │
│                                                     │
│  Reserve: "The Great Gatsby"                        │
│  by F. Scott Fitzgerald  |  Genre: Classic          │
│                                                     │
│  ┌───────────────────────────────────────┐         │
│  │  Full Name *                          │         │
│  │  ┌─────────────────────────────────┐ │         │
│  │  │ John Doe                        │ │         │
│  │  └─────────────────────────────────┘ │         │
│  │                                       │         │
│  │  Email Address *                      │         │
│  │  ┌─────────────────────────────────┐ │         │
│  │  │ john@example.com                │ │         │
│  │  └─────────────────────────────────┘ │         │
│  │                                       │         │
│  │  Pickup Date *                        │         │
│  │  ┌─────────────────────────────────┐ │         │
│  │  │ 📅 DD/MM/YYYY                   │ │         │
│  │  └─────────────────────────────────┘ │         │
│  │                                       │         │
│  │       [ Confirm Reservation ]         │         │
│  └───────────────────────────────────────┘         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## Validation Rules
- Name: required, min 2 characters
- Email: required, valid email format
- Pickup Date: required, must be future date (min today + 1)

## Success State
- Toast notification: "Reservation confirmed!"
- Redirect to My Reservations page after 2 seconds

## Error State
- Inline field errors shown below each input
- Book unavailable: show banner "This book has just been reserved"
