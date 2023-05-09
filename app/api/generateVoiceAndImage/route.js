import { NextResponse } from 'next/server';
const exec = require('child_process').exec;

const VOICE_DIR_PREFIX = 'generateVoiceAndImage/output/voice_output'
const IMG_DIR_PREFIX = 'generateVoiceAndImage/output/char_blur'

const execCmd = async (filename) => {
    try {
        exec('python generateVoiceAndImage/demo.py '+filename,(err,stdout,stderr) => {
            console.log('stdout: ',stdout)
        })
    } catch (err) {
        console.log('execCmd error',err)
    }
}

export async function POST(request,response) {
    const req =  await request.json();

    try {
        execCmd(req.filename);
        const GENERATE_SUCCESS = NextResponse.json({
            message:'generate success',
            code:200,
            res:{
                img:IMG_DIR_PREFIX + '/' + req.filename + '.png',
                wav:VOICE_DIR_PREFIX + '/' + req.filename + '.png'
            }
        });
        GENERATE_SUCCESS
        return GENERATE_SUCCESS;
    } catch (err) {
        const GENERATE_FAIL = NextResponse.json({
            message:'generate fail',
            code:403,
            res:{}
        });
    
        console.log('call execCmd fail',err);

        return GENERATE_FAIL;
    }
}