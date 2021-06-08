import { GetWallet } from '../application/GetWallet';
import { Wallet } from '../models/Wallet';

export class ShowWallet {
    constructor(private getWallet: GetWallet) {}

    async handle(id: string): Promise<Wallet> {
        return await this.getWallet.execute({ id });
    }
}
