import { NextResponse } from 'next/server';
const fs = require('fs');

const globalHash = {};

export async function GET(request,response) {
  return NextResponse.json({
    message:'receive get'
  });
}

export async function POST(request,response) {
  const res = await request.json();
  const currTimeStamp = new Date().getTime();

  // 写入app/api/verify/verify.log
  const log = `user ${res.fingerprint} request at ${currTimeStamp}\n`;
  if(!fs.existsSync('app/api/verify/verify.log')) {
    fs.writeFileSync('app/api/verify/verify.log',log);
  } else {
    fs.appendFileSync('app/api/verify/verify.log',log);
  }

  if(!globalHash[res.fingerprint]) {
    globalHash[res.fingerprint] = currTimeStamp;
  } else {
    if(currTimeStamp - globalHash[res.fingerprint] < 1000) {
      // 当来自同一个用户的请求过于频繁时
      return NextResponse.json({
        message:'too fast',
        state:403
      });
    } else {
      globalHash[res.fingerprint] = currTimeStamp; // reset request timestamp
    }
  }

  return NextResponse.json({
    message:'pass',
    state:200
  });
}
