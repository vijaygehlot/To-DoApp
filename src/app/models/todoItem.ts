export class TodoItem {
    id: number;
    title: string;
    description: string;
    parentId: number;
    // childrenIds: Array<number>;
    dateToComplete: Date;
}
