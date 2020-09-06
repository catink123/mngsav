<template>
  <v-card class="ma-2" width="300px">
    <v-img
      gradient="to bottom, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, .1) 30%, rgba(0, 0, 0, 0)"
      :src="image"
      height="450px"
      cover
    >
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>Position: {{ volume }} - {{ chapter }}</v-card-text>
    </v-img>

    <v-card-actions>
      <v-btn icon @click="changeByOne(id, true, false)">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn icon @click="changeByOne(id, false, false)">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-menu>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-on="on" v-bind="attrs">
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </template>

        <v-list dense>
          <v-list-item @click="editCard(id)">
            <v-list-item-icon>
              <v-icon>mdi-pencil</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Edit</v-list-item-title>
          </v-list-item>
          <v-list-item @click="removeCard(id)">
            <v-list-item-icon>
              <v-icon>mdi-delete</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Delete</v-list-item-title>
          </v-list-item>
          <v-list-item @click="changeByOne(id, true, true)">
            <v-list-item-icon>
              <v-icon>mdi-book-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>+1 to volume</v-list-item-title>
          </v-list-item>
          <v-list-item @click="changeByOne(id, false, true)">
            <v-list-item-icon>
              <v-icon>mdi-book-minus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>-1 from volume</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-spacer />
      <v-btn :href="link" text>Go</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Card',
  props: {
    id: Number,
    title: String,
    volume: Number,
    chapter: Number,
    link: String,
    image: Image
  }
}
</script>