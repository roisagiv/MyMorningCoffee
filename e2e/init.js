import { init, cleanup } from 'detox';
import { detox as config } from '../package.json';

jest.setTimeout(120000);

beforeAll(async () => {
    await init(config);
});

afterAll(async () => {
    await cleanup();
});