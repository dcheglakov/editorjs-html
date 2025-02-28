export type transforms = {
    [key: string]: any;
    delimiter(): string;
    header(block: block): string;
    paragraph(block: block): string;
    list(block: block): string;
    nestedlist(block: block): string;
    image(block: block): string;
    warning(block: block): string;
    quote(block: block): string;
    code(block: block): string;
    raw(block: block): string;
    embed(block: block): string;
};
type ListItem = {
    content: string;
    items: Array<ListItem>;
};
export type block = {
    type: string;
    data: {
        text?: string;
        level?: number;
        title?: string;
        message?: string;
        caption?: string;
        url?: string;
        file?: {
            url?: string;
        };
        stretched?: boolean;
        withBackground?: boolean;
        withBorder?: boolean;
        items?: Array<string> | Array<ListItem>;
        style?: string;
        code?: string;
        service?: "vimeo" | "youtube" | "instagram" | "twitter";
        source?: string;
        embed?: string;
        width?: number;
        height?: number;
        alignment?: "left" | "right" | "center" | "justify";
        align?: "left" | "right" | "center" | "justify";
        html?: string;
    };
};
declare const transforms: transforms;
export default transforms;
