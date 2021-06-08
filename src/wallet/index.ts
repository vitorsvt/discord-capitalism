import { CreateWallet } from './application/CreateWallet';
import { ApplicationReady } from './controllers/ApplicationReady';
import { MemoryWalletRepository } from './infrastructure/MemoryWalletRepository';

const walletRepository = new MemoryWalletRepository();
const createWallet = new CreateWallet(walletRepository);
const applicationReady = new ApplicationReady(createWallet);

export { applicationReady };
