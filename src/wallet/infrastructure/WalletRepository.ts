import { Wallet } from '../models/Wallet';

export interface WalletRepository {
    fetch(): Promise<Wallet[]>;
    find(id: string): Promise<Wallet>;
    update(wallet: Partial<Wallet> & Pick<Wallet, 'id'>): Promise<void>;
    save(wallet: Wallet): Promise<void>;
}
