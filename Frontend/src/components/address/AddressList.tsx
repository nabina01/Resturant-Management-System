import { Address } from '@/types/api'
import { Trash2, Edit, Check } from 'lucide-react'

interface AddressListProps {
  addresses: Address[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onSetDefault: (id: string) => void
}

export const AddressList = ({
  addresses,
  onEdit,
  onDelete,
  onSetDefault,
}: AddressListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {addresses.map((address) => (
        <div
          key={address.id}
          className={`rounded-lg border-2 p-6 transition-all ${
            address.is_default
              ? 'border-primary bg-blue-50'
              : 'border-border bg-white hover:border-primary'
          }`}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{address.name}</h3>
              {address.is_default && (
                <div className="inline-flex items-center gap-1 mt-1 px-2 py-1 rounded bg-primary text-primary-foreground text-xs font-medium">
                  <Check className="w-3 h-3" />
                  Default
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1 mb-4 text-sm text-muted-foreground">
            <p>{address.address_line}</p>
            <p>
              {address.city}, {address.state} {address.postal_code}
            </p>
            <p>{address.country}</p>
          </div>

          <div className="flex gap-2 pt-4 border-t border-border">
            {!address.is_default && (
              <button
                onClick={() => onSetDefault(address.id)}
                className="flex-1 px-3 py-2 rounded-md text-sm font-medium text-primary border border-primary hover:bg-blue-50 transition-colors"
              >
                Set Default
              </button>
            )}
            <button
              onClick={() => onEdit(address.id)}
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-foreground border border-border hover:bg-secondary transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={() => onDelete(address.id)}
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-red-600 border border-red-200 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
