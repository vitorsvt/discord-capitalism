import { Wallet } from '../models/Wallet';
import { WalletRepository } from './WalletRepository';

export class MemoryWalletRepository implements WalletRepository {
    private wallets: Wallet[] = [];

    async fetch() {
        return this.wallets;
    }

    async find(id: string) {
        const wallet = this.wallets.find((wallet) => wallet.id === id);
        if (wallet === undefined) {
            throw Error();
        }
        return wallet;
    }

    async save(wallet: Wallet) {
        if (!this.wallets.includes(wallet)) {
            this.wallets.push(wallet);
        }
    }

    async update(wallet: Wallet) {
        const walletToUpdate = this.wallets.find((w) => w.id === wallet.id);
        if (walletToUpdate === undefined) {
            throw Error();
        }
        walletToUpdate.coins = wallet.coins;
    }
}
