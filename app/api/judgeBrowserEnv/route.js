import { NextResponse } from 'next/server';
import UAParser from 'ua-parser-js';

const getUserAgent = (request) => {
    const parser = new UAParser();
    const userAgent = request.headers.get('user-agent');
    console.log(userAgent)
    const result = parser.setUA(userAgent).getResult();

    return result;
}

export async function POST(request,response) {
    const res = await request.json();
    console.log('judgeBrowserEnv',res);

    console.log('userAgent',getUserAgent(request));

    // TODO: 根据浏览器环境判断是否有风险

    if(Math.random() > 0.5) {
        return NextResponse.json({
            message:'browser environment captcha pass',
            code:403
        });
    } else {
        return NextResponse.json({
            message:'browser environment captcha remain verify',
            code:403
        });
    }
}