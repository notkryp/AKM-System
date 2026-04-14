# Wireframe: Book List Page
**Author:** Abhishek Pokharel (UX Lead)  
**Date:** 14 April 2026  
**Version:** 1.0

## Layout Description

```
┌─────────────────────────────────────────────────────┐
│  NAVBAR: [AKM Library]        [Login] [My Bookings] │
├─────────────────────────────────────────────────────┤
│                                                     │
│  📚 Browse Books                                    │
│                                                     │
│  ┌─────────────────────────────────────┐           │
│  │  🔍  Search by title or author...  │           │
│  └─────────────────────────────────────┘           │
│                                                     │
│  Filter: [All] [Classic] [Sci-Fi] [Dystopian] ...  │
│                                                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │ 📖       │ │ 📖       │ │ 📖       │           │
│  │ Title    │ │ Title    │ │ Title    │           │
│  │ Author   │ │ Author   │ │ Author   │           │
│  │ Genre    │ │ Genre    │ │ Genre    │           │
│  │ ●Available│ │ ●Available│ │ ✕Taken  │           │
│  │[Reserve] │ │[Reserve] │ │[Details] │           │
│  └──────────┘ └──────────┘ └──────────┘           │
│                                                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │ 📖       │ │ 📖       │ │ 📖       │           │
│  │ ...      │ │ ...      │ │ ...      │           │
│  └──────────┘ └──────────┘ └──────────┘           │
└─────────────────────────────────────────────────────┘
```

## Components
- **Navbar**: Logo left, auth buttons right
- **SearchBar**: Full-width, live search (debounced 300ms)
- **GenreFilter**: Horizontal pill buttons, active state highlighted
- **BookCard**: Cover placeholder, title, author, genre badge, availability badge, CTA button
- **AvailabilityBadge**: Green dot = Available, Red dot = Unavailable

## Responsive Behaviour
- Desktop: 3-column grid
- Tablet: 2-column grid
- Mobile: 1-column stack

## Acceptance Criteria
- Books load from Supabase on page load
- Search filters results in real time
- Genre filter narrows results correctly
- Unavailable books show disabled reserve button
