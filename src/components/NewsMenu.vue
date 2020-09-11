<template>
  <div>
    <div class="news-menu-container">
      <div class="news-menu-home">
        <router-link to="/">HOME</router-link>
      </div>
      <div @click="setCategoriesBoolean">
        <router-link to="/">CATEGORIES</router-link>
      </div>
      <div class="news-menu-random">
        <router-link to="/random">RANDOM</router-link>
      </div>
    </div>
    <div class="news-menu-categories" v-if="categoriesPageBoolean">
      <label for="country">Choose a country:</label>
      <select @change="catchValue($event)" name="country" id="country">
        <option value="Default Country">Default</option>
        <option value="Argentina">Argentina</option>
        <option value="Australia">Australia</option>
        <option value="Austria">Austria</option>
        <option value="Belgium">Belgium</option>
        <option value="Brazil">Brazil</option>
        <option value="Bulgaria">Bulgaria</option>
        <option value="Canada">Canada</option>
        <option value="China">China</option>
        <option value="Colombia">Colombia</option>
        <option value="Cuba">Cuba</option>
        <option value="Czech Republic">Czech Republic</option>
        <option value="Egypt">Egypt</option>
        <option value="France">France</option>
        <option value="Germany">Germany</option>
        <option value="Greece">Greece</option>
        <option value="Hong Kong">Hong Kong</option>
        <option value="Hungary">Hungary</option>
        <option value="India">India</option>
        <option value="Indonesia">Indonesia</option>
        <option value="Ireland">Ireland</option>
        <option value="Israel">Israel</option>
        <option value="Italy">Italy</option>
        <option value="Japan">Japan</option>
        <option value="Latvia">Latvia</option>
        <option value="Lithuania">Lithuania</option>
        <option value="Malaysia">Malaysia</option>
        <option value="Mexico">Mexico</option>
        <option value="Morocco">Morocco</option>
        <option value="Netherlands">Netherlands</option>
        <option value="New Zealand">New Zealand</option>
        <option value="Nigeria">Nigeria</option>
        <option value="Norway">Norway</option>
        <option value="Philippines">Philippines</option>
        <option value="Poland">Poland</option>
        <option value="Portugal">Portugal</option>
        <option value="Romania">Romania</option>
        <option value="Russia">Russia</option>
        <option value="Saudi Arabia">Saudi Arabia</option>
        <option value="Serbia">Serbia</option>
        <option value="Singapore">Singapore</option>
        <option value="Slovakia">Slovakia</option>
        <option value="Slovenia">Slovenia</option>
        <option value="South Africa">South Africa</option>
        <option value="South Korea">South Korea</option>
        <option value="Sweden">Sweden</option>
        <option value="Switzerland">Switzerland</option>
        <option value="Taiwan">Taiwan</option>
        <option value="Thailand">Thailand</option>
        <option value="Turkey">Turkey</option>
        <option value="United Arabic Emirates">United Arabic Emirates</option>
        <option value="Philippines">Philippines</option>
        <option value="Ukraine">Ukraine</option>
        <option value="United Kingdom">United Kingdom</option>
        <option value="United States">United States</option>
        <option value="Venezuela">Venezuela</option>
      </select>
      <label for="subject">Choose a subject:</label>
      <select @change="catchValue($event)" name="subject" id="subject">
        <option value="Default News Category">Default</option>
        <option value="Economics">Economics</option>
        <option value="Politics">Politics</option>
        <option value="Science">Science</option>
        <option value="Health">Health</option>
        <option value="Sports">Sports</option>
        <option value="Leisure">Leisure</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Travel">Travel</option>
      </select>
      <input
        type="text"
        placeholder="search for a news item"
        name="searchNewsItem"
        @input="catchInputValue($event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import news from "../store/modules/news";
import { bus } from "../main";

@Component
export default class NewsMenu extends Vue {
  @Prop() private msg!: string;
  categoriesPageBoolean = false;

  setCategoriesBoolean() {
    this.categoriesPageBoolean = !this.categoriesPageBoolean;
  }
  async catchValue(event: Event) {
    console.log(event.target as HTMLTextAreaElement);
    const selectedCountryOrCategory = (event.target as HTMLTextAreaElement)
      .value;

    await news.fetchNewsQuery(selectedCountryOrCategory);
    bus.$emit("selectedCountryOrCategory", selectedCountryOrCategory);
  }

  async catchInputValue(event: Event) {
    const inputValue = (event.target as HTMLTextAreaElement).value;
    await news.fetchNewsQuery(inputValue);
    bus.$emit("useInputValueToFetchData", inputValue);
  }

  // catchSelectedSubject(event: Event) {
  //   const selectedSubject = (event.target as HTMLTextAreaElement).value;
  //   console.log(selectedSubject);
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.news-menu-container {
  display: flex;
  justify-content: space-between;
  background-color: blue;
  width: 100%;
  padding: 5% 0% 5% 0%;
  margin-bottom: 5%;
  // position: fixed;
}

.news-menu-container a {
  color: white !important;
  text-decoration: none;
}

.news-menu-home {
  padding-left: 5%;
}

.news-menu-random {
  padding-right: 5%;
}
.news-menu-categories {
  margin-top: 18.2px;
  background-color: white;
}
</style>
