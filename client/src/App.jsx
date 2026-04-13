import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

// Pages
import BookListPage from './pages/BookListPage'
import BookDetailPage from './pages/BookDetailPage'
import ReservationFormPage from './pages/ReservationFormPage'
import MyReservationsPage from './pages/MyReservationsPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import AdminPage from './pages/AdminPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Navbar />
        <main>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<BookListPage />} />
            <Route path="/books/:id" element={<BookDetailPage />} />
            <Route path="/books/:id/reserve" element={<ReservationFormPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Protected routes — logged in users only */}
            <Route element={<ProtectedRoute />}>
              <Route path="/my-reservations" element={<MyReservationsPage />} />
            </Route>

            {/* Protected routes — admin only */}
            <Route element={<ProtectedRoute adminOnly />}>
              <Route path="/admin" element={<AdminPage />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App
