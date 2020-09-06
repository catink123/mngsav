<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Manga Saver</v-toolbar-title>

      <v-spacer></v-spacer>

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
            <v-container class="mt-2 pa-0">
              <v-text-field outlined label="Title" required v-model="title" />
              <v-row>
                <v-text-field
                  class="mx-3"
                  outlined
                  label="Volume"
                  type="number"
                  required
                  v-model="volume"
                />
                <v-text-field
                  class="mx-3"
                  outlined
                  label="Chapter"
                  type="number"
                  required
                  v-model="chapter"
                />
              </v-row>
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

      <v-menu>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-on="on" v-bind="attrs">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list dense>
                <v-list-item @click="saveData">
                  <v-list-item-icon><v-icon>mdi-download</v-icon></v-list-item-icon>
                  <v-list-item-title>Save data</v-list-item-title>
                </v-list-item>

                <v-list-item @click="loadData">
                  <v-list-item-icon><v-icon>mdi-upload</v-icon></v-list-item-icon>
                  <v-list-item-title>Load data</v-list-item-title>
                </v-list-item>

                <v-list-item @click="saveDataToFile">
                  <v-list-item-icon><v-icon>mdi-file-download</v-icon></v-list-item-icon>
                  <v-list-item-title>Save data to file</v-list-item-title>
                </v-list-item>

                <v-list-item @click="loadDataFromFile">
                  <v-list-item-icon><v-icon>mdi-file-upload</v-icon></v-list-item-icon>
                  <v-list-item-title>Load data from file</v-list-item-title>
                </v-list-item>
              </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container class="d-flex flex-wrap justify-center" fluid>
        <p
          v-if="this.$store.state.cards.length === 0"
        >You have no mangas added. Add one with the + button in the toolbar.</p>
        <v-card
          class="ma-2"
          v-for="card in this.$store.state.cards"
          v-bind:key="card.id"
          width="300px"
        >
          <v-img
            gradient="to bottom, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, .1) 30%, rgba(0, 0, 0, 0)"
            :src="card.image"
            height="450px"
            cover
          >
            <v-card-title>{{ card.title }}</v-card-title>
            <v-card-text>Position: {{ card.volume }} - {{ card.chapter }}</v-card-text>
          </v-img>

          <v-card-actions>
            <v-btn icon @click="changeByOne(card.id, true, false)">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn icon @click="changeByOne(card.id, false, false)">
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
                <v-list-item @click="changeByOne(card.id, true, true)">
                  <v-list-item-icon>
                    <v-icon>mdi-book-plus</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>+1 to volume</v-list-item-title>
                </v-list-item>
                <v-list-item @click="changeByOne(card.id, false, true)">
                  <v-list-item-icon>
                    <v-icon>mdi-book-minus</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>-1 from volume</v-list-item-title>
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
// For loading and saving data from and to a file
const fileDialog = require("file-dialog");
const FileSaver = require("file-saver");

// For compressing an image when importing
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
    volume: null,
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
          volume: parseInt(this.volume),
          chapter: parseInt(this.chapter),
          link: this.link,
        };
      } else {
        // Set edited card data
        newData = {
          ...this.$store.state.cards[this.editingId],
          title: this.title,
          volume: parseInt(this.volume),
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
            this.volume = null;
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
        this.volume = null;
        this.chapter = null;
        this.link = "";
        this.imageInput = null;
      }
    },

    // Set everything to default when 'Cancel' button is clicked in the dialog
    cancelClick() {
      this.dialog = false;
      this.editing = false;
      this.editImage = true;
      this.editingId = null;
      this.title = "";
      this.volume = null;
      this.chapter = null;
      this.link = "";
      this.imageInput = null;
    },

    // Change volume or chapter by one (for + and - buttons)
    changeByOne(id, positiveDirection, changeVolume) {
      var amount = -1;
      if (positiveDirection) amount = 1;

      var newData;

      if (!changeVolume)
        newData = {
          chapter: this.$store.state.cards[id].chapter + amount,
        };
      else
        newData = {
          volume: this.$store.state.cards[id].volume + amount,
        };

      // Send newData to the store for it to change the values
      this.$store.commit("editCard", {
        id: id,
        newData: newData,
      });
    },

    editCard(id) {
      // Set the editingId to the card id where the 'Edit' button was clicked
      this.editingId = id;

      // Fill the dialog inputs with data from a card with set id
      this.editImage = false;
      this.editing = true;
      this.title = this.$store.state.cards[id].title;
      this.volume = this.$store.state.cards[id].volume;
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

    saveDataToFile() {
      // Convert the cards object in the store to JSON string and save (download) it
      var savefile = new File([JSON.stringify(this.$store.state.cards)], "MangaSaver_DataFile.json", {type: 'text/plain;charset=utf-8'});
      FileSaver.saveAs(savefile);
    },

    loadDataFromFile() {
      // Open a file dialog to choose a data file
      fileDialog()
        .then(file => {
          // Parse JSON data and send to the store
          file[0].text().then(text => {
            this.$store.commit("loadDataFromObject", JSON.parse(text));
          })
        })
    }
  },
};
</script>
