import AppService from "@/appservices/AppService";
import { BackendScriptServiceFixture } from "./backendscriptservicefixture";
import BackendServiceFixture from "./BackendServiceFixture";
import BackendDummyServiceFixture from "./BackendDummyServiceFixture";
import { AppServiceFactory } from "@/appservices/AppServiceFactory";

export class FactoryServiceFixture {
    public static createBasedOnConfiguration(): BackendServiceFixture {        
        let result:BackendServiceFixture;
        const appService:AppService = AppServiceFactory.createBasedOnConfiguration();        
        
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