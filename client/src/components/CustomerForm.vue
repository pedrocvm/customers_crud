<template>
  <div class="formContainer">
    <div class="formHeader">
      <div class="backToHome">
        <v-btn
          class="ma-2 backToHomeBtn"
          outlined
          color="#fa1e4e"
          @click="backToHome"
        >
          Back to Home
        </v-btn>
      </div>
      <span class="formTitle">{{
        this.currentCustomer && this.isEdit ? formItems.titleEdit : formItems.titleAdd
      }}</span>
    </div>
    <form>
      <div class="formGroup">
        <v-text-field
          v-model="nameValue"
          :error-messages="nameErrors"
          label="Name"
          required
          outlined
          dark
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

      <div class="formGroup">
        <div class="addressData">
          <v-text-field
            v-model="cepValue"
            @keyup="getAddress"
            :error-messages="cepErrors"
            label="CEP"
            class="smallInput"
            required
            dark
            outlined
            v-mask="'##.###-###'"
            append-icon="mdi-map-marker"
            @input="$v.cep.$touch()"
            @blur="$v.cep.$touch()"
          ></v-text-field>

          <v-text-field
            v-model="publicPlaceValue"
            :error-messages="publicPlaceErrors"
            label="Public Place"
            required
            outlined
            dark
            append-icon="mdi-map"
            @input="$v.publicPlace.$touch()"
            @blur="$v.publicPlace.$touch()"
          ></v-text-field>

          <v-text-field
            v-model="numberValue"
            :error-messages="numberErrors"
            label="Number"
            class="smallInput"
            required
            outlined
            dark
            append-icon="mdi-numeric"
            @input="$v.number.$touch()"
            @blur="$v.number.$touch()"
          ></v-text-field>
        </div>

        <div class="addressData">
          <v-text-field
            v-model="districtValue"
            :error-messages="districtErrors"
            label="District"
            required
            outlined
            dark
            append-icon="mdi-map-marker-multiple"
            @input="$v.district.$touch()"
            @blur="$v.district.$touch()"
          ></v-text-field>

          <v-text-field
            v-model="cityValue"
            :error-messages="cityErrors"
            label="City"
            required
            outlined
            dark
            append-icon="mdi-city"
            @input="$v.city.$touch()"
            @blur="$v.city.$touch()"
          ></v-text-field>

          <v-text-field
            v-model="stateValue"
            :error-messages="stateErrors"
            label="State"
            class="smallInput"
            v-mask="'AA'"
            required
            outlined
            dark
            append-icon="mdi-map-marker-radius"
            @input="$v.state.$touch()"
            @blur="$v.state.$touch()"
          ></v-text-field>
        </div>

        <div class="contactData">
          <v-text-field
            v-model="phoneValue"
            :error-messages="phoneErrors"
            label="Phone"
            required
            dark
            outlined
            v-mask="['(##) #####-####', '(##) ####-####']"
            append-icon="mdi-phone"
            @input="$v.phone.$touch()"
            @blur="$v.phone.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="emailValue"
            :error-messages="emailErrors"
            label="Email"
            required
            dark
            outlined
            append-icon="mdi-email"
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          ></v-text-field>
        </div>
      </div>

      <div class="actionWrapper">
        <DependentDialog class="dialogComponent" />

        <div class="buttonWrapper">
          <v-btn class="ma-2" outlined color="#ff0" @click="clear(true)">
            Clear
          </v-btn>
          <v-btn
            class="ma-2"
            outlined
            color="#0f0"
            @click.stop="isEdit ? submit('edit', {}) : submit('add', {})"
            :disabled="isEdit ? $v.$anyError : $v.$invalid"
          >
            Save
          </v-btn>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import DependentDialog from '@/components/DependentDialog';
import customerService from '@/services/customer.service';
import addressService from '@/services/address.service';
import { validationMixin } from 'vuelidate';
import { required, email, minLength } from 'vuelidate/lib/validators';
import { mapState, mapActions } from 'vuex';

export default {
  components: { DependentDialog },
  mixins: [validationMixin],

  validations: {
    name: { required },
    cpf: { required, minLength: minLength(14) },
    phone: { required },
    email: { required, email },
    cep: { required, minLength: minLength(10) },
    publicPlace: { required },
    number: { required },
    district: { required },
    city: { required },
    state: { required, minLength: minLength(2) },
  },

  data() {
    return {
      name: '',
      cpf: '',
      cep: '',
      publicPlace: '',
      number: '',
      district: '',
      city: '',
      state: '',
      phone: '',
      email: '',
      newCustomer: {},
    };
  },

  computed: {
    ...mapState({
      currentCustomer: (state) => state.currentCustomer,
      isEdit: (state) => state.isEdit,
      isAdd: (state) => state.isAdd,
      target: (state) => state.target,
    }),
    formItems() {
      return {
        titleEdit: 'Editing a Customer',

        titleAdd: 'Adding a New Customer',

        icon: this.isEdit ? 'mdi-pencil' : 'mdi-plus',
      };
    },

    nameValue: {
      get() {
        if (this.currentCustomer && this.isEdit) {
          return this.currentCustomer.name;
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
        if (this.currentCustomer && this.isEdit) {
          return this.currentCustomer.cpf;
        } else {
          return this.cpf;
        }
      },
      set(newCpf) {
        this.cpf = newCpf;
      },
    },
    cepValue: {
      get() {
        if (this.currentCustomer && this.isEdit) {
          return this.currentCustomer.address.cep;
        } else {
          return this.cep;
        }
      },
      set(newCep) {
        this.cep = newCep;
      },
    },
    publicPlaceValue: {
      get() {
        if (this.currentCustomer && this.isEdit) {
          return this.currentCustomer.address.publicPlace;
        } else {
          return this.publicPlace;
        }
      },
      set(newPublicPlace) {
        this.publicPlace = newPublicPlace;
      },
    },
    numberValue: {
      get() {
        if (this.currentCustomer && this.isEdit) {
          return this.currentCustomer.address.number;
        } else {
          return this.number;
        }
      },
      set(newNumber) {
        this.number = newNumber;
      },
    },
    districtValue: {
      get() {
        if (this.currentCustomer && this.isEdit) {
          return this.currentCustomer.address.district;
        } else {
          return this.district;
        }
      },
      set(newDistrict) {
        this.district = newDistrict;
      },
    },
    cityValue: {
      get() {
        if (this.currentCustomer && this.isEdit) {
          return this.currentCustomer.address.city;
        } else {
          return this.city;
        }
      },
      set(newCity) {
        this.city = newCity;
      },
    },
    stateValue: {
      get() {
        if (this.currentCustomer && this.isEdit) {
          return this.currentCustomer.address.state;
        } else {
          return this.state;
        }
      },
      set(newState) {
        this.state = newState;
      },
    },
    phoneValue: {
      get() {
        if (this.currentCustomer && this.isEdit) {
          return this.currentCustomer.contact.phone;
        } else {
          return this.phone;
        }
      },
      set(newPhone) {
        this.phone = newPhone;
      },
    },
    emailValue: {
      get() {
        if (this.currentCustomer && this.isEdit) {
          return this.currentCustomer.contact.email;
        } else {
          return this.email;
        }
      },
      set(newEmail) {
        this.email = newEmail;
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
    phoneErrors() {
      const errors = [];
      if (!this.$v.phone.$dirty) return errors;
      !this.$v.phone.required && errors.push('Phone is required.');

      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push('Email is required.');
      !this.$v.email.email && errors.push('Must be valid e-mail');

      return errors;
    },
    cepErrors() {
      const errors = [];
      if (!this.$v.cep.$dirty) return errors;
      !this.$v.cep.required && errors.push('CEP is required.');
      !this.$v.cep.minLength &&
        errors.push('CEP must be at min 10 characters long');

      return errors;
    },
    publicPlaceErrors() {
      const errors = [];
      if (!this.$v.publicPlace.$dirty) return errors;
      !this.$v.publicPlace.required && errors.push('Public Place is required.');
      return errors;
    },
    numberErrors() {
      const errors = [];
      if (!this.$v.number.$dirty) return errors;
      !this.$v.number.required && errors.push('Number is required.');
      return errors;
    },
    districtErrors() {
      const errors = [];
      if (!this.$v.district.$dirty) return errors;
      !this.$v.district.required && errors.push('District is required.');
      return errors;
    },
    cityErrors() {
      const errors = [];
      if (!this.$v.city.$dirty) return errors;
      !this.$v.city.required && errors.push('City is required.');
      return errors;
    },
    stateErrors() {
      const errors = [];
      if (!this.$v.state.$dirty) return errors;
      !this.$v.state.required && errors.push('State is required.');
      !this.$v.state.minLength &&
        errors.push('State must be at min 2 characters long');

      return errors;
    },
  },

  methods: {
    ...mapActions([
      'changeIsEdit',
      'changeIsAdd',
      'changeCurrentCustomer',
      'changeTarget',
    ]),
    async getAddress() {
      if (this.cep.length === 10) {
        const {
          publicPlace,
          district,
          city,
          state,
        } = await addressService.getAddress(this.cep);

        if (this.isEdit) {
          this.currentCustomer.address.publicPlace = publicPlace;
          this.currentCustomer.address.district = district;
          this.currentCustomer.address.city = city;
          this.currentCustomer.address.state = state;

          this.changeCurrentCustomer(this.currentCustomer);
          return;
        }

        this.publicPlace = publicPlace;
        this.district = district;
        this.city = city;
        this.state = state;
      }
    },
    async submit(action) {
      if (action === 'edit') {
        const newCustomer = {};

        newCustomer.name = this.name || this.currentCustomer.name;
        newCustomer.cpf = this.cpf || this.currentCustomer.cpf;
        newCustomer.address = {
          cep: (newCustomer.cep = this.cep || this.currentCustomer.address.cep),
          publicPlace: (newCustomer.publicPlace =
            this.publicPlace || this.currentCustomer.address.publicPlace),
          number: (newCustomer.number =
            this.number || this.currentCustomer.address.number),
          district: (newCustomer.district =
            this.district || this.currentCustomer.address.district),
          city: (newCustomer.city =
            this.city || this.currentCustomer.address.city),
          state: (newCustomer.state =
            this.state || this.currentCustomer.address.state),
        };
        newCustomer.contact = {
          phone: (newCustomer.phone =
            this.phone || this.currentCustomer.contact.phone),
          email: (newCustomer.email =
            this.email || this.currentCustomer.contact.email),
        };

        await customerService.updateCustomer(this.currentCustomer._id, {
          ...this.currentCustomer,
          ...newCustomer,
        });
      }

      if (action === 'add') {
        this.$v.$touch();
        this.newCustomer = {
          name: this.name,
          cpf: this.cpf,
          address: {
            cep: this.cep,
            publicPlace: this.publicPlace,
            number: this.number,
            district: this.district,
            city: this.city,
            state: this.state,
          },
          contact: {
            phone: this.phone,
            email: this.email,
          },
        };

        await customerService.createCustomer(this.newCustomer);
      }

      this.$router.replace({ name: 'Customer' });
      this.changeIsEdit(false);
      this.changeIsAdd(false);
    },
    clear(isTouched) {
      this.$v.$reset();
      this.name = '';
      this.cpf = '';
      this.phone = '';
      this.email = '';
      this.cep = '';
      this.publicPlace = '';
      this.number = '';
      this.district = '';
      this.city = '';
      this.state = '';
      this.currentCustomer.name = ''
      this.currentCustomer.cpf = ''
      this.currentCustomer.address = {
        cep: '',
        publicPlace: '',
        number: '',
        district: '',
        city: '',
        state: ''
      }
      this.currentCustomer.contact = {
        phone: '',
        email: ''
      }
      isTouched && this.$v.$touch()
    },
    backToHome() {
      this.$router.replace({ name: 'Customer' });
      this.changeIsEdit(false);
      this.changeIsAdd(false);
      this.changeCurrentCustomer({});
      this.changeTarget('customers');
      this.clear(false);
    },
  },
};
</script>

<style lang="scss">
@import 'src/sass/master.scss';
</style>
