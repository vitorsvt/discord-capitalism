import knex from 'knex';
import { CreateWallet } from './application/CreateWallet';
import { GetWallet } from './application/GetWallet';
import { ListWallets } from './application/ListWallets';
import { ApplicationReady } from './controllers/ApplicationReady';
import { Ranking } from './controllers/Ranking';
import { ShowWallet } from './controllers/ShowWallet';
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

export { applicationReady, viewWallet, ranking };
