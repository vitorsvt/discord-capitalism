import { CreateWallet } from './application/CreateWallet';
import { GetWallet } from './application/GetWallet';
import { ApplicationReady } from './controllers/ApplicationReady';
import { ShowWallet } from './controllers/ShowWallet';
import { MemoryWalletRepository } from './infrastructure/MemoryWalletRepository';

const walletRepository = new MemoryWalletRepository();

const createWallet = new CreateWallet(walletRepository);
const applicationReady = new ApplicationReady(createWallet);

const getWallet = new GetWallet(walletRepository);
const viewWallet = new ShowWallet(getWallet);

export { applicationReady, viewWallet };
