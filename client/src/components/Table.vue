<template>
  <div>
    <EditDialog
      :isDelete="isDeleteDialogOpen"
      :handleDialog="handleDialog"
      :handleItem="handleCurrentItem"
      class="dialogComponent"
    />
    <div class="actionContainer">
      <v-text-field
        v-model="search"
        dark
        class="searchInput"
        outlined
        dense
        append-icon="mdi-magnify"
        label="Search"
        hide-details
      ></v-text-field>
      <v-btn
        v-if="handleAddButton()"
        color="#ff7b00"
        outlined
        class="addDependentBtn"
        @click="handleAddButtonBehavior"
      >
        {{ this.target === 'customers' ? 'Add Customer' : 'Add Dependent' }}
      </v-btn>
    </div>
    <v-data-table
      dark
      :headers="headers"
      :items="items"
      :search="search"
      :items-per-page="itemsPerPage"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-menu
          dark
          origin="center center"
          transition="scale-transition"
          class="actionMenu"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item class="actionItem">
              <v-btn text @click="editItem(item)">
                <v-icon>mdi-pencil</v-icon>
                Edit
              </v-btn>
            </v-list-item>
            <v-list-item class="actionItem">
              <v-btn text @click="deleteItem(item)">
                <v-icon color="error">mdi-delete</v-icon>
                Delete
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import EditDialog from '@/components/EditDialog';
import dependentService from '@/services/dependent.service';
import customerService from '@/services/customer.service';
import { mapState, mapActions } from 'vuex';
export default {
  components: { EditDialog },
  props: ['target'],
  data() {
    return {
      headers: [],
      itemsPerPage: 5,
      headers: [],
      items: [],
      search: '',

      isDeleteDialogOpen: false,
    };
  },
  async created() {
    switch (this.target) {
      case 'customers':
        await this.getAllCustomers();
        if (this.allCustomers.length > 0) {
          this.setHeaders();
          this.setItems(this.allCustomers);
        }
        break;

      case 'dependents':
        await this.getAllDependents();
        if (this.allDependents.length > 0) {
          this.setHeaders();
          this.setItems(this.allDependents);
        }
        break;

      default:
        return;
    }
  },
  computed: {
    ...mapState({
      allCustomers: (state) => state.allCustomers,
      allDependents: (state) => state.allDependents,
      currentCustomer: (state) => state.currentCustomer,
      currentDependent: (state) => state.currentDependent,
      isEdit: (state) => state.isEdit,
      isAdd: (state) => state.isAdd,
    }),
  },
  methods: {
    ...mapActions([
      'getAllCustomers',
      'getAllDependents',
      'getCustomer',
      'getDependent',
      'changeCurrentCustomer',
      'changeCurrentDependent',
      'changeIsEdit',
      'changeIsAdd',
    ]),
    setHeaders() {
      switch (this.target) {
        case 'customers':
          this.headers = [
            {
              text: 'Name',
              value: 'name',
            },
            {
              text: 'CPF',
              value: 'cpf',
            },
            {
              text: 'Phone',
              value: 'contact.phone',
              sortable: false,
            },
            {
              text: 'Email',
              value: 'contact.email',
            },
          ];
          break;

        case 'dependents':
          this.headers = [
            {
              text: 'Name',
              value: 'name',
            },
            {
              text: 'CPF',
              value: 'cpf',
            },
            {
              text: 'Age',
              value: 'age',
              sortable: false,
            },
            {
              text: 'Type',
              value: 'type',
            },
          ];
          break;

        default:
          return;
      }

      this.headers.push({
        text: 'Actions',
        value: 'actions',
        sortable: false,
      });
    },
    setItems(data) {
      if (this.target === 'dependents') {
        this.items = data.map((dt) => {
          return {
            _id: dt._id,
            name: this.capitalize(dt.name),
            cpf: dt.cpf,
            age: dt.age,
            type: this.capitalize(dt.type),
            maintainer: dt.maintainer,
          };
        });
        return;
      } else {
        data.forEach((dt) => {
          dt.name = this.capitalize(dt.name);
          if (this.items.length <= data.length) {
            this.items.push(dt);
          }
        });
      }
    },
    handleDialog(action, behavior) {
      if (action === 'add' && behavior === 'open') {
        this.changeIsAdd(true);
      }

      if (action === 'add' && behavior === 'close') {
        this.changeIsAdd(false);
      }

      if (action === 'edit' && behavior === 'open') {
        this.changeIsEdit(true);
      }

      if (action === 'edit' && behavior === 'close') {
        this.changeIsEdit(false);
      }

      if (action === 'delete' && behavior === 'open') {
        this.isDeleteDialogOpen = true;
      }

      if (action === 'delete' && behavior === 'close') {
        this.isDeleteDialogOpen = false;
      }
    },
    addItem() {
      this.handleDialog('add', 'open');
    },
    editItem(item) {
      if (this.target === 'customers') {
        this.$router.replace({ name: 'Register' });
        this.changeCurrentCustomer(item);
      } else {
        this.changeCurrentDependent(item);
      }

      this.handleDialog('edit', 'open');
    },
    deleteItem(item) {
      this.target === 'customers'
        ? this.changeCurrentCustomer(item)
        : this.changeCurrentDependent(item);

      this.handleDialog('delete', 'open');
    },
    async handleCurrentItem(action, item) {
      let index;
      switch (this.target) {
        case 'customers':
          await this.getCustomer(item._id);
          switch (action) {
            case 'delete':
              await customerService.deleteCustomer(item._id);
              index = this.items.findIndex(
                (customer) => customer._id === this.currentCustomer._id
              );

              this.items.splice(index, 1);
              this.handleDialog('delete', 'close');
              break;

            default:
              return;
          }
          break;

        case 'dependents':
          switch (action) {
            case 'add':
              const newDependent = await dependentService.createDependent(
                this.currentCustomer._id,
                item
              );

              this.items = [...this.items, newDependent];
              this.setHeaders()
              this.setItems(this.items);

              this.handleDialog('add', 'close');
              break;

            case 'edit':
              await dependentService.updateDependent(
                item.maintainer,
                item._id,
                item
              );
              index = this.items.findIndex(
                (dependent) => dependent._id === item._id
              );
              this.items[index] = item;
              this.setItems(this.items);
              this.handleDialog('edit', 'close');
              break;

            case 'delete':
              await dependentService.deleteDependent(item.maintainer, item._id);
              index = this.items.findIndex(
                (item) => item._id === this.currentDependent._id
              );
              this.items.splice(index, 1);
              this.handleDialog('delete', 'close');
              break;

            default:
              break;
          }
          break;

        default:
          return;
      }
    },
    capitalize(value) {
      if (!value) return '';
      return value.toLowerCase().replace(/(?:^|\s)\S/g, (text) => {
        return text.toUpperCase();
      });
    },
    handleAddButton() {
      if (this.target === 'dependents') {
        if (this.currentCustomer._id) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
    handleAddButtonBehavior() {
      if(this.target === 'customers'){
        this.changeCurrentCustomer({})
        this.changeIsEdit(false)
        return this.$router.replace({ name: 'Register' })
      }
      
      this.addItem('add', 'open');
    },
  },
};
</script>
<style lang="scss">
@import 'src/sass/master.scss';
</style>
