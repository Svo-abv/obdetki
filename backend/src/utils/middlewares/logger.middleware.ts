import * as fs from 'fs';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export function LoggerMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log(req.headers);
    req.on('data', function (chunk) {
        fs.writeFileSync("hello.txt", chunk, { flag: "a+", });
    });
    next();
}