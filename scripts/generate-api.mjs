import {resolve} from 'path';
import {generateApi} from 'swagger-typescript-api';


generateApi({
    name: 'API.ts',
    output: resolve(process.cwd(), './src/api'),
    url: 'http://localhost:8000/swagger.yaml',
    httpClientType: 'axios',
});
