import { Worker } from 'threads';
import AppService from '@/appservices/AppService';
function waitFor(millisec:any) {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, millisec);
    })
}
export class MemoryServiceFixture {    
    private worker: any;
    private appService: AppService;
    private timeOut:number;
    private increment:number;
    public constructor(appServer: AppService, timeOut = 5000, increment=500) {
        this.appService = appServer;
        this.timeOut = timeOut;
        this.increment = increment;
    }

    private async waitingForServer() {        
        let counter = 0;        
        let end = false;
        const list = [];
        while (!end && counter < this.timeOut) {            
            end = await this.appService.serverIsReady();
            await waitFor(this.increment);
            counter +=this.increment;
        }

        if(!end) {
            throw new Error("Not possible to contact with server with timeout of" +this.timeOut/1000 + " seconds");
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


