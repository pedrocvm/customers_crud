import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3341',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default new Vuex.Store({
  state: {
    isEdit: false,
    isAdd: false,
    target: 'customers',
    allCustomers: [],
    allDependents: [],
    currentCustomer: {
      dependents: [],
      _id: '',
      name: '',
      cpf: '',
      address: {
        cep: '',
        publicPlace: '',
        number: '',
        district: '',
        city: '',
        state: '',
      },
      contact: {
        phone: '',
        email: '',
      },
    },
    currentDependent: {},
  },
  mutations: {
    SET_ALLCUSTOMERS(state, data) {
      state.allCustomers = data;
    },
    SET_ALLDEPENDENTS(state, data) {
      state.allDependents = data;
    },
    SET_CURRENTCUSTOMER(state, data) {
      state.currentCustomer = data;
    },
    SET_CURRENTDEPENDENT(state, data) {
      state.currentDependent = data;
    },
    SET_IS_EDIT(state, data) {
      state.isEdit = data;
    },
    SET_IS_ADD(state, data) {
      state.isAdd = data;
    },
    SET_TARGET(state, data) {
      state.target = data;
    },
  },
  actions: {
    async getAllCustomers({ commit }) {
      const { data } = await axiosInstance.get('/customer');
      commit('SET_ALLCUSTOMERS', data);
    },
    async getAllDependents({ commit }) {
      if (this.state.currentCustomer._id) {
        const { data } = await axiosInstance.get(
          `/dependent/${this.state.currentCustomer._id}`
        );
        if (data) {
          commit('SET_ALLDEPENDENTS', data);
        }
      }
    },
    async getCustomer({ commit }, id) {
      const { data } = await axiosInstance.get(`/customer/${id}`);
      commit('SET_CURRENTCUSTOMER', data);
    },
    async getDependent({ commit }, id) {
      const { data } = await axiosInstance.get(`/dependent/${id}`);
      commit('SET_CURRENTDEPENDENT', data);
    },
    changeCurrentCustomer({ commit }, customer) {
      commit('SET_CURRENTCUSTOMER', customer);
    },
    changeCurrentDependent({ commit }, dependent) {
      commit('SET_CURRENTDEPENDENT', dependent);
    },
    changeIsEdit({ commit }, value) {
      commit('SET_IS_EDIT', value);
    },
    changeIsAdd({ commit }, value) {
      commit('SET_IS_ADD', value);
    },
    changeTarget({ commit }, value) {
      commit('SET_TARGET', value);
    },
  },
});
