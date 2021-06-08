import { WalletRepository } from '../infrastructure/WalletRepository';
import { Wallet } from '../models/Wallet';

export interface GetWalletDTO {
    id: string;
}

export class GetWallet {
    constructor(private walletRepository: WalletRepository) {}

    async execute(data: GetWalletDTO): Promise<Wallet> {
        return await this.walletRepository.find(data.id);
    }
}
