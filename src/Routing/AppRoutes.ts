export interface MyRoute {
    displayName: string;
    name: string;
    url: string;
    urlWithoutParams: string;
    parent?: MyRoute;
}

export class AppRoutes {

    public static readonly AppName: string = "Testovic";
    public static readonly AppBaseRoute: string = "/dist";

    public static readonly HomeWorkspace: MyRoute = {
        displayName: "Testovic app",
        name: "workspace",
        url: AppRoutes.AppBaseRoute,
        urlWithoutParams: AppRoutes.AppBaseRoute,
        parent: undefined,
    };


    public static readonly MonitoringLibraryDetail: MyRoute = {
        displayName: "Monitoring Library",
        name: "monitoringLibraryDetail",
        url: AppRoutes.AppBaseRoute + "/monitoringLibraryDetail/:id",
        urlWithoutParams: AppRoutes.AppBaseRoute + "/monitoringLibraryDetail/",
        parent: AppRoutes.HomeWorkspace,
    };

    public static readonly MonitoringQuestionDetail: MyRoute = {
        displayName: "Monitoring Question",
        name: "monitoringQuestionDetail",
        url: AppRoutes.MonitoringLibraryDetail.url + "/monitoringQuestionDetail/:id",
        urlWithoutParams: "/monitoringQuestionDetail/",
        parent: AppRoutes.MonitoringLibraryDetail,
    };

    public static readonly AllRoutes: MyRoute[] = [
        AppRoutes.HomeWorkspace,
        AppRoutes.MonitoringQuestionDetail,
        AppRoutes.MonitoringLibraryDetail,
    ];
}