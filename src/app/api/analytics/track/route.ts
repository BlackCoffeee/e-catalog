/**
 * @author Muhammad Arif Budiman - [https://github.com/BlackCoffeee]
 * @createAt 2026-10-24
 */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventType, targetPath, faculty, prodiSlug } = body;

    if (!eventType || !targetPath) {
      return NextResponse.json(
        { error: 'eventType dan targetPath wajib diisi' },
        { status: 400 }
      );
    }

    const userAgent = req.headers.get('user-agent') || undefined;

    const event = await prisma.analyticsEvent.create({
      data: {
        eventType,
        targetPath,
        faculty: faculty || undefined,
        prodiSlug: prodiSlug || undefined,
        userAgent,
      },
    });

    return NextResponse.json({ success: true, eventId: event.id });
  } catch (error) {
    console.error('Gagal mencatat event analitik:', error);
    return NextResponse.json(
      { error: 'Gagal mencatat data analitik' },
      { status: 500 }
    );
  }
}
