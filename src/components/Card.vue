<template>
  <v-card class="ma-2 gradient" :width="cardWidth" :href="link" :img="image">
    <v-img :gradient="cardGradient" :height="cardHeight" cover>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>Position: {{ volume }} - {{ chapter }}</v-card-text>
    </v-img>

    <v-card-actions class="cardActionsGrad">
      <v-btn
        icon
        @click.prevent="changeByOne(section, id, true, false)"
        @mousedown.stop
        @touchstart.stop
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.prevent="changeByOne(section, id, false, false)"
        @mousedown.stop
        @touchstart.stop
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn
        icon
        @click.prevent="toggleFavourited(section, id)"
        @mousedown.stop
        @touchstart.stop
      >
        <v-icon v-if="favourited">mdi-star</v-icon>
        <v-icon v-else>mdi-star-outline</v-icon>
      </v-btn>
      <v-menu>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="ml-2"
            icon
            v-on="on"
            v-bind="attrs"
            @click.prevent
            @mousedown.stop
            @touchstart.stop
          >
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </template>

        <v-list dense>
          <v-list-item @click="editCard(section, id)">
            <v-list-item-icon>
              <v-icon>mdi-pencil</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Edit</v-list-item-title>
          </v-list-item>
          <v-list-item @click="removeCard(section, id)">
            <v-list-item-icon>
              <v-icon>mdi-delete</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Delete</v-list-item-title>
          </v-list-item>
          <v-list-item @click="changeByOne(section, id, true, true)">
            <v-list-item-icon>
              <v-icon>mdi-book-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>+1 to volume</v-list-item-title>
          </v-list-item>
          <v-list-item @click="changeByOne(section, id, false, true)">
            <v-list-item-icon>
              <v-icon>mdi-book-minus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>-1 from volume</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Card",
  props: {
    id: Number,
    title: String,
    volume: Number,
    chapter: Number,
    link: String,
    image: String,
    section: Number,
    favourited: Boolean,
    editCard: Function,
  } /* 
  data: () => ({
    favourited: this.favourited || false
  }), */,
  computed: {
    cardWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "195px";
        default:
          return "300px";
      }
    },

    cardHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "250px";
        default:
          return "450px";
      }
    },

    cardGradient() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "to bottom, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, .1) 40%, rgba(0, 0, 0, 0)";
        default:
          return "to bottom, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, .1) 30%, rgba(0, 0, 0, 0)";
      }
    },
  },
  methods: {
    // Change volume or chapter by one (for + and - buttons)
    changeByOne(section, id, positiveDirection, changeVolume) {
      var amount = -1;
      if (positiveDirection) amount = 1;

      var newData;

      if (!changeVolume)
        newData = {
          chapter: this.$store.state.data[section].cards[id].chapter + amount,
        };
      else
        newData = {
          volume: this.$store.state.data[section].cards[id].volume + amount,
        };

      // Send newData to the store for it to change the values
      this.$store.commit("editCard", {
        id: id,
        newData: newData,
        section: section,
      });
    },

    removeCard(section, id) {
      this.$store.commit("removeCard", {
        id: id,
        section: section,
      });
    },

    toggleFavourited(section, id) {
      var oldFavourited = this.favourited;
      var newFavourited = !oldFavourited;

      var newData;
      // If there is no favourited property, we create it and set to true
      if (newFavourited !== undefined) {
        newData = {
          favourited: newFavourited,
        };
      } else {
        newData = {
          favourited: true,
        };
      }

      // Commit the changes
      this.$store.commit("editCard", {
        id: id,
        newData: newData,
        section: section,
      });
    },
  },
};
</script>

<style scoped>
.cardActionsGrad {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
}
</style>