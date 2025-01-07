<template>
  <div class="bg-gray-50 py-12">
    <div class="max-w-7xl mx-auto px-6 sm:px-8">
      <h1 class="text-4xl font-extrabold text-center text-blue-600 mb-4">À propos de Mimo</h1>
      <p class="text-lg text-gray-600 text-center mb-12">
        Découvrez Mimo, votre boutique en ligne dédiée aux passionnés de tricot. Nous vous proposons une sélection
        unique de laines de qualité, pour tous vos projets créatifs !
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-12">
        <div class="relative">
          <img src="https://via.placeholder.com/600x400" alt="Laines à tricoter" class="rounded-lg shadow-xl"/>
        </div>

        <div class="space-y-6 mb-6">
          <h2 class="text-3xl font-bold text-gray-800">Qui sommes-nous ?</h2>
          <p class="text-lg text-gray-700">
            Chez Mimo, nous croyons que le tricot est bien plus qu'une simple activité. C'est une passion qui relie
            les personnes, éveille la créativité et permet de créer des pièces uniques avec des matières nobles. Nous
            sélectionnons chaque laine avec soin, pour offrir à nos clients des produits durables et doux.
          </p>

          <p class="text-lg text-gray-700">
            Que vous soyez débutant ou expert, notre large gamme de laines de qualité supérieure répondra à toutes
            vos attentes, que ce soit pour des projets de tricot, de crochet, ou même pour des créations personnalisées.
          </p>

          <h3 class="text-2xl font-semibold text-gray-800">Notre engagement</h3>
          <ul class="list-disc pl-5 space-y-3 text-gray-700">
            <li>Produits de qualité, sourcés de manière responsable.</li>
            <li>Des prix compétitifs et transparents.</li>
            <li>Un service client réactif et à l'écoute de vos besoins.</li>
            <li>Une livraison rapide et soignée pour tous vos achats.</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="bg-blue-100 py-12">
      <div class="max-w-7xl mx-auto px-6 sm:px-8 text-center">
        <h2 class="text-3xl font-extrabold text-blue-600 mb-4">Ce que disent nos clients</h2>
        <p class="text-lg text-gray-600 mb-8">Nous sommes fiers de recevoir des avis enthousiastes de nos clients fidèles !</p>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <p class="text-gray-700 mb-4">"J'adore Mimo ! La qualité des laines est exceptionnelle, et le site est super facile à utiliser. Mes projets de tricot sont toujours un succès !" – Alice</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <p class="text-gray-700 mb-4">"Une gamme de produits variée, un service rapide et un personnel toujours disponible pour répondre à mes questions. Merci Mimo !" – Julien</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <p class="text-gray-700 mb-4">"Le site est un vrai régal pour les yeux ! Chaque projet devient une œuvre d'art avec la laine de Mimo. Je recommande vivement." – Claire</p>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 sm:px-8 py-12 text-center">
      <h2 class="text-3xl font-extrabold text-blue-600 mb-4">Nous contacter</h2>
      <p class="text-lg text-gray-600 mb-8">Vous avez une question ? N'hésitez pas à nous contacter, nous serons ravis de vous répondre.</p>
      <a href="/contact" class="text-white bg-blue-600 px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition duration-200">Contactez-nous</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
};
</script>