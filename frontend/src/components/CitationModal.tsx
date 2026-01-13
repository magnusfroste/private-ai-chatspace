import { X, FileText, Info } from 'lucide-react'

interface Chunk {
  text: string
  score: number
}

interface Source {
  num: number
  filename?: string
  title?: string
  url?: string
  type: 'rag' | 'web'
  chunks?: Chunk[]
}

interface CitationModalProps {
  isOpen: boolean
  onClose: () => void
  source: Source
}

function toPercentString(score: number): string {
  return `${Math.round(score * 100)}%`
}

export default function CitationModal({ isOpen, onClose, source }: CitationModalProps) {
  if (!isOpen) return null

  const chunks = source.chunks || []
  const references = chunks.length

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-dark-800 rounded-lg shadow-xl border border-dark-600 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 border-b border-dark-600">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-green-400 flex-shrink-0" />
            <h3 className="text-xl font-semibold text-white truncate pr-8">
              {source.filename || source.title}
            </h3>
          </div>
          {references > 1 && (
            <p className="text-xs text-dark-400 mt-2 ml-9">
              Referenced {references} times
            </p>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-dark-400 hover:text-white hover:bg-dark-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chunks */}
        <div 
          className="overflow-y-auto"
          style={{ maxHeight: 'calc(100vh - 250px)' }}
        >
          <div className="py-6 px-8 space-y-4">
            {chunks.length > 0 ? (
              chunks.map((chunk, idx) => (
                <div key={idx}>
                  <div className="pt-4 text-white">
                    <div className="flex flex-col w-full justify-start pb-4 gap-y-2">
                      <p className="text-dark-200 whitespace-pre-line leading-relaxed text-sm">
                        {chunk.text}
                      </p>
                      
                      {chunk.score > 0 && (
                        <div className="flex items-center text-xs text-dark-500 gap-x-2">
                          <div className="flex items-center gap-x-1" title="Semantic similarity score compared to your query">
                            <Info className="w-3.5 h-3.5" />
                            <span>{toPercentString(chunk.score)} match</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {idx !== chunks.length - 1 && (
                    <hr className="border-dark-600" />
                  )}
                </div>
              ))
            ) : (
              <p className="text-dark-400 text-center py-8">
                No chunk content available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
