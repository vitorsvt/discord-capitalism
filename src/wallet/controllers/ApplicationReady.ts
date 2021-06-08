import { CreateWallet } from '../application/CreateWallet';

export class ApplicationReady {
    constructor(private createWallet: CreateWallet) {}

    async handle(idList: string[]): Promise<void> {
        idList.forEach(async (id) => {
            await this.createWallet.execute({ id, coins: 1 });
        });
    }
}
