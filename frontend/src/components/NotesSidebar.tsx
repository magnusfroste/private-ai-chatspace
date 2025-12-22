import { useState, useEffect } from 'react'
import { api, Note } from '../lib/api'
import { 
  StickyNote, 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  X, 
  Sparkles,
  Loader2
} from 'lucide-react'

interface NotesSidebarProps {
  workspaceId: number
  isOpen: boolean
  onClose: () => void
}

export default function NotesSidebar({ workspaceId, isOpen, onClose }: NotesSidebarProps) {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editContent, setEditContent] = useState('')
  const [showTransform, setShowTransform] = useState<number | null>(null)
  const [transforming, setTransforming] = useState(false)

  useEffect(() => {
    if (isOpen) {
      loadNotes()
    }
  }, [workspaceId, isOpen])

  const loadNotes = async () => {
    try {
      const data = await api.notes.list(workspaceId)
      setNotes(data)
    } catch (err) {
      console.error('Failed to load notes:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async () => {
    try {
      const newNote = await api.notes.create({
        workspace_id: workspaceId,
        title: 'New Note',
        content: ''
      })
      setNotes([newNote, ...notes])
      setEditingId(newNote.id)
      setEditTitle(newNote.title)
      setEditContent(newNote.content)
    } catch (err) {
      console.error('Failed to create note:', err)
    }
  }

  const handleSave = async (id: number) => {
    try {
      const updated = await api.notes.update(id, {
        title: editTitle,
        content: editContent
      })
      setNotes(notes.map(n => n.id === id ? updated : n))
      setEditingId(null)
    } catch (err) {
      console.error('Failed to save note:', err)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this note?')) return
    try {
      await api.notes.delete(id)
      setNotes(notes.filter(n => n.id !== id))
    } catch (err) {
      console.error('Failed to delete note:', err)
    }
  }

  const handleTransform = async (id: number, action: 'expand' | 'improve' | 'summarize' | 'continue' | 'translate') => {
    setTransforming(true)
    try {
      const result = await api.notes.transform(id, action)
      setEditContent(result.transformed)
      setEditingId(id)
      const note = notes.find(n => n.id === id)
      if (note) {
        setEditTitle(note.title)
      }
      setShowTransform(null)
    } catch (err) {
      console.error('Failed to transform note:', err)
      alert('Transformation failed')
    } finally {
      setTransforming(false)
    }
  }

  const startEdit = (note: Note) => {
    setEditingId(note.id)
    setEditTitle(note.title)
    setEditContent(note.content)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditTitle('')
    setEditContent('')
  }

  if (!isOpen) return null

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-dark-800 border-l border-dark-700 flex flex-col z-50">
      {/* Header */}
      <div className="h-14 border-b border-dark-700 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <StickyNote className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-medium text-white">Notes</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCreate}
            className="p-2 text-dark-400 hover:text-white hover:bg-dark-700 rounded-lg"
            title="New Note"
          >
            <Plus className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="p-2 text-dark-400 hover:text-white hover:bg-dark-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-dark-400" />
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-12 text-dark-500">
            <StickyNote className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No notes yet</p>
            <p className="text-sm mt-1">Click + to create one</p>
          </div>
        ) : (
          notes.map(note => (
            <div key={note.id} className="bg-dark-900 rounded-lg p-3 border border-dark-700">
              {editingId === note.id ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-2 py-1 mb-2 bg-dark-800 border border-dark-600 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                    placeholder="Note title"
                  />
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={8}
                    className="w-full px-2 py-1 mb-2 bg-dark-800 border border-dark-600 rounded text-white text-sm focus:outline-none focus:border-blue-500 resize-y"
                    placeholder="Note content..."
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSave(note.id)}
                      className="flex-1 flex items-center justify-center gap-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
                    >
                      <Save className="w-3 h-3" />
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="flex-1 flex items-center justify-center gap-1 px-2 py-1 bg-dark-700 hover:bg-dark-600 text-white text-sm rounded"
                    >
                      <X className="w-3 h-3" />
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-white text-sm">{note.title}</h3>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setShowTransform(showTransform === note.id ? null : note.id)}
                        className="p-1 text-dark-400 hover:text-blue-400 hover:bg-dark-800 rounded"
                        title="AI Transform"
                      >
                        <Sparkles className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => startEdit(note)}
                        className="p-1 text-dark-400 hover:text-white hover:bg-dark-800 rounded"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(note.id)}
                        className="p-1 text-dark-400 hover:text-red-400 hover:bg-dark-800 rounded"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {showTransform === note.id && (
                    <div className="mb-2 p-2 bg-dark-800 rounded border border-dark-600">
                      <p className="text-xs text-dark-400 mb-2">Transform with AI:</p>
                      <div className="space-y-1">
                        {(['expand', 'improve', 'summarize', 'continue', 'translate'] as const).map(action => (
                          <button
                            key={action}
                            onClick={() => handleTransform(note.id, action)}
                            disabled={transforming}
                            className="w-full text-left px-2 py-1 text-xs text-white hover:bg-dark-700 rounded disabled:opacity-50 capitalize"
                          >
                            {transforming ? <Loader2 className="w-3 h-3 inline animate-spin mr-1" /> : null}
                            {action}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <p className="text-sm text-dark-300 whitespace-pre-wrap line-clamp-6">{note.content}</p>
                  <p className="text-xs text-dark-500 mt-2">
                    {new Date(note.updated_at).toLocaleDateString()}
                  </p>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
