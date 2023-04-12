import { NextResponse } from 'next/server';

export async function POST(request,response) {
    const res = await request.json();
    console.log('judgeBrowserEnv',res);

    // TODO: 根据浏览器环境判断是否有风险

    if(Math.random() > 0.5) {
        return NextResponse.json({
            message:'pass',
            code:403
        });
    } else {
        return NextResponse.json({
            message:'remain verify',
            code:403
        });
    }
}