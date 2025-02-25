export interface IStorageCleanAll {
    cleanAll: (services: string[]) => Promise<void>;
}