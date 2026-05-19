import { NextResponse } from 'next/server'

import procedures from '@/mock/procedimentos.json'

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1200))

  return NextResponse.json(procedures)
}
