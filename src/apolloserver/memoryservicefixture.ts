import { spawn, Thread, Worker} from 'threads';
import * as path from 'path';


export class MemoryServiceFixture {    
    private directory:string = path.resolve();    
    private worker:any;
    
    public async init() {        
        this.worker = new Worker('fixture.mjs');
        await this.worker.postMessage({
            action:"start"            
        }); 
                
        await this.worker.addEventListener("message", (e: any) => {
            if(e.data) {
                console.log('fixture is working');
            }
        })
    }

    private startServer() {
        
    }

    public clearFixture() {
        this.worker.postMessage({
            action:"clear"
        });        
        this.worker.addEventListener("message", (e: any) => {
            if(e.data) {
                console.log("all the items has been deleted");
            }

        });
    }

    public async disposeFixture() {
        await Thread.terminate(this.worker);
    }
}


