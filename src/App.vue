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
                prepend-icon="mdi-image"
                :disabled="!editImage"
              ></v-file-input>
              <v-checkbox v-if="editing" v-model="isEditingSection" checked label="Change Section" />
              <v-select
                label="Section"
                class="ma-0"
                v-model="section"
                :items="sectionList"
                outlined
                :disabled="!isEditingSection"
              />
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="okClick" text>OK</v-btn>
            <v-btn @click="cancelClick" text>Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="sectionDialog" persistent max-width="600px">
        <v-card>
          <v-card-title v-if="!editing">Add a Section</v-card-title>
          <v-card-title v-else>Edit a Section</v-card-title>

          <v-card-text>
            <v-container>
              <v-text-field label="Name" v-model="sectionName" outlined />
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn @click="sectionOkClick" text>OK</v-btn>
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

          <v-list-item @click="sectionDialog = true">
            <v-list-item-icon>
              <v-icon>mdi-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Add a Section</v-list-item-title>
          </v-list-item>

          <v-list-item @click="editSection(currentSection)">
            <v-list-item-icon>
              <v-icon>mdi-pencil</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Edit active Section</v-list-item-title>
          </v-list-item>

          <v-list-item @click="removeSection(currentSection)">
            <v-list-item-icon>
              <v-icon>mdi-delete</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Remove active Section</v-list-item-title>
          </v-list-item>

          <v-list-item @click="saveData">
            <v-list-item-icon>
              <v-icon>mdi-download</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Save data</v-list-item-title>
          </v-list-item>

          <v-list-item @click="loadData">
            <v-list-item-icon>
              <v-icon>mdi-upload</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Load data</v-list-item-title>
          </v-list-item>

          <v-list-item @click="saveDataToFile">
            <v-list-item-icon>
              <v-icon>mdi-file-download</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Save data to file</v-list-item-title>
          </v-list-item>

          <v-list-item @click="loadDataFromFile">
            <v-list-item-icon>
              <v-icon>mdi-file-upload</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Load data from file</v-list-item-title>
          </v-list-item>

          <v-list-item @click="debugClick">
            <v-list-item-icon>
              <v-icon>mdi-bug</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Fix IDs (if something broke)</v-list-item-title>
          </v-list-item>

        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-tabs color="amber darken-4" v-model="currentSection" centered :vertical="tabOrientation">
        <v-tab v-for="section in this.$store.state.data" v-bind:key="section.id">{{ section.name }}</v-tab>

        <v-tabs-items v-model="currentSection">
          <v-tab-item v-for="section in this.$store.state.data" v-bind:key="section.id">
            <v-container class="d-flex flex-wrap justify-center ma-0 pa-0" fluid>
              <p
                class="mt-4"
                v-if="section.cards.length === 0"
              >You have no mangas added. Add one with the + button in the toolbar.</p>
              <v-card class="ma-2 gradient" v-for="card in section.cards" v-bind:key="card.id" :width="cardWidth" :href="card.link" :img="card.image">
                <v-img
                  :gradient="cardGradient"
                  :height="cardHeight"
                  cover
                >
                  <v-card-title>{{ card.title }}</v-card-title>
                  <v-card-text>Position: {{ card.volume }} - {{ card.chapter }}</v-card-text>
                </v-img>

                <v-card-actions class="cardActionsGrad">
                  <v-btn icon @click.prevent="changeByOne(section.id, card.id, true, false)" @mousedown.stop @touchstart.stop>
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <v-btn icon @click.prevent="changeByOne(section.id, card.id, false, false)" @mousedown.stop @touchstart.stop>
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                  <v-spacer />
                  <v-menu>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn class="ml-2" icon v-on="on" v-bind="attrs" @click.prevent @mousedown.stop @touchstart.stop>
                        <v-icon>mdi-dots-horizontal</v-icon>
                      </v-btn>
                    </template>

                    <v-list dense>
                      <v-list-item @click="editCard(section.id, card.id)">
                        <v-list-item-icon>
                          <v-icon>mdi-pencil</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Edit</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="removeCard(section.id, card.id)">
                        <v-list-item-icon>
                          <v-icon>mdi-delete</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Delete</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="changeByOne(section.id, card.id, true, true)">
                        <v-list-item-icon>
                          <v-icon>mdi-book-plus</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>+1 to volume</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="changeByOne(section.id, card.id, false, true)">
                        <v-list-item-icon>
                          <v-icon>mdi-book-minus</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>-1 from volume</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-card-actions>
              </v-card>
            </v-container>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

// For loading and saving data from and to a file
const fileDialog = require("file-dialog");
const FileSaver = require("file-saver");

const Compress = require("compress.js");
const compress = new Compress();

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
    section: null,
    currentSection: 0,
    isEditingSection: true,

    sectionDialog: false,
    sectionName: null,
  }),

  computed: {
    ...mapGetters(["sectionList"]),

    cardWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '195px'
        default: return '300px'
      }
    },

    cardHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '250px'
        default: return '450px'
      }
    },
    
    cardGradient() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return "to bottom, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, .1) 40%, rgba(0, 0, 0, 0)"
        default: return "to bottom, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, .1) 30%, rgba(0, 0, 0, 0)"
      }
    },

    tabOrientation() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return null
        default: return true
      }
    }
  },

  methods: {
    okClick() {
      // Close the dialog
      this.dialog = false;

      // Initialize a FileReader for reading the image Blob
      // var fr = new FileReader();

      var newData = {};

      var payload = {};

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

        compress.compress([this.imageInput], {
          size: .1,
          quality: .75,
          maxWidth: 500,
          maxHeight: 500
        }).then((c) => {
            // If "Edit Image" is checked, then set the image in the edited data
            newData.image = c[0].prefix + c[0].data;

            payload.data = newData;
            payload.section = this.section;

            if (this.editing) {
              // Push edited info to the card with set id
              this.$store.commit("editCard", {
                id: this.editingId,
                newData: newData,
                section: this.section,
                changeSection: this.isEditingSection,
              });
            } else {
              // Push new card data to the database
              this.$store.commit("addCard", payload);
            }

            this.setDefaults();
        });
      } else {
        if (this.editing) {
          // Push edited info to the card with set id
          this.$store.commit("editCard", {
            id: this.editingId,
            newData: newData,
            section: this.section,
            currentSection: this.currentSection,
            changeSection: this.isEditingSection,
          });
        }

        this.setDefaults();
      }
    },

    // Set dialog inputs to default values
    setDefaults() {
      this.dialog = false;
      this.editing = false;
      this.editImage = true;
      this.editingId = null;
      this.title = "";
      this.volume = null;
      this.chapter = null;
      this.link = "";
      this.imageInput = null;
      this.section = this.sectionList[0];
      this.isEditingSection = true;

      this.sectionDialog = false;
      this.sectionName = null;
    },

    // Set everything to default when 'Cancel' button is clicked in a dialog
    cancelClick() {
      this.setDefaults();
    },

    sectionOkClick() {
      this.sectionDialog = false;

      if (!this.editing) {
        this.$store.commit("addSection", this.sectionName);
      } else {
        this.$store.commit("editSection", {
          id: this.editingId,
          newName: this.sectionName,
        });
      }

      this.setDefaults();
    },

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

    editCard(section, id) {
      // Set the editingId to the card id where the 'Edit' button was clicked
      this.editingId = id;

      // Fill the dialog inputs with data from a card with set id
      this.editImage = false;
      this.editing = true;
      var card = this.$store.state.data[section].cards[id];
      this.title = card.title;
      this.volume = card.volume;
      this.chapter = card.chapter;
      this.link = card.link;
      this.isEditingSection = false;
      this.section = section;
      this.dialog = true;
    },

    editSection(id) {
      // Set editingId to the section id where 'Edit' was clicked
      this.editingId = id;
      this.editing = true;

      // Fill dialog input with the section name
      this.sectionName = this.$store.state.data[id].name;
      this.sectionDialog = true;
    },

    removeSection(id) {
      this.$store.commit("removeSection", id);
    },

    removeCard(section, id) {
      this.$store.commit("removeCard", {
        id: id,
        section: section,
      });
    },

    saveData() {
      this.$store.commit("saveData");
    },

    loadData() {
      this.$store.commit("loadData");
    },

    saveDataToFile() {
      // Convert the cards object in the store to JSON string and save (download) it
      var savefile = new File(
        [JSON.stringify(this.$store.state.data)],
        "MangaSaver_DataFile.json",
        { type: "text/plain;charset=utf-8" }
      );
      FileSaver.saveAs(savefile);
    },

    loadDataFromFile() {
      // Open a file dialog to choose a data file
      fileDialog().then((file) => {
        // Parse JSON data and send to the store
        file[0].text().then((text) => {
          this.$store.commit("loadDataFromObject", JSON.parse(text));
        });
      });
    },

    debugClick() {
      this.$store.commit("fixIDs")
    }
  },
};
</script>

<style scoped>
.cardActionsGrad {
  background: linear-gradient(to top, rgba(0, 0, 0, .5), rgba(0, 0, 0, 0));
}
</style>