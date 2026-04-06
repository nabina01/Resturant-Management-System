import { useEffect, useState } from 'react'
import { DashboardLayout } from '@/components/DashboardLayout'
import { addressService } from '@/api/services/addressService'
import { Address } from '@/types/api'
import { AddressForm } from '@/components/address/AddressForm'
import { AddressList } from '@/components/address/AddressList'
import { toast } from 'sonner'
import { Plus } from 'lucide-react'

export const Addresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const loadAddresses = async () => {
    setIsLoading(true)
    try {
      const data = await addressService.getAddresses()
      setAddresses(data)
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to load addresses'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadAddresses()
  }, [])

  const handleAddressAdded = async () => {
    setShowForm(false)
    setEditingId(null)
    await loadAddresses()
    toast.success('Address saved successfully')
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        await addressService.deleteAddress(id)
        setAddresses(addresses.filter((a) => a.id !== id))
        toast.success('Address deleted successfully')
      } catch (error: any) {
        const message = error.response?.data?.message || 'Failed to delete address'
        toast.error(message)
      }
    }
  }

  const handleSetDefault = async (id: string) => {
    try {
      await addressService.setDefaultAddress(id)
      setAddresses(
        addresses.map((a) => ({
          ...a,
          is_default: a.id === id,
        }))
      )
      toast.success('Default address updated')
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to set default address'
      toast.error(message)
    }
  }

  const editingAddress = editingId ? addresses.find((a) => a.id === editingId) : null

  return (
    <DashboardLayout title="Manage Addresses">
      <div className="space-y-6">
        {/* Add Address Button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add New Address
          </button>
        )}

        {/* Add/Edit Form */}
        {showForm && (
          <AddressForm
            address={editingAddress || undefined}
            onSuccess={handleAddressAdded}
            onCancel={() => {
              setShowForm(false)
              setEditingId(null)
            }}
          />
        )}

        {/* Addresses List */}
        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : addresses.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-muted-foreground">No addresses yet. Add your first address.</p>
          </div>
        ) : (
          <AddressList
            addresses={addresses}
            onEdit={(id) => {
              setEditingId(id)
              setShowForm(true)
            }}
            onDelete={handleDelete}
            onSetDefault={handleSetDefault}
          />
        )}
      </div>
    </DashboardLayout>
  )
}
