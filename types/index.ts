export interface DastDocument {
  schema: "dast",
  document: {
    type: "root",
    children: any[],
  }
}

export interface Article {
  name: string,
  title: string,
  // TODO: try vue-datocms package
  content: {
    blocks: any[];
    links: any[];
    value: DastDocument;
  },
}