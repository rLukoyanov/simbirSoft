export const find = (str: string, arr: any) => {
    return arr
        .map((item: any, i: number) => (item.name.indexOf(str) >= 0 ? i : -1))
        .filter((item: any) => item >= 0);
};
