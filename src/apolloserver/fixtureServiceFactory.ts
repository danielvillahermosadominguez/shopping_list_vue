import AppService from "@/appservices/AppService";
import { BackendScriptServiceFixture } from "./backendscriptservicefixture";

export class FactoryServiceFixture {
    public static createBasedOnConfiguration(): BackendScriptServiceFixture {
        const appService = new AppService(
            process.env.VUE_APP_SERVICE_BACKEND);
        return new BackendScriptServiceFixture(appService,
            process.env.FIXTURE_BACKEND_SCRIPT ? process.env.FIXTURE_BACKEND_SCRIPT : "",
            process.env.BACKEND_TIME_OUT ? parseInt(process.env.BACKEND_TIME_OUT) : undefined,
            process.env.BACKEND_TIME_OUT_INCREMENT ? parseInt(process.env.BACKEND_TIME_OUT_INCREMENT) : undefined);
    }
}