'use client'

import { useRef } from "react"
import { documents } from "../content/documents"
import { documentAction } from "../content/site"
import { Button, type ButtonProps } from "./primitives/Button"
import { GlassSurface } from "./primitives/GlassSurface"

type DocumentChooserProps = Pick<ButtonProps, "variant" | "size" | "className">

function formatSize(sizeBytes?: number) {
  if (!sizeBytes) return null
  const size = sizeBytes / 1024 / 1024
  return `${size < 1 ? Math.max(1, Math.round(sizeBytes / 1024)) + " KB" : size.toFixed(1) + " MB"}`
}

export default function DocumentChooser({
  variant = "glass",
  size,
  className,
}: DocumentChooserProps) {
  const dialog = useRef<HTMLDialogElement>(null)

  function openDialog() {
    dialog.current?.showModal()
  }

  function closeDialog() {
    dialog.current?.close()
  }

  return (
    <>
      <Button type="button" variant={variant} size={size} className={className} onClick={openDialog}>
        {documentAction.label}
      </Button>

      <dialog
        ref={dialog}
        className="document-dialog"
        aria-labelledby="document-dialog-title"
        onCancel={(event) => {
          event.preventDefault()
          closeDialog()
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault()
            closeDialog()
          }
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog()
        }}
      >
        <div className="document-dialog__surface">
          <div className="mb-6 flex items-start justify-between gap-6">
            <div>
              <p className="eyebrow">Documents</p>
              <h2 id="document-dialog-title" className="display-lg">Choose a document</h2>
            </div>
            <Button
              type="button"
              variant="icon"
              size="icon"
              aria-label="Close document choices"
              onClick={closeDialog}
            >
              <svg viewBox="0 0 20 20" width="16" height="16" fill="none" aria-hidden="true">
                <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {documents.map((document) => {
              const size = formatSize(document.sizeBytes)
              const published = document.status === "approved" && Boolean(document.href)

              return (
                <GlassSurface key={document.id} variant="standard" className="document-option">
                  <div className="document-option__meta">
                    <span>{document.format}</span>
                    {size && <span>{size}</span>}
                    <span>{published ? "Available" : "Not published"}</span>
                  </div>
                  <h3>{document.title}</h3>
                  <p>{document.description}</p>
                  {published ? (
                    <a href={document.href!} download className="document-option__action">
                      Download {document.title}
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <p className="document-option__status" role="status">
                      This document is not available yet.
                    </p>
                  )}
                </GlassSurface>
              )
            })}
          </div>
        </div>
      </dialog>
    </>
  )
}
