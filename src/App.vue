<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Manga Saver</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-tooltip bottom :open-delay="500">
        <template v-slot:activator="{on, attrs}">
          <v-btn icon @click="saveData" v-on="on" v-bind="attrs">
            <v-icon>mdi-download</v-icon>
          </v-btn>
        </template>
        <span>Save</span>
      </v-tooltip>

      <v-tooltip bottom :open-delay="500">
        <template v-slot:activator="{on, attrs}">
          <v-btn icon @click="loadData" v-on="on" v-bind="attrs">
            <v-icon>mdi-upload</v-icon>
          </v-btn>
        </template>
        <span>Load</span>
      </v-tooltip>

      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-on="on" v-bind="attrs" icon>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title v-if="editing">Edit an item</v-card-title>
          <v-card-title v-else>Add an item</v-card-title>
          <v-card-text>
            <v-container>
              <v-text-field outlined label="Title" required v-model="title" />
              <v-text-field outlined label="Chapter" type="number" required v-model="chapter" />
              <v-text-field outlined label="Link" required v-model="link" />
              <v-checkbox v-if="editing" v-model="editImage" checked label="Change Image" />
              <v-file-input
                outlined
                label="Image"
                accept="image/*"
                v-model="imageInput"
                prepend-icon="mdi-camera"
                :disabled="!editImage"
              ></v-file-input>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="okClick" text>OK</v-btn>
            <v-btn @click="cancelClick" text>Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>

    <v-main>
      <v-container class="d-flex flex-wrap justify-center">
        <p v-if="this.$store.state.cards.length === 0">You have no mangas added. Add one with the + button in the toolbar.</p>
        <v-card
          class="ma-2"
          v-for="card in this.$store.state.cards"
          v-bind:key="card.id"
          width="300px"
        >
          <v-card-title>{{ card.title }}</v-card-title>
          <v-card-text class="pa-0">
            <v-container class="pa-0">
              <v-container class="px-4 pt-0">Chapter: {{ card.chapter }}</v-container>

              <v-img :src="card.image" height="400px" />
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn icon @click="changeChapByOne(card.id, true)">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn icon @click="changeChapByOne(card.id, false)">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <v-menu>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-on="on" v-bind="attrs">
                  <v-icon>mdi-dots-horizontal</v-icon>
                </v-btn>
              </template>

              <v-list dense>
                <v-list-item @click="editCard(card.id)">
                  <v-list-item-icon>
                    <v-icon>mdi-pencil</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Edit</v-list-item-title>
                </v-list-item>
                <v-list-item @click="removeCard(card.id)">
                  <v-list-item-icon>
                    <v-icon>mdi-delete</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Delete</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-spacer />
            <v-btn :href="card.link" text>Go</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
const Compress = require("client-compress");
const compress = new Compress({
  targetSize: 0.2,
  maxWidth: 500,
  maxHeight: 800,
});

export default {
  name: "App",

  data: () => ({
    dialog: false,
    editing: false,
    editImage: true,
    editingId: null,
    title: "",
    chapter: null,
    link: "",
    imageInput: null,
  }),

  methods: {
    okClick() {
      // Close the dialog
      this.dialog = false;

      // Initialize a FileReader for reading the image Blob
      var fr = new FileReader();

      var newData = {};

      // If editingId is null, then we are not editing, else we are creating
      if (!this.editing) {
        // Set new card data
        newData = {
          title: this.title,
          chapter: parseInt(this.chapter),
          link: this.link,
        };
      } else {
        // Set edited card data
        newData = {
          ...this.$store.state.cards[this.editingId],
          title: this.title,
          chapter: parseInt(this.chapter),
          link: this.link,
        };
      }

      // Compress input image from dialog
      if (this.editImage) {
        compress.compress([this.imageInput]).then((c) => {
          // Reading the compressed image Blob as DataURL
          fr.onloadend = () => {
            // If "Edit Image" is checked, then set the image in the edited data
            newData.image = fr.result;

            if (this.editing) {
              // Push edited info to the card with set id
              this.$store.commit("editCard", {
                id: this.editingId,
                newData: newData,
              });
            } else {
              // Push new card data to the database
              this.$store.commit("addCard", newData);
            }

            // Reset editingId to null, we are done editing.
            this.editing = false;
            this.editImage = true;
            this.editingId = null;
            // Set everything back to default
            this.title = "";
            this.chapter = null;
            this.link = "";
            this.imageInput = null;
          };
          fr.readAsDataURL(c[0].photo.data);
        });
      } else {
        if (this.editing) {
          // Push edited info to the card with set id
          this.$store.commit("editCard", {
            id: this.editingId,
            newData: newData,
          });
        }

        // Reset editingId to null, we are done editing.
        this.editing = false;
        this.editImage = true;
        this.editingId = null;
        // Set everything back to default
        this.title = "";
        this.chapter = null;
        this.link = "";
        this.imageInput = null;
      } 
    },

    cancelClick() {
      this.dialog = false;
      this.editing = false;
      this.editImage = true;
      this.editingId = null;
      this.title = "";
      this.chapter = null;
      this.link = "";
      this.imageInput = null;
    },

    changeChapByOne(id, positiveDirection) {
      var amount = -1;
      if (positiveDirection) amount = 1;

      var newData = {
        chapter: this.$store.state.cards[id].chapter + amount,
      };

      this.$store.commit("editCard", {
        id: id,
        newData: newData,
      });
    },

    editCard(id) {
      this.editingId = id;
      this.editImage = false;
      this.editing = true;
      this.title = this.$store.state.cards[id].title;
      this.chapter = this.$store.state.cards[id].chapter;
      this.link = this.$store.state.cards[id].link;
      this.dialog = true;
    },

    removeCard(id) {
      this.$store.commit("removeCard", id);
    },

    saveData() {
      this.$store.commit("saveData");
    },

    loadData() {
      this.$store.commit("loadData");
    },
  },
};
</script>
