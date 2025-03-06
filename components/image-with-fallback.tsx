"use client"

import type React from "react"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"
import { getGoogleDriveImageUrl } from "@/lib/utils"

interface ImageWithFallbackProps extends Omit<ImageProps, "src" | "onError"> {
  src: string
  fallbackSrc?: string
  onError?: (error: Error) => void
}

export function ImageWithFallback({
  src,
  fallbackSrc = "/placeholder.svg",
  alt,
  onError,
  ...rest
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState<string>(() => {
    // Process Google Drive URLs on initial render
    if (src && typeof src === "string" && src.includes("drive.google.com")) {
      return getGoogleDriveImageUrl(src)
    }
    return src || fallbackSrc
  })

  const handleError = (error: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.warn(`Image load error for ${src}:`, error)
    setImgSrc(fallbackSrc)

    if (onError) {
      onError(new Error(`Failed to load image: ${src}`))
    }
  }

  return <Image {...rest} src={imgSrc || "/placeholder.svg"} alt={alt || ""} onError={handleError} />
}

