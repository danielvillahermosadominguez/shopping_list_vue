import AppService from "./AppService";
import AppServiceApollo from "./AppServiceApollo";

export class AppServiceFactory {
    public static createBasedOnConfiguration():AppService {
        return new AppServiceApollo();
    }
}