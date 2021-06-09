import { Knex } from 'knex';
import { Wallet } from '../models/Wallet';
import { WalletRepository } from './WalletRepository';

export class KnexWalletRepository implements WalletRepository {
    constructor(private db: Knex) {}

    async fetch() {
        return this.db
            .select<Wallet[]>('discord_id as id', 'coins')
            .from('wallets');
    }

    async find(id: string) {
        return await this.db
            .where({ discord_id: id })
            .select('discord_id as id', 'coins')
            .from('wallets')
            .first<Wallet>();
    }

    async save(wallet: Wallet) {
        const whereId = await this.db
            .where({ discord_id: wallet.id })
            .select()
            .from('wallets')
            .first<Wallet>();
        if (whereId === undefined) {
            await this.db
                .insert({ discord_id: wallet.id, coins: wallet.coins })
                .into('wallets');
        }
    }

    async update(wallet: Wallet) {
        await this.db('wallets').where({ discord_id: wallet.id }).update({
            coins: wallet.coins
        });
    }
}
