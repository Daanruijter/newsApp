<template>
  <div>
    <div class="news-menu-container">
      <div @click="loadDefaultNewsItems" class="news-menu-home">
        <router-link to="/">HOME</router-link>
      </div>
      <div @click="setCategoriesBoolean">
        <router-link to="/">CATEGORIES</router-link>
      </div>
      <div @click="this.makeCategoriesDivClosed" class="news-menu-random">
        <router-link to="/random">RANDOM</router-link>
      </div>
    </div>
    <div class="news-menu-categories" v-if="categoriesPageBoolean">
      <div class="news-menu-information">
        Get the most recent news per country, column or search for the news
        about a subject.
      </div>

      <div class="news-menu-query-country">
        <select
          v-model="countrySelected"
          @change="catchCountryValue($event)"
          name="country"
          id="country"
        >
          <option value="Default Country">Choose a country</option>
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
      </div>

      <div class="news-menu-possiblities">or</div>

      <div class="news-menu-query-subject">
        <select
          v-model="newsCategorySelected"
          @change="catchNewsCategoryValue($event)"
          name="subject"
          id="subject"
        >
          <option value="Default News Category">Choose a news category</option>
          <option value="Economics">Economics</option>
          <option value="Politics">Politics</option>
          <option value="Science">Science</option>
          <option value="Health">Health</option>
          <option value="Sports">Sports</option>
          <option value="Leisure">Leisure</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Travel">Travel</option>
        </select>
      </div>
      <div class="news-menu-possiblities">or</div>
      <div class="news-menu-query-newsitem">
        <form @submit="onSubmit($event)">
          <input
            class="news-menu-query-newsitem-input"
            type="text"
            placeholder="search for a news item"
            name="searchNewsItem"
            @input="catchInputValue($event)"
          />

          <input type="submit" value="Submit" />
        </form>
        <br />
        <div @click="closeCategoriesDiv" class="news-menu-close-categoriesdiv">X</div>
      </div>
      <br />
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
  inputValue = "";
  countrySelected = "Default Country";
  newsCategorySelected = "Default News Category";

  mounted() {
    console.log("NEWSMENU mounted");
    //get the data from vuex in the newsFooter component
    bus.$emit("triggerDataToFetchInFooter");

    bus.$on("makeCategoriesDivClosedEventForDetailsPage", () => {
      this.categoriesPageBoolean = false;
    });
    bus.$on("makeCategoriesDivClosedEventForRandomPage", () => {
      this.categoriesPageBoolean = false;
    });
    bus.$on("openCategoriesDivFromNewsFooter", () => {
      this.categoriesPageBoolean = !this.categoriesPageBoolean;
    });
    bus.$on("closeCategoriesDivFromNewsFooter", () => {
      this.categoriesPageBoolean = false;
    });
  }

  async loadDefaultNewsItems() {
    //trigger a logic that gets the newsdata array from vuex into the newsFooter component
    bus.$emit("triggerDataToFetchInFooter");
    const countryFetchObject = {
      fetchBase: "Default Country",
      typeOfFetchBase: "fetchCountry"
    };

    await news.fetchNewsQuery(countryFetchObject);
    bus.$emit("loadDefaultNewsItemsAfterClickOnHomeButton");

    //if a user clicks on home, reset the categories settings to their defaults
    this.countrySelected = "Default Country";
    this.newsCategorySelected = "Default News Category";
  }

  setCategoriesBoolean() {
    //trigger a logic that gets the newsdata array from vuex into the newsFooter component
    bus.$emit("triggerDataToFetchInFooter");
    this.categoriesPageBoolean = !this.categoriesPageBoolean;
  }

  async catchCountryValue(event: Event) {
    //trigger a logic that gets the newsdata array from vuex into the newsFooter component
    bus.$emit("triggerDataToFetchInFooter");
    const selectedCountry = (event.target as HTMLTextAreaElement).value;
    const countryFetchObject = {
      fetchBase: selectedCountry,
      typeOfFetchBase: "fetchCountry"
    };

    this.newsCategorySelected = "Default News Category";

    await news.fetchNewsQuery(countryFetchObject);
    bus.$emit("selectedCountry", selectedCountry);
    this.categoriesPageBoolean = false;
  }

  async catchNewsCategoryValue(event: Event) {
    //trigger a logic that gets the newsdata array from vuex into the newsFooter component
    bus.$emit("triggerDataToFetchInFooter");
    const selectedNewsCategory = (event.target as HTMLTextAreaElement).value;
    const newsCategoryFetchObject = {
      fetchBase: selectedNewsCategory,
      typeOfFetchBase: "fetchNewsCategory"
    };
    this.countrySelected = "Default Country";
    await news.fetchNewsQuery(newsCategoryFetchObject);
    bus.$emit("selectedNewsCategory", selectedNewsCategory);
    this.categoriesPageBoolean = false;
  }

  async catchInputValue(event: Event) {
    const inputValue = (event.target as HTMLTextAreaElement).value;
    this.inputValue = inputValue;
    this.countrySelected = "Default Country";
    this.newsCategorySelected = "Default News Category";

    bus.$emit("useInputValueToFetchData");
  }

  //if someone clicks the random button, he gets redirected to the random page, where the category selection menu should not be shown
  makeCategoriesDivClosed() {
    //trigger a logic that gets the newsdata array from vuex into the newsFooter component
    bus.$emit("triggerDataToFetchInFooter");
    bus.$emit("makeCategoriesDivClosedEventForRandomPage");
  }

  //close the categoriesdiv from the menu itself
  closeCategoriesDiv() {
    this.categoriesPageBoolean = false;
  }

  async onSubmit(event: Event) {
    //trigger a logic that gets the newsdata array from vuex into the newsFooter component
    bus.$emit("triggerDataToFetchInFooter");
    console.log("submit");
    event.preventDefault();
    const inputValue = this.inputValue;
    const inputFetchObject = {
      fetchBase: inputValue,
      typeOfFetchBase: "fetchInput"
    };
    await news.fetchNewsQuery(inputFetchObject);
    const inputFetchValue = inputFetchObject.fetchBase;
    bus.$emit("useInputValueToFetchData", inputFetchValue);
    this.categoriesPageBoolean = false;
  }
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
  text-align: left;
}

.news-menu-possiblities {
  text-align: center;
  margin-top: 2%;
  margin-bottom: 2%;
}
.news-menu-information {
  padding-left: 5%;
  margin-bottom: 5%;
}
.news-menu-query-country select,
.news-menu-query-subject select,
.news-menu-query-newsitem input {
  width: 60%;
  margin-left: 20%;
  margin-right: 20%;
}

.news-menu-query-newsitem-input {
  width: 59% !important;
  margin-left: 20%;
  margin-right: 20%;
}
.news-menu-close-categoriesdiv {
  color: red;
  font-weight: bold;
  font-size: 150%;
  text-align: right;
  padding-right: 8%;
}
</style>
