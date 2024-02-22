export enum Dir {
    Incomes = 1,
    Expenses = 2,
}

export enum Frequency {
    OneTime = 1,
    Daily = 2,
    Weekly = 3,
    Monthly = 4,
    Yearly = 5,

}

export function frequencyToString(freq: Frequency): string {
    switch(freq){
        case Frequency.OneTime:
            return "Jednorázově";
        case Frequency.Daily:
            return "Denně";
        case Frequency.Weekly:
            return "Týdně";
        case Frequency.Monthly:
            return "Měsíčně";
        case Frequency.Yearly:
            return "Ročně";
    }
}