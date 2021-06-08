import { WalletRepository } from '../infrastructure/WalletRepository';
import { Wallet } from '../models/Wallet';

export class ListWallets {
    constructor(private walletRepository: WalletRepository) {}

    async execute(): Promise<Wallet[]> {
        return await this.walletRepository.fetch();
    }
}
