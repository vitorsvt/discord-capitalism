import { WalletRepository } from '../infrastructure/WalletRepository';

export interface TransferCoinsDTO {
    from: string;
    to: string;
    value: number;
}

export class TransferCoins {
    constructor(private walletRepository: WalletRepository) {}

    async execute(data: TransferCoinsDTO): Promise<void> {
        const fromWallet = await this.walletRepository.find(data.from);
        if (fromWallet.coins < data.value) {
            throw Error();
        }
        const toWallet = await this.walletRepository.find(data.to);
        await this.walletRepository.update({
            id: fromWallet.id,
            coins: fromWallet.coins - data.value
        });
        await this.walletRepository.update({
            id: toWallet.id,
            coins: toWallet.coins + data.value
        });
    }
}
