export class ElementMeta {
    elementOrder: number;
    elementId: string;
    elementDisplayLabel: string;
    elementOptions: string[];
    elementType: string;
    regExPattern: string;
    elementRequiredFlag: boolean;
    allParentElementIds: string[];
    anyParentElementIds: string[];
    parentElementWithValue: string;

    constructor() {}
}
