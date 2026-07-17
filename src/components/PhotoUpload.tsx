import { useCallback, useRef, useState, type DragEvent, type KeyboardEvent } from 'react'
import {
  isUploadConfigured,
  uploadFilesToDrive,
  type UploadResult,
} from '../lib/googleDriveUpload'

type FileStatus = {
  file: File
  preview: string
  status: 'pending' | 'uploading' | 'done' | 'error'
  error?: string
}

const ACCEPTED = 'image/jpeg,image/png,image/webp,image/heic,image/heif'
const MAX_FILES = 20

export function PhotoUpload() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [items, setItems] = useState<FileStatus[]>([])
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState({ done: 0, total: 0 })
  const [summary, setSummary] = useState<string | null>(null)
  const configured = isUploadConfigured()

  const addFiles = useCallback((list: FileList | File[]) => {
    const incoming = Array.from(list).filter((f) => f.type.startsWith('image/'))
    if (!incoming.length) return

    setSummary(null)
    setItems((prev) => {
      const room = MAX_FILES - prev.length
      const next = incoming.slice(0, room).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        status: 'pending' as const,
      }))
      return [...prev, ...next]
    })
  }, [])

  const removeItem = (index: number) => {
    setItems((prev) => {
      const copy = [...prev]
      URL.revokeObjectURL(copy[index].preview)
      copy.splice(index, 1)
      return copy
    })
  }

  const onDrop = (e: DragEvent) => {
    e.preventDefault()
    setDragging(false)
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files)
  }

  const handleUpload = async () => {
    const pending = items.filter((i) => i.status === 'pending' || i.status === 'error')
    if (!pending.length || uploading) return

    setUploading(true)
    setSummary(null)
    setProgress({ done: 0, total: pending.length })

    setItems((prev) =>
      prev.map((item) =>
        pending.some((p) => p.file === item.file)
          ? { ...item, status: 'uploading', error: undefined }
          : item,
      ),
    )

    const results: UploadResult[] = await uploadFilesToDrive(
      pending.map((p) => p.file),
      (done, total) => setProgress({ done, total }),
    )

    setItems((prev) =>
      prev.map((item) => {
        const result = results.find((r) => r.name === item.file.name)
        if (!result) return item
        return result.success
          ? { ...item, status: 'done' }
          : { ...item, status: 'error', error: result.error }
      }),
    )

    const ok = results.filter((r) => r.success).length
    const fail = results.length - ok
    if (fail === 0) {
      setSummary(
        configured
          ? `${ok} kép sikeresen feltöltve a közös Drive mappába. Köszönjük!`
          : `${ok} kép előnézeti módban „feltöltve”. A valódi Drive feltöltéshez állítsd be a Google Apps Script URL-t.`,
      )
    } else {
      setSummary(`${ok} sikerült, ${fail} nem. Próbáld újra a hibásakat.`)
    }

    setUploading(false)
  }

  return (
    <div className="upload">
      <div className="upload__header">
        <p className="upload__label">Vendégfotók</p>
        <h3>Oszd meg velünk a pillanatokat</h3>
        <p className="upload__intro">
          Töltsd fel a nap során készült képeidet — egy közös Google Drive mappába kerülnek, ahol
          mi is örömmel nézzük őket.
        </p>
      </div>

      <div
        className={`upload__dropzone ${dragging ? 'upload__dropzone--active' : ''}`}
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e: KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            inputRef.current?.click()
          }
        }}
      >
        <span className="upload__icon" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none">
            <path
              d="M24 32V12M24 12l-7 7M24 12l7 7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 34v2a4 4 0 004 4h20a4 4 0 004-4v-2"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <p className="upload__drop-title">Húzd ide a képeket, vagy kattints a tallózáshoz</p>
        <p className="upload__drop-hint">JPG, PNG, WEBP · max. {MAX_FILES} kép egyszerre</p>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED}
          multiple
          hidden
          onChange={(e) => {
            if (e.target.files) addFiles(e.target.files)
            e.target.value = ''
          }}
        />
      </div>

      {items.length > 0 && (
        <ul className="upload__previews">
          {items.map((item, index) => (
            <li key={item.preview} className={`upload__preview upload__preview--${item.status}`}>
              <img src={item.preview} alt={item.file.name} />
              <div className="upload__preview-meta">
                <span className="upload__preview-name">{item.file.name}</span>
                <span className="upload__preview-status">
                  {item.status === 'pending' && 'Várakozik'}
                  {item.status === 'uploading' && 'Feltöltés…'}
                  {item.status === 'done' && 'Kész'}
                  {item.status === 'error' && (item.error ?? 'Hiba')}
                </span>
              </div>
              {item.status !== 'uploading' && (
                <button
                  type="button"
                  className="upload__remove"
                  aria-label="Eltávolítás"
                  onClick={() => removeItem(index)}
                >
                  ×
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {uploading && (
        <div className="upload__progress" role="status">
          <div
            className="upload__progress-bar"
            style={{ width: `${(progress.done / Math.max(progress.total, 1)) * 100}%` }}
          />
          <span>
            Feltöltés {progress.done}/{progress.total}
          </span>
        </div>
      )}

      {summary && <p className="upload__summary">{summary}</p>}

      <div className="upload__actions">
        <button
          type="button"
          className="upload__btn"
          disabled={!items.some((i) => i.status === 'pending' || i.status === 'error') || uploading}
          onClick={handleUpload}
        >
          {uploading ? 'Feltöltés folyamatban…' : 'Képek feltöltése'}
        </button>
        {!configured && (
          <p className="upload__config-hint">
            Előnézeti mód — a Drive csatlakozáshoz lásd a README-t.
          </p>
        )}
      </div>
    </div>
  )
}
