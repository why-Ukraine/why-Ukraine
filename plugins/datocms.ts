import { Plugin, Context } from '@nuxt/types';
import { GraphQLClient, Variables } from "graphql-request";
import type { RequestDocument } from "graphql-request";

const DATO_ENDPOINT = 'https://graphql.datocms.com/';

declare module '@nuxt/types' {
  interface Context {
    $dato<T = any, V = Variables>(query: RequestDocument, variables?: V): Promise<T>;
  }
}

const datoPlugin: Plugin = ({ isDev }, inject) => {
  const token = process.env.NUXT_ENV_DATO_TOKEN;

  if (!token)
    throw new Error("need `NUXT_ENV_DATO_TOKEN` env variable");

  const headers: Record<string, string> = {
    'Authorization': `Bearer ${token}`,
  }

  if (isDev) {
    headers['X-Include-Drafts'] = 'true';
  } else {
    headers['X-Exclude-Invalid'] = 'true';
  }

  const client = new GraphQLClient(DATO_ENDPOINT, { headers });

  const dato: Context['$dato'] = (query, variables) => client.request(query, variables);

  inject('dato', dato);
}

export default datoPlugin;