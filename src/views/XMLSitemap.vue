<template>
  <div class="XMLsitemap-container">{{this.XML}}</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
// import news from "../store/modules/news";
// import NewsItemType from "../interfacesforapp";
// import { bus } from "../main";

@Component
export default class XMLSitemap extends Vue {
  //STATE
  XML = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns=" http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>http://localhost:8081/#/</loc><changefreq>monthly</changefreq></url><url><loc>http://localhost:8081/#details/</loc><changefreq>monthly</changefreq></url><url><loc>http://localhost:8081/#random</loc><changefreq>monthly</changefreq></url><url><loc>https://www.nytimes.com/2020/10/12/business/nobel-economics-paul-milgrom-robert-wilson.html</loc><changefreq>weekly</changefreq></url><url><loc>https://www.npr.org/2020/10/12/922482941/many-firsts-at-confirmation-hearings-for-judge-amy-coney-barrett</loc><changefreq>weekly</changefreq></url><url><loc>https://www.politico.com/news/2020/10/12/biden-trump-2020-election-night-428856</loc><changefreq>weekly</changefreq></url><url><loc>https://www.washingtonpost.com/nation/2020/10/12/coronavirus-covid-live-updates-us/</loc><changefreq>weekly</changefreq></url><url><loc>https://www.cnn.com/2020/10/12/world/wolf-rayet-star-apep-scn-trnd/index.html</loc><changefreq>weekly</changefreq></url><url><loc>https://www.cnn.com/2020/10/12/asia/china-qingdao-coronavirus-golden-week-intl-hnk/index.html</loc><changefreq>weekly</changefreq></url><url><loc>https://www.engadget.com/coronavirus-flu-virus-smartphone-screens-080440373.html</loc><changefreq>weekly</changefreq></url><url><loc>https://www.theguardian.com/sport/2020/oct/12/dak-prescott-injury-dallas-cowboys-nfl-football</loc><changefreq>weekly</changefreq></url><url><loc>https://www.cnbc.com/2020/10/12/british-airways-chief-alex-cruz-to-step-down.html</loc><changefreq>weekly</changefreq></url><url><loc>https://www.huffpost.com/entry/jennifer-aniston-puppy_n_5f83a8a9c5b62f97bac470d9</loc><changefreq>weekly</changefreq></url><url><loc>https://finance.yahoo.com/news/goldman-says-short-dollar-odds-015258010.html</loc><changefreq>weekly</changefreq></url><url><loc>https://www.cnn.com/2020/10/12/health/coronavirus-human-challenge-trials-gbr-intl/index.html</loc><changefreq>weekly</changefreq></url><url><loc>https://www.theverge.com/good-deals/2020/10/12/21511788/apple-airpods-pro-wireless-headphones-earbuds-woot-prime-day-2020-deal-sale</loc><changefreq>weekly</changefreq></url><url><loc>https://www.geo.tv/latest/312795-hailey-baldwin-endorses-joe-biden-ahead-of-us-election</loc><changefreq>weekly</changefreq></url><url><loc>https://www.autoevolution.com/news/cardi-b-gets-custom-rolls-royce-cullinan-from-offset-on-her-birthday-149996.html</loc><changefreq>weekly</changefreq></url><url><loc>https://www.foxnews.com/media/ap-called-out-for-adopting-democrats-language-on-court-packing</loc><changefreq>weekly</changefreq></url><url><loc>https://www.mlb.com/news/rays-win-alcs-game-1-2020</loc><changefreq>weekly</changefreq></url><url><loc>https://www.foxbusiness.com/money/dollar-rises-slightly-in-early-monday-trading-against-euro-yuan</loc><changefreq>weekly</changefreq></url><url><loc>https://www.9news.com/article/news/crime/security-guard-held-denver-shooting-wasnt-licensed-officials-say/73-648ca0f2-cc71-4fa7-b145-cbd710b87f5f</loc><changefreq>weekly</changefreq></url><url><loc>https://profootballtalk.nbcsports.com/2020/10/11/patriots-dont-believe-they-have-an-outbreak/</loc><changefreq>weekly</changefreq></url></urlset>`;

  //   async mounted() {}
}
</script>

<style scoped>
.XMLsitemap-container {
  margin-top: 138px;
}
/* general rules */

/* bigger screens */

/* medium screens */

/* smaller screens */
</style>


