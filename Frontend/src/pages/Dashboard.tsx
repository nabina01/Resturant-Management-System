import { DashboardLayout } from '@/components/DashboardLayout'
import { useAuth } from '@/hooks/useAuth'
import { formatDateTime } from '@/lib/utils'

const getDisplayName = (
  firstName?: string | null,
  lastName?: string | null,
  email?: string,
) => {
  const fullName = [firstName, lastName].filter(Boolean).join(' ').trim()
  return fullName || email?.split('@')[0] || 'User'
}

export const Dashboard = () => {
  const { user } = useAuth()
  const displayName = getDisplayName(user?.firstName, user?.lastName, user?.email)

  return (
    <DashboardLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Welcome Card */}
        <div className="md:col-span-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Welcome, {displayName}!</h2>
          <p className="opacity-90">Manage your restaurant account and settings from one place</p>
        </div>

        {/* Profile Summary */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Profile</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-muted-foreground">Name</p>
              <p className="font-medium text-foreground">{displayName}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Email</p>
              <p className="font-medium text-foreground break-all">{user?.email}</p>
            </div>
            {user?.phone && (
              <div>
                <p className="text-muted-foreground">Phone</p>
                <p className="font-medium text-foreground">{user.phone}</p>
              </div>
            )}
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Account Info</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-muted-foreground">Member Since</p>
              <p className="font-medium text-foreground">
                {user?.createdAt ? formatDateTime(user.createdAt).split(',')[0] : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Last Updated</p>
              <p className="font-medium text-foreground">
                {user?.updatedAt ? formatDateTime(user.updatedAt) : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <a
              href="/profile"
              className="block px-4 py-2 rounded-md bg-primary text-primary-foreground text-center font-medium hover:bg-blue-600 transition-colors text-sm"
            >
              Edit Profile
            </a>
            <a
              href="/menu"
              className="block px-4 py-2 rounded-md bg-secondary text-secondary-foreground text-center font-medium hover:bg-gray-300 transition-colors text-sm"
            >
              View Menu
            </a>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
