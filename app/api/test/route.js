import { NextResponse } from 'next/server';

const globalHash = {};

export async function GET(request,response) {
  return NextResponse.json({
    message:'receive get'
  });
}

export async function POST(request,response) {
  const res = await request.json();
  console.log(res);

  return NextResponse.json({
    message:'receive post'
  });
}
