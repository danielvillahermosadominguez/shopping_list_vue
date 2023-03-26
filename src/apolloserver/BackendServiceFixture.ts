import AppService from "@/appservices/AppService";

export default interface BackendServiceFixture {    
    get appService():AppService;

    init(): void;    

    disposeFixture(): void;
}