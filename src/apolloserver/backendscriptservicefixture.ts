import { Worker } from 'threads';
import AppService from '@/appservices/AppService';
import { WorkerImplementation } from 'threads/dist/types/master';
import * as util from "util";

const ERROR_MESSAGE = "Not possible to contact with server with timeout of %s seconds";
export class BackendScriptServiceFixture {
    private worker: WorkerImplementation | undefined;
    private appService: AppService;
    private timeOut: number;
    private increment: number;
    private fixtureScript:string;

    public constructor(appServer: AppService,  fixtureScript:string, timeOut = 5000, increment = 500) {
        this.appService = appServer;
        this.timeOut = timeOut;
        this.increment = increment;
        this.fixtureScript = fixtureScript;
    }

    private async waitingForServer() {        
        let counter = 0;
        let end = false;
        while (!end && counter < this.timeOut) {
            end = await this.appService.serverIsReady();
            await this.waitFor(this.increment);
            counter += this.increment;
        }
        
        if (!end) {
            const errorMessage = util.format(ERROR_MESSAGE, this.timeOut / 1000);
            throw new Error(errorMessage);
        }
    }

    private waitFor(millisec: number) {
        return new Promise(resolve => {
            setTimeout(() => { resolve('') }, millisec);
        })
    }

    
    public async init() {
        this.startServer();
        await this.waitingForServer();
    }

    private startServer() {
        this.worker = new Worker(this.fixtureScript);
    }

    public async disposeFixture() {
        await this.worker?.terminate();
        this.worker = undefined;
    }
}
