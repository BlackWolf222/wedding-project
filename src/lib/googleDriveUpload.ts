const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL as string | undefined

export type UploadResult = {
  name: string
  success: boolean
  error?: string
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      const base64 = result.split(',')[1]
      if (!base64) {
        reject(new Error('Nem sikerült beolvasni a fájlt.'))
        return
      }
      resolve(base64)
    }
    reader.onerror = () => reject(new Error('Fájl olvasási hiba.'))
    reader.readAsDataURL(file)
  })
}

async function uploadViaScript(file: File): Promise<UploadResult> {
  if (!SCRIPT_URL) {
    return {
      name: file.name,
      success: false,
      error: 'A feltöltés még nincs beállítva. Add meg a VITE_GOOGLE_SCRIPT_URL értéket.',
    }
  }

  try {
    const base64 = await fileToBase64(file)
    // text/plain elkerüli a CORS preflightet az Apps Script felé
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        fileName: file.name,
        mimeType: file.type || 'application/octet-stream',
        data: base64,
      }),
    })

    const text = await response.text()
    let payload: { success?: boolean; error?: string } = {}
    try {
      payload = JSON.parse(text) as { success?: boolean; error?: string }
    } catch {
      // redirect / HTML válasz esetén is sikeresnek tekintjük, ha a status ok
      if (response.ok) {
        return { name: file.name, success: true }
      }
    }

    if (!response.ok || payload.success === false) {
      return {
        name: file.name,
        success: false,
        error: payload.error ?? 'Feltöltési hiba történt.',
      }
    }

    return { name: file.name, success: true }
  } catch {
    return {
      name: file.name,
      success: false,
      error: 'Hálózati hiba — próbáld újra később.',
    }
  }
}

/** Demo mode: simulates upload when no script URL is configured (UI preview). */
async function uploadDemo(file: File): Promise<UploadResult> {
  await new Promise((r) => setTimeout(r, 800 + Math.random() * 700))
  return { name: file.name, success: true }
}

export function isUploadConfigured(): boolean {
  return Boolean(SCRIPT_URL?.trim())
}

export async function uploadFilesToDrive(
  files: File[],
  onProgress?: (done: number, total: number) => void,
): Promise<UploadResult[]> {
  const results: UploadResult[] = []
  const uploader = isUploadConfigured() ? uploadViaScript : uploadDemo

  for (let i = 0; i < files.length; i++) {
    const result = await uploader(files[i])
    results.push(result)
    onProgress?.(i + 1, files.length)
  }

  return results
}
