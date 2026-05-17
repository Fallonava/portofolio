import { NextResponse } from 'next/server';

/**
 * Debug endpoint — HAPUS setelah login berhasil!
 * GET /api/auth-debug → cek env vars terbaca dengan benar
 */
export async function GET() {
  return NextResponse.json({
    NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? '❌ NOT SET',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? '✅ SET' : '❌ NOT SET',
    ADMIN_USERNAME: process.env.ADMIN_USERNAME ? '✅ SET' : '❌ NOT SET',
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ? '✅ SET' : '❌ NOT SET',
    NODE_ENV: process.env.NODE_ENV,
  });
}
