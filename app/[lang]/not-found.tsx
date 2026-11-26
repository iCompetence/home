import { NotFoundLavender } from '@/components/lavender/SimpleHeroLavender'

// notFound() inside /<lang>/…: the same page as /<lang>/404/.
// LanguageProvider comes from ./layout.tsx.
export default function NotFound() {
  return <NotFoundLavender />
}
