import { Worker } from 'threads';
import AppService from '@/appservices/AppService';
import { WorkerImplementation } from 'threads/dist/types/master';
import * as util from "util";
import BackendServiceFixture from './BackendServiceFixture';

const ERROR_MESSAGE_NOT_POSSIBLE_TO_CONTACT_WITH_SERVER = "Not possible to contact with server fixture with timeout of %s seconds";
export class BackendScriptServiceFixture implements BackendServiceFixture {
    private worker: WorkerImplementation | undefined;
    private _appService: AppService;
    private timeOut: number;
    private increment: number;
    private fixtureScript:string;

    get appService() {
        return this._appService;
    }
    
    public constructor(appServer: AppService,  fixtureScript:string, timeOut = 5000, increment = 500) {
        this._appService = appServer;
        this.timeOut = timeOut;
        this.increment = increment;
        this.fixtureScript = fixtureScript;
    }

    private async waitingForServer() {        
        let counter = 0;
        let end = false;
        while (!end && counter < this.timeOut) {
            end = await this._appService.serverIsReady();
            await this.waitFor(this.increment);
            counter += this.increment;
        }
        
        if (!end) {
            const errorMessage = util.format(ERROR_MESSAGE_NOT_POSSIBLE_TO_CONTACT_WITH_SERVER, this.timeOut / 1000);
            throw new Error(errorMessage);
        }
    }

    private waitFor(millisec: number) {
        return new Promise(resolve => {
            setTimeout(() => { resolve('') }, millisec);
        })
    }

    
    public async init() {
        try {
            this.startServer();
            await this.waitingForServer();
          } catch (e: Error | unknown) {
            this.disposeFixture();
            throw e;
          }        
    }

    private startServer() {
        this.worker = new Worker(this.fixtureScript);
    }

    public async disposeFixture() {
        await this.worker?.terminate();
        this.worker = undefined;
    }
}
