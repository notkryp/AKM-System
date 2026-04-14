# Wireframe: My Reservations Page
**Author:** Abhishek Pokharel (UX Lead)  
**Date:** 14 April 2026  
**Version:** 1.0

## Layout Description

```
┌─────────────────────────────────────────────────────┐
│  NAVBAR: [AKM Library]        [Logout] [My Bookings]│
├─────────────────────────────────────────────────────┤
│                                                     │
│  My Reservations                                    │
│  Logged in as: john@example.com                     │
│                                                     │
│  ┌───────────────────────────────────────────────┐ │
│  │ 📖 The Great Gatsby                           │ │
│  │ F. Scott Fitzgerald  |  Classic               │ │
│  │ Pickup: 20 April 2026   Status: ● Active      │ │
│  │                              [Cancel Booking] │ │
│  └───────────────────────────────────────────────┘ │
│                                                     │
│  ┌───────────────────────────────────────────────┐ │
│  │ 📖 1984                                       │ │
│  │ George Orwell  |  Dystopian                   │ │
│  │ Pickup: 25 April 2026   Status: ● Active      │ │
│  │                              [Cancel Booking] │ │
│  └───────────────────────────────────────────────┘ │
│                                                     │
│  ── Empty State ──────────────────────────────────  │
│  📭 No reservations yet.                           │
│     [Browse Books]                                 │
└─────────────────────────────────────────────────────┘
```

## Components
- **ReservationCard**: Book info, pickup date, status badge, cancel button
- **EmptyState**: Shown when no reservations exist
- **CancelModal**: Confirmation dialog before cancelling

## Acceptance Criteria
- Only shows reservations for logged-in user
- Cancel updates book availability back to true in Supabase
- Empty state shown with Browse Books CTA
