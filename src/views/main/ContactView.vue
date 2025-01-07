<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-10">
    <div class="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 space-y-6">
      <h1 class="text-3xl font-bold text-center text-purple-600">Contactez Mimo</h1>
      <p class="text-center text-gray-600">
        Avez-vous des questions ? Envoyez-nous un email et nous vous répondrons rapidement !
      </p>

      <div class="text-center">
        <a
          href="mailto:contact@mimo.com"
          class="inline-block bg-purple-600 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Envoyer un email
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactPage',
};
</script>