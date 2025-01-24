import { Injectable } from "@nestjs/common";
import { join } from "path";


@Injectable()
export class FileUploadService {




    getFilePath(fileName: string): string {
        return join(process.cwd(), 'uploads', fileName);
    }

    getPublicFilePath(filename: string): string {
        return `/uploads/${filename}`;
    }
}