<script lang="ts">
import Vue from 'vue'
import type { Article } from '../../types';
import { gql } from 'graphql-request';

const query = gql`
query getArticle($name: String) {
  article(filter: {name: {eq: $name}}) {
    title
    content {
      value
      links
      blocks
    }
  }
}
`

interface Data {
  article: Article;
}

export default Vue.extend({
  name: 'IndexPage',

  data(): Data {
    return {
      article: {} as Article
    };
  },

  async asyncData({ params: { name }, $dato }): Promise<Data> {
    const data = await $dato<Data>(query, { name });

    if (!data.article) throw new Error('article/not-found');
    return data;
  }
})
</script>

<template>
  <div>
    <h1>{{article.title}}</h1>
    <div>
    </div>
  </div>
</template>
