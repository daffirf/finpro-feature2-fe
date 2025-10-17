# Dashboard Hooks

Custom React hooks untuk dashboard yang memisahkan business logic dari UI components.

## Quick Start

```tsx
import { useDashboard } from '@/hooks/dashboard'

function DashboardPage() {
  const { user, bookings, stats, isLoading, error } = useDashboard()
  
  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} />
  
  return <DashboardContent user={user} bookings={bookings} stats={stats} />
}
```

## Available Hooks

### Core Hooks

- `useDashboard()` - Main hook combining all dashboard data
- `useDashboardAuth()` - Authentication and user management
- `useUserBookings({ userId, enabled })` - Bookings data
- `useUserStats({ userId, enabled })` - Statistics data

### Utility Hooks

- `useCurrencyFormatter({ locale, currency, minimumFractionDigits })` - Format currency
- `useDateFormatter({ locale, options })` - Format dates

## Examples

### Basic Usage
```tsx
const { user, bookings, stats, isLoading } = useDashboard()
```

### With Formatter
```tsx
const { stats } = useDashboard()
const { formatCurrency } = useCurrencyFormatter()

return <div>Total: {formatCurrency(stats.totalSpent)}</div>
```

### Conditional Fetching
```tsx
const { bookings } = useUserBookings({ 
  userId: user?.id,
  enabled: !!user // Only fetch when user exists
})
```

### Manual Refetch
```tsx
const { bookings, refetch } = useUserBookings({ userId })

return (
  <>
    <BookingsList bookings={bookings} />
    <Button onClick={refetch}>Refresh</Button>
  </>
)
```

## Documentation

For complete documentation, see:
- [DASHBOARD_HOOKS_DOCUMENTATION.md](../../../DASHBOARD_HOOKS_DOCUMENTATION.md) - Full hooks API reference
- [DASHBOARD_DOCUMENTATION.md](../../../DASHBOARD_DOCUMENTATION.md) - Complete dashboard docs

## API Integration

Hooks are ready for API integration. Replace mock data with actual API calls:

```typescript
// In useUserBookings.ts
import { api } from '@/lib/api'

const data = await api.get<Booking[]>(`/bookings/user/${userId}`)
setBookings(data)
```

## Type Safety

All hooks are fully typed with TypeScript. Types are defined in:
```
src/types/dashboard.ts
```

Import types:
```tsx
import type { UserData, Booking, Stats } from '@/types/dashboard'
```

