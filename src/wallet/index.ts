import knex from 'knex';
import { CreateWallet } from './application/CreateWallet';
import { GetWallet } from './application/GetWallet';
import { ListWallets } from './application/ListWallets';
import { TransferCoins } from './application/TransferCoins';
import { ApplicationReady } from './controllers/ApplicationReady';
import { Ranking } from './controllers/Ranking';
import { ShowWallet } from './controllers/ShowWallet';
import { Transfer } from './controllers/Transfer';
import { KnexWalletRepository } from './infrastructure/KnexWalletRepository';

const walletRepository = new KnexWalletRepository(
    knex({
        client: 'sqlite3',
        connection: {
            filename: './db/dev.sqlite3'
        },
        useNullAsDefault: true
    })
);

const createWallet = new CreateWallet(walletRepository);
const applicationReady = new ApplicationReady(createWallet);

const getWallet = new GetWallet(walletRepository);
const viewWallet = new ShowWallet(getWallet);

const listWallets = new ListWallets(walletRepository);
const ranking = new Ranking(listWallets);

const transferCoins = new TransferCoins(walletRepository);
const transfer = new Transfer(transferCoins);

export { applicationReady, viewWallet, ranking, transfer };
