import { apiClient } from '@/apis/axios'

const mediaRequests = {
  presignUrls: async (payload: {
    info: { type: string }
    files: { filename: string; filetype: string; filesize: number }[]
  }): Promise<{
    data: { uploadUrl: string; fileUrl: string; fileName: string }[]
  }> => {
    const response = await apiClient.post('/upload/presigned-url', payload)
    return response.data
  },
  uploadToPresignedUrl: async (
    file: File,
    presignedUrl: string,
    onProgress?: (percent: number) => void
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('PUT', presignedUrl, true)
      xhr.setRequestHeader('Content-Type', file.type)

      if (onProgress) {
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentComplete = Math.round(
              (event.loaded / event.total) * 100
            )
            onProgress(percentComplete)
          }
        }
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve()
        } else {
          reject(new Error('Failed to upload file'))
        }
      }

      xhr.onerror = () => reject(new Error('Network error during upload'))

      xhr.send(file)
    })
  },
  uploadFiles: async (files: File[], type: string): Promise<string[]> => {
    const formData = new FormData()
    formData.append('type', type)
    files.forEach((file) => formData.append('files', file))

    const { data } = await apiClient.post('/upload', formData)
    return data?.data?.map((d: any) => d.url) || []
  },
  deleteFile: async (url: string): Promise<void> => {
    await apiClient.delete('/upload', { url })
  }
}

export default mediaRequests
