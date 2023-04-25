import AppService from "./AppService";
import AppServiceApollo from "./AppServiceApollo";
import { InMemoryCacheAppServiceFake } from "./FakeInMemoryAppService";

export class AppServiceFactory {
    public static createBasedOnConfiguration():AppService {        
        const appServiceMode:string|undefined = process.env.VUE_APP_SERVICE? process.env.VUE_APP_SERVICE: undefined;
        console.log("|" +appServiceMode + "|");
        if( appServiceMode === 'MEMORY') {
             return new InMemoryCacheAppServiceFake();            
        } 
        
        if (appServiceMode === 'REAL' || appServiceMode === undefined)             {
            return new AppServiceApollo(process.env.VUE_APP_SERVICE_BACKEND);
        } 
            throw new Error("No valid value for APP_SERVICE in .env");                
    }
}