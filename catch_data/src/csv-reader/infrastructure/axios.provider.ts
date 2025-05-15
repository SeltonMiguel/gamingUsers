import { Provider } from '@nestjs/common';
import axios from 'axios';

export const AxiosProvider: Provider = {
    provide: 'AXIOS_INSTANCE',
    useValue: axios.create({
        baseURL: 'http://localhost:3002',
        timeout: 5000,
    }),
};