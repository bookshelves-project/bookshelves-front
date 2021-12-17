export interface Content {
    title: string,
    subtitle?: string,
    slug: string,
    description: string,
    dir: string,
    path: string,
    body: object,
    createdAt: Date,
    updatedAt: Date,
    extension: string,
    toc: { id:string, depth: number, text: string }[]
}
