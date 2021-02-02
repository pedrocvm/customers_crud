<template>
  <div class="dialogEditWrapper">
    <v-dialog
      v-model="isOpenValue"
      max-width="700px"
      persistent
      dark
      class="mainDialogEdit"
    >
      <v-card class="formCardWrapper">
        <v-card-title>
          <v-icon>{{ formItems.icon }}</v-icon>
          <span class="headline ml-2">{{
            isEdit ? formItems.titleEdit : formItems.titleAdd
          }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <div class="formEditWrapper">
              <div class="inputProp">
                <div class="idWrapper">
                  <v-text-field
                    v-model="nameValue"
                    :error-messages="nameErrors"
                    label="Name"
                    required
                    outlined
                    dark
                    class="mr-10"
                    append-icon="mdi-account-circle"
                    @input="$v.name.$touch()"
                    @blur="$v.name.$touch()"
                  ></v-text-field>

                  <v-text-field
                    v-model="cpfValue"
                    :error-messages="cpfErrors"
                    label="CPF"
                    required
                    dark
                    outlined
                    v-mask="'###.###.###-##'"
                    append-icon="mdi-credit-card"
                    @input="$v.cpf.$touch()"
                    @blur="$v.cpf.$touch()"
                  ></v-text-field>
                </div>
              </div>

              <div class="inputProp">
                <div class="dependentWrapper">
                  <v-text-field
                    v-model="ageValue"
                    :error-messages="ageErrors"
                    label="Age"
                    required
                    outlined
                    dark
                    class="mr-10"
                    append-icon="mdi-numeric"
                    @input="$v.age.$touch()"
                    @blur="$v.age.$touch()"
                  ></v-text-field>

                  <v-select
                    :menu-props="{ dark: true }"
                    :items="typeItems"
                    v-model="typeValue"
                    label="Type"
                    outlined
                    required
                    :error-messages="typeErrors"
                    append-icon="mdi-account-multiple"
                    @input="$v.type.$touch()"
                  >
                  </v-select>
                </div>
              </div>
            </div>
          </v-container>
        </v-card-text>

        <v-card-actions class="pb-5" style="margin-top: -40px">
          <v-spacer></v-spacer>

          <v-btn
            outlined
            color="#0f0"
            class="ma-2"
            @click.stop="isEdit ? save('edit', {}) : save('add', {})"
            :disabled="isEdit ? $v.$anyError : $v.$invalid"
          >
            <span>
              Save
            </span>

            <template v-slot:loader dark>
              <span class="custom-loader">
                <v-icon light>mdi-cached</v-icon>
              </span>
            </template>
          </v-btn>
          <v-btn
            outlined
            color="#f00"
            dark
            class="ma-2"
            @click.stop="
              isEdit ? close('edit', 'close') : close('add', 'close')
            "
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- DELETE DIALOG -->
    <v-dialog v-model="isDelete" max-width="600px" persistent dark>
      <v-card class="pt-3 pb-3">
        <v-card-title class="headline">
          {{
            target === 'customers'
              ? 'Are you sure you want to delete this Customer?'
              : 'Are you sure you want to delete this Dependent?'
          }}
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            outlined
            color="#0f0"
            class="ma-2"
            @click.stop="
              target === 'customers'
                ? save('delete', currentCustomer)
                : save('delete', currentDependent)
            "
          >
            Confirm
          </v-btn>
          <v-btn
            dark
            outlined
            color="#f00"
            class="ma-2"
            @click.stop="handleDialog('delete', 'close')"
          >
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="afterAction" max-width="500px" persistent dark>
      <v-card class="pt-3 pb-3">
        <v-card-title
          class="headline"
          style="display:flex;justify-content:center"
        >
          {{
            this.target === 'customers'
              ? 'Customer successfully deleted.'
              : 'Dependent successfully deleted.'
          }}
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            dark
            outlined
            color="#0f0"
            class="ma-2"
            @click.stop="afterAction = false"
          >
            Ok
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { validationMixin } from 'vuelidate';
import {
  required,
  minValue,
  maxValue,
  minLength,
} from 'vuelidate/lib/validators';

export default {
  mixins: [validationMixin],

  validations: {
    name: { required },
    cpf: { required, minLength: minLength(14) },
    age: { required, minValue: minValue(0), maxValue: maxValue(200) },
    type: { required },
  },
  props: ['isDelete', 'handleItem', 'handleDialog'],
  data() {
    return {
      afterAction: false,
      isOpen: false,
      name: '',
      cpf: '',
      age: '',
      type: '',
      typeItems: [
        'Husband',
        'Wife',
        'Son',
        'Daughter',
        'Father',
        'Mother',
        'Brother',
        'Sister',
        'Grandfather',
        'Grandmother',
        'Grandson',
        'Grand daughter',
      ],
    };
  },
  computed: {
    ...mapState({
      currentDependent: (state) => state.currentDependent,
      currentCustomer: (state) => state.currentCustomer,
      isEdit: (state) => state.isEdit,
      isAdd: (state) => state.isAdd,
      target: (state) => state.target,
    }),
    formItems() {
      return {
        titleEdit: 'Edit Dependent',

        titleAdd: 'Add Dependent',

        icon: this.isEdit ? 'mdi-pencil' : 'mdi-plus',
      };
    },
    isOpenValue: {
      get() {
        if (this.isAdd) {
          this.isOpen = this.isAdd;
          return this.isOpen;
        } else {
          if(this.target === 'customers'){
            return this.isOpen = false;
          }
          this.isOpen = this.isEdit;
          return this.isOpen;
        }
      },
      set(value) {
        this.isOpen = value;
      },
    },
    nameValue: {
      get() {
        if (this.isEdit) {
          return this.currentDependent.name;
        } else {
          return this.name;
        }
      },
      set(newName) {
        this.name = newName;
      },
    },
    cpfValue: {
      get() {
        if (this.isEdit) {
          return this.currentDependent.cpf;
        } else {
          return this.cpf;
        }
      },
      set(newCpf) {
        this.cpf = newCpf;
      },
    },
    ageValue: {
      get() {
        if (this.isEdit) {
          return this.currentDependent.age;
        } else {
          return this.age;
        }
      },
      set(newAge) {
        this.age = newAge;
      },
    },
    typeValue: {
      get() {
        if (this.isEdit) {
          return this.currentDependent.type;
        } else {
          return this.type;
        }
      },
      set(newType) {
        this.type = newType;
      },
    },

    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push('Name is required.');
      return errors;
    },
    cpfErrors() {
      const errors = [];
      if (!this.$v.cpf.$dirty) return errors;
      !this.$v.cpf.required && errors.push('CPF is required.');
      !this.$v.cpf.minLength &&
        errors.push('CPF must be at min 14 characters long');

      return errors;
    },
    ageErrors() {
      const errors = [];
      if (!this.$v.age.$dirty) return errors;
      !this.$v.age.minValue && errors.push('Please enter a valid age.');
      !this.$v.age.maxValue &&
        errors.push('No one is that old! Please enter a valid age.');
      !this.$v.age.required && errors.push('Age is required.');
      return errors;
    },
    typeErrors() {
      const errors = [];
      if (!this.$v.type.$dirty) return errors;
      !this.$v.type.required && errors.push('Type is required.');
      return errors;
    },
  },
  methods: {
    save(action, value) {
      this.$v.$touch();

      switch (action) {
        case 'edit':
          const dependentUpdated = Object.assign({}, this.currentDependent);

          dependentUpdated.name = this.name || this.currentDependent.name;
          dependentUpdated.cpf = this.cpf || this.currentDependent.cpf;
          dependentUpdated.age = this.age || this.currentDependent.age;
          dependentUpdated.type = this.type || this.currentDependent.type;

          value = dependentUpdated;
          break;

        case 'add':
          const newDependent = {
            name: this.name,
            cpf: this.cpf,
            age: this.age,
            type: this.type,
          };

          value = newDependent;
          break;

        default:
          break;
      }

      this.handleItem(action, value);
      this.clear(false);
      if (action === 'delete') {
        setTimeout(() => {
          this.afterAction = true;
        }, 500);
      }
    },
    close(action, behavior) {
      this.handleDialog(action, behavior);
      this.clear(false);
    },
    clear(isTouched) {
      this.$v.$reset();
      this.name = '';
      this.cpf = '';
      this.age = '';
      this.type = '';
      isTouched && this.$v.$touch();
    },
  },
};
</script>

<style lang="scss">
@import 'src/sass/master.scss';
</style>
