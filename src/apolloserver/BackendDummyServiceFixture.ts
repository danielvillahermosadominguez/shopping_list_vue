import AppService from "@/appservices/AppService";
import BackendServiceFixture from "./BackendServiceFixture";

export default class BackendDummyServiceFixture implements BackendServiceFixture{    
    private _appService:AppService;
    public constructor(appService:AppService) {
        this._appService = appService;
    }
    public get appService(){
        return this._appService;
    }

    public init() {
        return;
    }

    public disposeFixture() {
        return;
    }
}