import AppService from "@/appservices/AppService";
import { BackendScriptServiceFixture } from "./backendscriptservicefixture";
import AppServiceApollo from "@/appservices/AppServiceApollo";
import { InMemoryCacheAppServiceFake } from "@/appservices/FakeInMemoryAppService";
import BackendServiceFixture from "./BackendServiceFixture";
import BackendDummyServiceFixture from "./BackendDummyServiceFixture";

export class FactoryServiceFixture {
    public static createBasedOnConfiguration(): BackendServiceFixture {        
        let result:BackendServiceFixture;
        let appService:AppService;
        const appServiceMode:string|undefined = process.env.APP_SERVICE? process.env.APP_SERVICE: undefined;
        if( appServiceMode === 'MEMORY') {
            appService = new InMemoryCacheAppServiceFake();
            return result = new  BackendDummyServiceFixture(appService);
        } 
        
        if (appServiceMode === 'REAL' || appServiceMode === undefined)             {
            appService = new AppServiceApollo(
                process.env.VUE_APP_SERVICE_BACKEND);
        } else {
            throw new Error("No valid value for APP_SERVICE in .env");
        }
        
        if(process.env.FIXTURE_BACKEND_SCRIPT === undefined || process.env.FIXTURE_BACKEND_SCRIPT === "NONE") {
            result = new  BackendDummyServiceFixture(appService);
        } else {
            result =  new BackendScriptServiceFixture(appService,
                process.env.FIXTURE_BACKEND_SCRIPT ? process.env.FIXTURE_BACKEND_SCRIPT : "",
                process.env.BACKEND_TIME_OUT ? parseInt(process.env.BACKEND_TIME_OUT) : undefined,
                process.env.BACKEND_TIME_OUT_INCREMENT ? parseInt(process.env.BACKEND_TIME_OUT_INCREMENT) : undefined);
        }

        return result;        
    }
}