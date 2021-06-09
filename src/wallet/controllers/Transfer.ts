import { TransferCoins } from '../application/TransferCoins';

export interface TransferDTO {
    from: string;
    to: string;
    value: number;
}

export class Transfer {
    constructor(private transferCoins: TransferCoins) {}

    async handle(data: TransferDTO): Promise<void> {
        await this.transferCoins.execute(data);
    }
}
