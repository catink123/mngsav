<template>
  <v-app>
    <v-snackbar v-model="showUpdateUI">
      A new update was found! Please reload to update.
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="onUpdateClick">Reload</v-btn>
      </template>
    </v-snackbar>
    <v-app-bar app dark>
      <v-toolbar-title>Manga Saver</v-toolbar-title>

      <v-progress-linear indeterminate absolute bottom :active="loading" />

      <v-spacer></v-spacer>

      <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
        :fullscreen="mobile"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-on="on" v-bind="attrs" icon>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-card :tile="mobile">
          <v-card-title v-if="editing">Edit an item</v-card-title>
          <v-card-title v-else>Add an item</v-card-title>
          <v-card-text class="pb-0">
            <v-form v-model="isDialogValid">
              <v-container class="mt-2 pa-0">
                <v-text-field
                  outlined
                  label="Title"
                  required
                  v-model="title"
                  :rules="
                    editing ? undefined : [(v) => !!v || 'Title is required']
                  "
                />
                <v-row>
                  <v-text-field
                    class="mx-3"
                    outlined
                    label="Volume"
                    type="number"
                    required
                    :rules="
                      editing
                        ? undefined
                        : [(v) => !!v || 'Volume number is required']
                    "
                    v-model="volume"
                  />
                  <v-text-field
                    class="mx-3"
                    outlined
                    label="Chapter"
                    type="number"
                    required
                    :rules="
                      editing
                        ? undefined
                        : [(v) => !!v || 'Chapter number is required']
                    "
                    v-model="chapter"
                  />
                </v-row>
                <v-text-field outlined label="Link" required v-model="link" />
                <v-checkbox
                  v-if="editing"
                  v-model="isEditingImage"
                  checked
                  label="Change Image"
                />
                <v-file-input
                  outlined
                  label="Image"
                  accept="image/*"
                  v-model="imageInput"
                  prepend-icon="mdi-image"
                  :disabled="!isEditingImage"
                  :required="isEditingImage"
                  :rules="
                    editing ? undefined : [(v) => !!v || 'Image is required']
                  "
                ></v-file-input>
                <v-checkbox
                  v-if="editing"
                  v-model="isEditingSection"
                  checked
                  label="Change Section"
                />
                <v-select
                  label="Section"
                  class="ma-0"
                  v-model="section"
                  :items="sectionSelect"
                  outlined
                  :disabled="!isEditingSection"
                  :rules="
                    editing
                      ? undefined
                      : [(v) => !!v || v === 0 || 'Section is required']
                  "
                  :required="isEditingSection"
                />
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="okClick" text :disabled="!isDialogValid">OK</v-btn>
            <v-btn @click="cancelClick" text>Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="sectionDialog" persistent max-width="600px">
        <v-card>
          <v-card-title v-if="!editing">Add a Section</v-card-title>
          <v-card-title v-else>Edit a Section</v-card-title>

          <v-card-text class="pb-0">
            <v-form v-model="isSectionDialogValid">
              <v-container class="mt-2 pa-0">
                <v-text-field
                  class="ma-0"
                  label="Name"
                  v-model="sectionName"
                  outlined
                  required
                  :rules="[(v) => !!v || 'Section name is required']"
                />
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              @click="sectionOkClick"
              text
              :disabled="!isSectionDialogValid"
              >OK</v-btn
            >
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

          <v-list-item @click="editSection(currentSection - 1)">
            <v-list-item-icon>
              <v-icon>mdi-pencil</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Edit active Section</v-list-item-title>
          </v-list-item>

          <v-list-item @click="removeSection(currentSection - 1)">
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
      <v-tabs
        color="amber darken-4"
        v-model="currentSection"
        centered
        :vertical="tabOrientation"
        show-arrows
        center-active
      >
        <v-tab
          v-for="section in this.$store.getters.sections"
          v-bind:key="section.id"
          class="ma-0"
          :class="tabOrientation ? 'mw-50' : null"
        >
          <v-icon v-if="section.name === 'Favourited'">mdi-star</v-icon>
          {{ section.name !== 'Favourited' ? section.name : null }}
        </v-tab>

        <v-tabs-items v-model="currentSection">
          <v-tab-item
            v-for="section in this.$store.getters.sections"
            v-bind:key="section.id"
          >
            <v-container
              class="d-flex flex-wrap justify-center ma-0 pa-0"
              fluid
              v-if="section.name !== 'Favourited'"
            >
              <p class="mt-4 mx-4" v-if="section.cards.length === 0">
                You have no mangas added. Add one with the + button in the
                toolbar.
              </p>
              <card
                v-for="card in section.cards"
                v-bind:key="card.id"
                :id="parseInt(card.id)"
                :title="card.title"
                :volume="card.volume"
                :chapter="card.chapter"
                :image="card.image"
                :link="card.link"
                :section="parseInt(section.id)"
                :favourited="card.favourited"
                :editCard="editCard"
              />
            </v-container>

            <v-container
              class="d-flex flex-wrap justify-center ma-0 pa-0"
              fluid
              v-else
            >
              <p class="mt-4 mx-4" v-if="section.cards.length === 0">
                You have no mangas favourited. Favourite one with the ★ button
                on a card.
              </p>
              <card
                v-for="card in section.cards"
                v-bind:key="card.title"
                :id="parseInt(card.id)"
                :title="card.title"
                :volume="card.volume"
                :chapter="card.chapter"
                :image="card.image"
                :link="card.link"
                :section="parseInt(findSectionIDByName(card.section))"
                :favourited="card.favourited"
                :editCard="editCard"
              />
            </v-container>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import Card from "./components/Card.vue";

// For loading and saving data from and to a file
const fileDialog = require("file-dialog");
const FileSaver = require("file-saver");

const Compress = require("compress.js");
const compress = new Compress();

export default {
  name: "App",

  components: { Card },

  created() {
    if (this.$workbox) {
      this.$workbox.addEventListener("waiting", () => {
        this.showUpdateUI = true;
      });
    }
  },

  data: () => ({
    dialog: false,
    isDialogValid: false,
    editing: false,
    isEditingImage: true,
    editingId: null,
    title: "",
    volume: null,
    chapter: null,
    link: "",
    imageInput: null,
    section: null,
    currentSection: 0,
    isEditingSection: true,

    // For section dialog
    sectionDialog: false,
    isSectionDialogValid: false,
    sectionName: null,
    showUpdateUI: false,
  }),

  computed: {
    ...mapGetters(["sectionSelect", "loading"]),

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

    tabOrientation() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return null;
        default:
          return true;
      }
    },

    mobile() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return true;
        default:
          return false;
      }
    },
  },

  methods: {
    async onUpdateClick() {
      this.showUpdateUI = false;
      await this.$workbox.messageSW({ type: "SKIP_WAITING" });
    },

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
      if (this.isEditingImage) {
        compress
          .compress([this.imageInput], {
            size: 0.1,
            quality: 0.75,
            maxWidth: 500,
            maxHeight: 500,
          })
          .then((c) => {
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

    editCard(section, id) {
      // Set the editingId to the card id where the 'Edit' button was clicked
      this.editingId = id;

      // Fill the dialog inputs with data from a card with set id
      this.isEditingImage = false;
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

    // Set dialog inputs to default values
    setDefaults() {
      this.dialog = false;
      this.editing = false;
      this.isEditingImage = true;
      this.editingId = null;
      this.title = "";
      this.volume = null;
      this.chapter = null;
      this.link = "";
      this.imageInput = null;
      this.section = null;
      this.isEditingSection = true;

      // For section dialog
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
      this.$store.commit("fixIDs");
    },

    findSectionIDByName(sectionName) {
      var sect = this.$store.state.data.find(value => {
        if (value.name == sectionName) {
          return true;
        }
      });
      return sect.id;
    },
  },
};
</script>

<style scoped>
.nobg {
  background: transparent;
}

.mw-50 {
  min-width: 50px;
}
</style>