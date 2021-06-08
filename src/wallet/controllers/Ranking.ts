import { ListWallets } from '../application/ListWallets';
import { Wallet } from '../models/Wallet';

export class Ranking {
    constructor(private getWallet: ListWallets) {}

    async handle(): Promise<Wallet[]> {
        const wallets = await this.getWallet.execute();
        return wallets.sort((a, b) => b.coins - a.coins);
    }
}
