export declare function pageEndpointsPlugin(): {
    name: string;
    transform(_code: string, id: string): Promise<{
        code: string;
        map: null;
    } | undefined>;
};
