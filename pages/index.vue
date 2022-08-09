<script lang="ts">
import Vue from 'vue'
import type { Article } from '../types';
import { gql } from 'graphql-request';

const query = gql`
query {
  allArticles {
    name,
    title
  }
}
`

interface Data {
  allArticles: Array<Pick<Article, "name" | "title">>;
}

export default Vue.extend({
  name: 'IndexPage',

  data(): Data {
    return {
      allArticles: []
    }
  },

  async asyncData({ $dato }): Promise<Data> {
    return await $dato<Data>(query);
  }
})
</script>

<template>
  <div>
    <h1>Why Ukraine</h1>
    <div>
      <ul v-for="article in allArticles" :key="article.name">
        <li>
          <NuxtLink :to="'/article/' + article.name">{{article.title}}</NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
