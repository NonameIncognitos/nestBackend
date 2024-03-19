import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path'
import * as fs from 'fs'
import * as uuid from 'uuid';
@Injectable()
export class FilesService {

    async createFile(file): Promise<string> {
        try {
            const fileName = await uuid.v4() + '.jpg';
            const filePath = await path.resolve(__dirname, '..', 'static')

            if (!fs.existsSync(filePath)) {
                await fs.mkdirSync(filePath, {recursive: true})
            }

            await fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            return fileName;

        } catch (e) {
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR )
        }

    }
}
