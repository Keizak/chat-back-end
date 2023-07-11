interface GetUniqueIdsObjectType {
    userId: string;
    [key: string]: any;
};
interface IdSet {
    [key: string]: boolean;
}



export function getUniqueIds(arr: GetUniqueIdsObjectType[]): string[] {
    // Создаем объект для хранения уникальных идентификаторов
    const idSet = arr.reduce((acc, item) => {
        acc[item.userId] = true;
        return acc;
    }, {} as IdSet);

    // Возвращаем массив уникальных идентификаторов
    return Object.keys(idSet);
}