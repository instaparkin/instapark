"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { X } from 'lucide-react'
import Image from "next/image"
import { Button } from "./button"

interface FileUploadProps {
  value: { url: string }[]
  onChange: (value: { url: string }[]) => void
  maxFiles?: number
  minFiles?: number
  accept?: string
}

export function FileUpload({
  value,
  onChange,
  maxFiles = 8,
  minFiles = 4,
  accept = "image/*",
}: FileUploadProps) {
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null)
      
      if (value.length + acceptedFiles.length > maxFiles) {
        setError(`Maximum ${maxFiles} files allowed`)
        return
      }

      // In a real implementation, you would upload these files to your storage
      // and get back URLs. This is just a mock implementation.
      const newFiles = acceptedFiles.map((file) => ({
        url: URL.createObjectURL(file),
      }))

      onChange([...value, ...newFiles])
    },
    [maxFiles, onChange, value]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept ? { [accept]: [] } : undefined,
    maxFiles: maxFiles - value.length,
  })

  const removeFile = (index: number) => {
    const newFiles = [...value]
    newFiles.splice(index, 1)
    onChange(newFiles)
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${
          isDragActive ? "border-primary" : "border-muted"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          <p>Drag & drop files here, or click to select files</p>
        )}
      </div>
      {error && <p className="text-destructive text-sm">{error}</p>}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {value.map((file, index) => (
          <div key={index} className="relative aspect-square">
            <Image
              src={file.url}
              alt={`Upload ${index + 1}`}
              fill
              className="object-cover rounded-lg"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-1 right-1"
              onClick={() => removeFile(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      {value.length < minFiles && (
        <p className="text-muted-foreground text-sm">
          Please upload at least {minFiles} files
        </p>
      )}
    </div>
  )
}

