<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      dark
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-if='currentCustomer._id'
          color="#ff7b00"
          outlined
          v-bind="attrs"
          v-on="on"
          @click="manageDependents()"
        >
          Manage Dependents
        </v-btn>
      </template>

      <v-card>
        <v-toolbar dark class="dialogHeader">
          <v-btn icon dark @click="close()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Dependents Management</v-toolbar-title>
        </v-toolbar>
        <div class="dialogContentWrapper">
          <Table target="dependents" />
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import Table from '@/components/Table';
export default {
  components: { Table },
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
    };
  },
  computed: {
    ...mapState({
      target: (state) => state.target,
      currentCustomer: (state) => state.currentCustomer,
    }),
  },
  methods: {
    ...mapActions([
      'changeTarget',
      'changeIsEdit',
      'changeIsAdd',
      'changeCurrentCustomer',
    ]),
    manageDependents() {
      this.changeTarget('dependents');
      this.changeIsAdd(false);
      this.changeIsEdit(false);
    },
    close() {
      this.dialog = false;
      this.changeTarget('customers');
      if(this.currentCustomer){
        this.changeCurrentCustomer(this.currentCustomer);
      }
      this.changeIsEdit(true);
    },
  },
};
</script>
<style lang="scss"></style>
