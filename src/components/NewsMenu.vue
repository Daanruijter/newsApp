<template>
  <div id="nav">
    <hr />
    <div class="news-menu-flex-header-items">
      <div class="news-menu-header-titles">
        <div class="news-menu-description news-menu-world-news">WORLD NEWS{{ this.space }}</div>&nbsp;
        <div class="news-menu-description news-menu-everyday-headlines">Your everyday headlines</div>
      </div>
      <div class="news-menu-header-image-div">
        <img class="news-menu-globe" src="@/assets/globe.jpg" />
      </div>
    </div>
    <hr />

    <div class="news-menu-bar">
      <div @click="loadDefaultNewsItems" class="news-menu-home">
        <router-link to="/">HOME</router-link>
      </div>
      <div :class="{ categoriesClosed: !categoriesPageBoolean }" @click="setCategoriesBoolean">
        <router-link to="/categories">CATEGORIES</router-link>
      </div>
      <div @click="this.makeCategoriesDivClosed" class="news-menu-random">
        <router-link to="/random">RANDOM</router-link>
      </div>
    </div>
    <div class="news-menu-categories" v-if="categoriesPageBoolean">
      <div class="news-menu-information">Get the most recent news per category</div>

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
import { Component, Vue } from "vue-property-decorator";
import news from "../store/modules/news";
import { bus } from "../main";

@Component
export default class NewsMenu extends Vue {
  //STATE
  categoriesPageBoolean = false;
  inputValue = "";
  countrySelected = "Default Country";
  newsCategorySelected = "Default News Category";
  space = "\u00a0";

  mounted() {
    //get the data from Vuex in the newsFooter component
    bus.$emit("triggerDataToFetchInFooter");

    //Close the categories div if a user clicks on a news item link to its detail page
    bus.$on("makeCategoriesDivClosedEventForDetailsPage", () => {
      this.categoriesPageBoolean = false;
    });

    //Close the categories div if a user clicks on the home button
    bus.$on("makeCategoriesDivClosedEventForRandomPage", () => {
      this.categoriesPageBoolean = false;
    });

    //Open the categories div if a user clicks on its button in the newsfooter
    bus.$on("openCategoriesDivFromNewsFooter", () => {
      this.categoriesPageBoolean = !this.categoriesPageBoolean;
      this.newsCategorySelected = "Default News Category";
      this.countrySelected = "Default Country";
    });

    //Close the categories div if a user clicks on a button in the newsfooter that is not the categories button
    bus.$on("closeCategoriesDivFromNewsFooter", () => {
      this.categoriesPageBoolean = false;
    });
  }

  async loadDefaultNewsItems() {
    //If a user clicks on home, fetch the defaults
    const countryFetchObject = {
      fetchBase: "Default Country",
      typeOfFetchBase: "fetchCountry"
    };

    await news.fetchNewsQuery(countryFetchObject);
    bus.$emit("loadDefaultNewsItemsAfterClickOnHomeButton");

    bus.$emit("triggerDataToFetchInFooter");

    //If a user clicks on home, reset the categories settings to their defaults
    this.countrySelected = "Default Country";

    this.newsCategorySelected = "Default News Category";
  }

  //Change the categoriesBoolean variable onclick
  setCategoriesBoolean(): void {
    this.categoriesPageBoolean = !this.categoriesPageBoolean;

    //Make sure the defaults are displayed after a click on the categories button
    this.countrySelected = "Default Country";

    this.newsCategorySelected = "Default News Category";
  }

  //On the Ui catch the country name to fetch on the UI
  async catchCountryValue(event: Event) {
    const selectedCountry = (event.target as HTMLTextAreaElement).value;

    const countryFetchObject = {
      fetchBase: selectedCountry,
      typeOfFetchBase: "fetchCountry"
    };

    this.newsCategorySelected = "Default News Category";

    await news.fetchNewsQuery(countryFetchObject);

    //Trigger a logic in the home component that populates it with the data
    bus.$emit("selectedCountry", selectedCountry);

    this.categoriesPageBoolean = false;

    //Trigger a logic that gets the newsdata array from Vuex into the NewsFooter component
    bus.$emit("triggerDataToFetchInFooter");
  }
  //On the UI catch the category name to fetch
  async catchNewsCategoryValue(event: Event) {
    const selectedNewsCategory = (event.target as HTMLTextAreaElement).value;

    const newsCategoryFetchObject = {
      fetchBase: selectedNewsCategory,
      typeOfFetchBase: "fetchNewsCategory"
    };

    this.countrySelected = "Default Country";
    await news.fetchNewsQuery(newsCategoryFetchObject);

    //Trigger a logic in the Home component that populates it with the data
    bus.$emit("selectedNewsCategory", selectedNewsCategory);
    this.categoriesPageBoolean = false;

    //Trigger a logic that gets the newsdata array from vuex into the NewsFooter component
    bus.$emit("triggerDataToFetchInFooter");
  }
  //On the UI catch the input name to fetch
  async catchInputValue(event: Event) {
    const inputValue = (event.target as HTMLTextAreaElement).value;
    this.inputValue = inputValue;
    this.countrySelected = "Default Country";
    this.newsCategorySelected = "Default News Category";

    //Trigger a logic in the Home component that populates it with the data
    bus.$emit("useInputValueToFetchData");
  }

  //If someone clicks the random button, he gets redirected to the random page, where the category selection menu should not be shown
  makeCategoriesDivClosed() {
    bus.$emit("makeCategoriesDivClosedEventForRandomPage");
  }

  //Close the categories div from the menu itself
  closeCategoriesDiv() {
    this.categoriesPageBoolean = false;
  }

  //If a user queries the API with the input, fetch the data
  async onSubmit(event: Event) {
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

    //Trigger a logic that gets the newsData array from Vuex into the NewsFooter component
    bus.$emit("triggerDataToFetchInFooter");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// general rules
#nav .router-link-exact-active {
  color: #42b983 !important;
}

@font-face {
  font-family: "steelfish";
  src: local("steelfish"),
    url(../steelfishfont/steelfishrg.ttf) format("truetype");
}

.news-menu-header-titles {
  display: flex;
  align-items: center;
}

.news-menu-bar a {
  color: white !important;
  text-decoration: none;
}

.news-menu-possiblities {
  text-align: center;
  margin-top: 2%;
  margin-bottom: 2%;
}

.news-menu-information {
  text-align: center;
  margin-bottom: 5%;
  font-weight: bold;
}

/* bigger screens */
@media only screen and (min-width: 1000px) {
  #nav {
    background-color: white;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    max-height: 131px;
    margin-left: 15%;
    width: 70%;
    z-index: 200;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  .news-menu-flex-header-items {
    display: flex;
    justify-content: center;
    height: 57px;
  }

  .news-menu-header-image-div {
    padding-right: 2%;
    width: 75px;
  }

  .news-menu-description {
    font-family: "steelfish";
    font-size: 35px;
  }

  .news-menu-world-news {
    font-weight: bold;
  }

  .news-menu-globe {
    width: 56px;
  }

  .news-menu-bar {
    display: flex;
    justify-content: flex-start;
    background-color: blue;
    width: 100%;
    padding: 10px 0% 10px 0%;
  }

  .news-menu-home {
    padding-left: 2%;
    padding-right: 2%;
  }

  .news-menu-random {
    padding-left: 2%;
  }

  .news-menu-categories {
    width: 50%;
    padding: 18.2px 25% 0 25%;
    text-align: left;
    background-color: honeydew;
  }

  .news-menu-query-country select,
  .news-menu-query-subject select,
  .news-menu-query-newsitem input {
    width: 50%;
    margin-left: 25%;
    margin-right: 25%;
  }

  .news-menu-query-newsitem-input {
    width: 49.3% !important;
    margin-left: 25%;
    margin-right: 25%;
  }

  .news-menu-close-categoriesdiv {
    color: red;
    font-weight: bold;
    font-size: 150%;
    text-align: right;
    padding-right: 8%;
  }
}

/* medium screens */
@media only screen and (min-width: 701px) and (max-width: 999px) {
  #nav {
    background-color: white;
    position: fixed;
    left: 8px;
    right: 8px;
    top: 0;
    margin-left: 14.5%;
    margin-right: 14.5%;
    max-height: 131px !important;
    width: calc(70% - 8px);
    z-index: 200;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  .news-menu-flex-header-items {
    display: flex;
    justify-content: center;
    height: 57px;
  }

  .news-menu-header-image-div {
    width: 20%;
    padding-right: 2%;
  }

  .news-menu-description {
    font-family: "steelfish";
    font-size: 30px;
  }

  .news-menu-world-news {
    font-weight: bold;
  }

  .news-menu-globe {
    width: 56px;
  }

  .news-menu-bar {
    display: flex;
    justify-content: flex-start;
    background-color: blue;
    width: 100%;
    padding: 10px 0% 10px 0%;
  }

  .news-menu-home {
    padding-left: 2%;
    padding-right: 2%;
  }

  .news-menu-random {
    padding-left: 2%;
  }

  .news-menu-categories {
    width: 50%;
    padding-left: 25%;
    padding-right: 25%;
    padding-top: 18.2px;
    text-align: left;
    background-color: honeydew;
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
}

// smaller screens
@media only screen and (max-width: 700px) {
  #nav {
    background-color: white;
    position: fixed;
    left: 8px;
    right: 8px;
    top: 0;
    max-height: 138px !important;
    z-index: 200;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  .news-menu-flex-header-items {
    display: flex;
    justify-content: center;
    height: 64px;
  }

  .news-menu-header-image-div {
    width: 20%;
    padding-right: 2%;
  }

  .news-menu-description {
    font-family: "steelfish";
    font-size: 25px;
    text-align: center;
  }

  .news-menu-world-news {
    font-weight: bold;
  }

  .news-menu-globe {
    height: 63px;
  }

  .news-menu-bar {
    display: flex;
    justify-content: space-between;
    background-color: blue;
    width: 100%;
    padding: 10px 0% 10px 0%;
  }

  .news-menu-home {
    padding-left: 5%;
  }

  .news-menu-random {
    padding-right: 5%;
  }
  .news-menu-categories {
    padding-top: 18.2px;
    background-color: honeydew;
    text-align: left;
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
}

//adapt categories div layout
@media only screen and (min-width: 450px) and (max-width: 575px) {
  .news-menu-categories {
    padding-left: 13%;
    padding-right: 13%;
    padding-top: 18.2px;
    background-color: white;
    text-align: left;
    background-color: honeydew;
  }
}

//adapt categories div layout
@media only screen and (min-width: 576px) and (max-width: 700px) {
  .news-menu-categories {
    padding-left: 18%;
    padding-right: 18%;
    padding-top: 18.2px;
    background-color: white;
    text-align: left;
    background-color: honeydew;
  }
}
</style>
