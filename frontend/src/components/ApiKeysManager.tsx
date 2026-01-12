import { useState, useEffect } from 'react'
import { useAuthStore } from '../store/auth'
import {
  Key,
  Plus,
  Trash2,
  Loader2,
  Copy,
  Check,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react'

interface ApiKey {
  id: number
  name: string
  key_prefix: string
  created_at: string
  last_used_at?: string
  is_active: boolean
}

export default function ApiKeysManager() {
  const [keys, setKeys] = useState<ApiKey[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [showNewKey, setShowNewKey] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    loadKeys()
  }, [])

  const loadKeys = async () => {
    setLoading(true)
    try {
      const token = useAuthStore.getState().token
      const response = await fetch('/api/admin/api-keys', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.ok) {
        const data = await response.json()
        setKeys(data)
      }
    } catch (err) {
      console.error('Failed to load API keys:', err)
    } finally {
      setLoading(false)
    }
  }

  const createKey = async () => {
    if (!newKeyName.trim()) {
      alert('Please enter a name for the API key')
      return
    }

    setCreating(true)
    try {
      const token = useAuthStore.getState().token
      const response = await fetch('/api/admin/api-keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name: newKeyName })
      })

      if (response.ok) {
        const data = await response.json()
        setShowNewKey(data.key)
        setNewKeyName('')
        await loadKeys()
      } else {
        const error = await response.json()
        alert(`Error: ${error.detail || 'Failed to create API key'}`)
      }
    } catch (err) {
      console.error('Failed to create API key:', err)
      alert('Failed to create API key')
    } finally {
      setCreating(false)
    }
  }

  const deleteKey = async (keyId: number) => {
    if (!confirm('Delete this API key? This cannot be undone.')) return

    try {
      const token = useAuthStore.getState().token
      await fetch(`/api/admin/api-keys/${keyId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      await loadKeys()
    } catch (err) {
      console.error('Failed to delete API key:', err)
    }
  }

  const toggleKey = async (keyId: number) => {
    try {
      const token = useAuthStore.getState().token
      await fetch(`/api/admin/api-keys/${keyId}/toggle`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      })
      await loadKeys()
    } catch (err) {
      console.error('Failed to toggle API key:', err)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-dark-400" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium text-white">API Keys</h2>
          <p className="text-sm text-dark-400">
            Create API keys for programmatic access to Private AI
          </p>
        </div>
      </div>

      {/* New Key Alert */}
      {showNewKey && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Key className="w-5 h-5 text-green-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-green-400">API Key Created!</p>
              <p className="text-xs text-dark-400 mt-1">
                Copy this key now. You won't be able to see it again.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <code className="flex-1 bg-dark-800 px-3 py-2 rounded text-sm text-white font-mono">
                  {showNewKey}
                </code>
                <button
                  onClick={() => copyToClipboard(showNewKey)}
                  className="p-2 bg-dark-700 hover:bg-dark-600 rounded-lg"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-dark-300" />
                  )}
                </button>
              </div>
              <button
                onClick={() => setShowNewKey(null)}
                className="mt-3 text-xs text-dark-400 hover:text-white"
              >
                I've copied the key, dismiss this
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create New Key */}
      <div className="bg-dark-800 rounded-xl p-4">
        <h3 className="text-sm font-medium text-white mb-3">Create New API Key</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            placeholder="Key name (e.g., 'Production', 'Testing')"
            className="flex-1 bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white text-sm"
          />
          <button
            onClick={createKey}
            disabled={creating || !newKeyName.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-dark-600 text-white rounded-lg text-sm font-medium"
          >
            {creating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            Create Key
          </button>
        </div>
      </div>

      {/* Existing Keys */}
      <div className="bg-dark-800 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-dark-700">
          <h3 className="text-sm font-medium text-white">Your API Keys</h3>
        </div>
        
        {keys.length === 0 ? (
          <div className="px-4 py-8 text-center text-dark-400 text-sm">
            No API keys yet. Create one above.
          </div>
        ) : (
          <div className="divide-y divide-dark-700">
            {keys.map((key) => (
              <div key={key.id} className="px-4 py-3 flex items-center gap-4">
                <Key className={`w-5 h-5 ${key.is_active ? 'text-green-400' : 'text-dark-500'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{key.name}</span>
                    {!key.is_active && (
                      <span className="text-xs px-2 py-0.5 bg-red-500/20 text-red-400 rounded">
                        Disabled
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-dark-400 mt-0.5">
                    <code>{key.key_prefix}...</code>
                    <span className="mx-2">•</span>
                    Created {new Date(key.created_at).toLocaleDateString()}
                    {key.last_used_at && (
                      <>
                        <span className="mx-2">•</span>
                        Last used {new Date(key.last_used_at).toLocaleDateString()}
                      </>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => toggleKey(key.id)}
                  className="p-2 hover:bg-dark-700 rounded-lg"
                  title={key.is_active ? 'Disable key' : 'Enable key'}
                >
                  {key.is_active ? (
                    <ToggleRight className="w-5 h-5 text-green-400" />
                  ) : (
                    <ToggleLeft className="w-5 h-5 text-dark-500" />
                  )}
                </button>
                <button
                  onClick={() => deleteKey(key.id)}
                  className="p-2 hover:bg-dark-700 rounded-lg text-dark-400 hover:text-red-400"
                  title="Delete key"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Usage Info */}
      <div className="bg-dark-800/50 rounded-xl p-4">
        <h3 className="text-sm font-medium text-white mb-2">How to use API Keys</h3>
        <p className="text-xs text-dark-400 mb-3">
          Use your API key in the Authorization header:
        </p>
        <code className="block bg-dark-900 px-3 py-2 rounded text-xs text-dark-300 font-mono">
          Authorization: Bearer pk_your_api_key_here
        </code>
        <p className="text-xs text-dark-400 mt-3">
          API keys can be used with the <code className="text-dark-300">/api/v1/workspace/{'{id}'}/query</code> endpoint.
        </p>
      </div>
    </div>
  )
}
