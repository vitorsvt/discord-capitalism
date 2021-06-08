import { WalletRepository } from '../infrastructure/WalletRepository';

export interface CreateWalletDTO {
    id: string;
    coins: number;
}

export class CreateWallet {
    constructor(private walletRepository: WalletRepository) {}

    async execute(data: CreateWalletDTO): Promise<void> {
        await this.walletRepository.save(data);
    }
}
