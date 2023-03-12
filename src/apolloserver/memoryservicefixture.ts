import { Worker } from 'threads';
import AppService from '@/appservices/AppService';

export class MemoryServiceFixture {    
    private worker: any;
    private appService: AppService;

    public constructor(appServer: AppService) {
        this.appService = appServer;
    }

    private async waitingForServer() {
        let fin = false;
        const list = [];
        while (!fin) {
            fin = await this.appService.serverIsReady();
        }
    }

    public async init() {
        this.startServer();
        await this.waitingForServer();
    }

    private startServer() {
        this.worker = new Worker('fixture.mjs');
    }

    public async disposeFixture() {
        await this.worker.terminate((e: any) => {
            this.worker = null;
        });
    }
}


