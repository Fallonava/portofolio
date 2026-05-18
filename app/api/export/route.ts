import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { client } from '@/sanity/lib/client';

function escapeCsv(value: unknown): string {
  const str = value == null ? '' : String(value);
  return `"${str.replace(/"/g, '""')}"`;
}

export async function GET(req: NextRequest) {
  // Auth check
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const type = req.nextUrl.searchParams.get('type') ?? 'projects';

  try {
    let csv = '';

    if (type === 'projects') {
      const projects = await client.fetch(`*[_type == "project"] | order(order asc) {
        title, category, status, progress, paymentStatus, budget,
        clientName, deadline, isPublic, link, tech, description
      }`);

      const headers = ['Title', 'Category', 'Status', 'Progress (%)', 'Payment', 'Budget ($)', 'Client', 'Deadline', 'Public', 'Link', 'Tech Stack', 'Description'];
      const rows = projects.map((p: any) => [
        p.title, p.category, p.status ?? 'Planning',
        p.progress ?? 0, p.paymentStatus ?? 'Unpaid',
        p.budget ?? '', p.clientName ?? '', p.deadline ?? '',
        p.isPublic ? 'Yes' : 'No', p.link ?? '',
        Array.isArray(p.tech) ? p.tech.join(', ') : '',
        p.description ?? '',
      ]);
      csv = [headers, ...rows].map(r => r.map(escapeCsv).join(',')).join('\n');
    }

    if (type === 'experience') {
      const items = await client.fetch(`*[_type == "experience"] | order(order asc) {
        title, company, year, description, tech
      }`);
      const headers = ['Title', 'Company', 'Duration', 'Description', 'Tech Stack'];
      const rows = items.map((e: any) => [e.title, e.company, e.year, e.description, Array.isArray(e.tech) ? e.tech.join(', ') : '']);
      csv = [headers, ...rows].map(r => r.map(escapeCsv).join(',')).join('\n');
    }

    const filename = `${type}-${new Date().toISOString().split('T')[0]}.csv`;

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
