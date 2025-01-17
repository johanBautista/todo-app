<template>
  <div class="register-form">
    <form @submit.prevent="handleSubmit">
      <div class="form-group" :class="{ 'has-error': errors.username }">
        <label for="username">Username</label>
        <input id="username" v-model="form.username" type="text" />
        <span v-if="errors.username" class="error-message">{{ errors.username }}</span>
      </div>

      <div class="form-group" :class="{ 'has-error': errors.email }">
        <label for="email">Email</label>
        <input id="email" v-model="form.email" type="email" />
        <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
      </div>

      <div class="form-group" :class="{ 'has-error': errors.password }">
        <label for="password">Password</label>
        <input id="password" v-model="form.password" type="password" />
        <p v-if="errors.password" class="error-message">{{ errors.password }}</p>
      </div>

      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { FormErrors } from '@/types'
import { validateForm } from '@/utils/validators'

const form = ref({
  username: '',
  email: '',
  password: '',
})

const errors = ref<FormErrors>({})

// Validación reactiva
watch(
  () => form.value,
  (newForm) => {
    const { errors: validationErrors } = validateForm(newForm)
    errors.value = validationErrors
  },
  { deep: true },
)

const handleSubmit = async () => {
  const { errors: validationErrors, isValid } = validateForm(form.value)

  if (!isValid) {
    errors.value = validationErrors
    return
  }

  try {
    // Llamada a la API REST
    const response = await fetch('https://tu-api.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form.value),
    })

    if (!response.ok) {
      throw new Error('Error en el registro')
    }

    const data = await response.json()
    console.log('Registro exitoso', data)
  } catch (error) {
    console.error('Error al registrar:', error)
  }
}
</script>

<style scoped>
.register-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-group.has-error input {
  border-color: red;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
  display: block;
}

button {
  width: 100%;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}
</style>
