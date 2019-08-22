declare module NodeJS  {
    interface Global {
      __IOS__: any,
      __ANDROID__: any,
      NavigationHelper: any,
    }
}

declare var NavigationHelper: {
    navigation: any,
    navRouters: any,
    isTopScreen: (key:string) => boolean,
    goBack: () => void,
    push: (routeName: string, params?) => void,
    navigate: (routeName:string, params?) => void,
    resetTo: (routeName:string,params?:any) => void,
    replace: (routeName:string, params?) => void,
    popN: (num:number) => void,
    popToTop: () => void,
    popToIndex: (indexOfRoute:number) => void,
    popToRoute: (routeName:string) => void,
};

interface RequestModel<T> {
    request: T,
    successAction?: any,
    failAction?: any,
    //唯一id，用户清除扁平化数据
    uuid?: string,
    [key: string]: any
}

interface ResponseModel<T> {
    result: T,
    [key: string]: any
}