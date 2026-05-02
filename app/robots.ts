// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', // Permite tuturor roboților (inclusiv Facebook/Instagram)
      allow: '/',     // Permite accesul la toate paginile site-ului
    },
    sitemap: 'https://harborcafe.vercel.app/sitemap.xml',
  }
}