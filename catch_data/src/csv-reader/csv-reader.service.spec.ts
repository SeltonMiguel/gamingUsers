import { Test, TestingModule } from '@nestjs/testing';
import { CsvReaderService } from './application/csv-reader.service';
import axios from 'axios';
type AxiosInstance = typeof axios;

describe('CsvReaderService', () => {
  let service: CsvReaderService;
  let axiosMock: Partial<AxiosInstance>;

  beforeEach(async () => {
    axiosMock = {
      post: jest.fn().mockResolvedValue({ status: 200 }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CsvReaderService,
        { provide: 'AXIOS_INSTANCE', useValue: axiosMock },
      ],
    }).compile();

    service = module.get<CsvReaderService>(CsvReaderService);
  });

  it('should call axios post on sendBatch', async () => {
    const batchData = [{ state: 'SP', peopleCount: 100 }];
    await service['sendBatch'](batchData, 1);

    expect(axiosMock.post).toHaveBeenCalledWith('/states/batch', batchData);
  });

  it('should log error if axios post fails', async () => {
    const errorMessage = 'Network Error';
    (axiosMock.post as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const loggerErrorSpy = jest.spyOn(service['logger'], 'error').mockImplementation(() => {});

    await service['sendBatch']([{ state: 'RJ', peopleCount: 50 }], 2);

    expect(loggerErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Erro ao enviar batch #2:'),
      expect.any(String),
    );

    loggerErrorSpy.mockRestore();
  });
});