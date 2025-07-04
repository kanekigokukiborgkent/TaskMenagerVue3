<template>
  <div class="relative w-screen h-screen">
    <div class="relative z-10 flex items-center justify-center h-full">
      <v-container class="h-full relative" max-width="600">
        <v-col
          class="bg-[#edfafa7d] relative z-10 rounded-xl shadow-lg backdrop-blur-xs pa-6"
        >
          <p class="text-center text-lg font-bold mb-4">LOG IN</p>

          <v-col>
            <v-text-field
              v-model="fullName"
              :counter="20"
              label="Full name"
              required
              :rules="nameRules"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="email"
              :counter="20"
              label="Email"
              required
              :rules="emailRules"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="password"
              :counter="20"
              label="Password"
              required
              :rules="passwordRules"
            />
          </v-col>
          <div class="flex justify-between mt-4 z-10 relative text-center">
            <v-btn class="mr-3" color="primary" @click="login">
              Login <v-icon class="ml-2">mdi-account</v-icon>
            </v-btn>
            <v-btn color="primary" @click="register">
              Register <v-icon class="ml-2">mdi-arrow-right</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-container>
    </div>
  </div>
</template>

<script>
  import Regex from '@/reusables/Regex';

  export default {
    data: () => ({
      userData: JSON.parse(sessionStorage.getItem('user')),
      fullName: '',
      email: '',
      password: '',
      nameRules: [
        value => value?.length <= 20 || 'Name must be less than 20 characters!',
      ],
      emailRules: [
        value =>
          value?.length <= 20 || 'Email must be less than 20 characters!',
        value => Regex.emailRegex.test(value) || 'Email is incorrect!',
      ],
      passwordRules: [
        value => Regex.passwordRegex.test(value) || 'Password is incorrect!',
        value =>
          (value?.length >= 8 && value?.length <= 20) ||
          'The length of the password must be less than 20 characters and greater than 8 characters!',
      ],
    }),
    methods: {
      login () {
        if (
          this.userData.fullName === this.fullName &&
          this.userData.email === this.email &&
          this.userData.password === this.password
        )
          window.location = '/';
      },
      register () {
        window.location = '/RegisterUser';
      },
    },
  };
</script>
<style scoped>
@import "tailwindcss";
</style>
