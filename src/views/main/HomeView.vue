<template>
  <div>
    <section id="billboard" class="bg-light py-5">
      <div class="container mx-auto text-center">
        <h1 class="text-3xl font-bold mt-4" data-aos="fade-up">Bienvenue chez Mimo</h1>
        <p class="text-base mt-4 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="300">
          Découvrez nos sacs artisanaux fabriqués à partir de laine à tricoter. Un mélange parfait de style et de durabilité, conçus pour sublimer votre quotidien tout en mettant en avant l'élégance de la laine.
        </p>
      </div>
    </section>

    <section id="new-arrivals" class="py-5">
      <div class="container mx-auto">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold">Nos Nouveautés</h2>
          <a href="/catalog" class="underline hover:no-underline">Voir tous les produits</a>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div class="p-4 text-center">
            <img src="../../assets/images/Product-01.jpeg" alt="Sac en laine 1" class="mx-auto mb-4">
            <h3 class="text-lg font-semibold">Sac Tricot Élégant</h3>
            <p>€45.00</p>
          </div>
          <div class="p-4 text-center">
            <img src="../../assets/images/Product-09.jpg" alt="Sac en laine 2" class="mx-auto mb-4">
            <h3 class="text-lg font-semibold">Sac Bohème</h3>
            <p>€50.00</p>
          </div>
          <div class="p-4 text-center">
            <img src="../../assets/images/product-04.jpg" alt="Sac en laine 3" class="mx-auto mb-4">
            <h3 class="text-lg font-semibold">Sac Classique</h3>
            <p>€40.00</p>
          </div>
          <div class="p-4 text-center">
            <img src="../../assets/images/product-05.jpg" alt="Sac en laine 4" class="mx-auto mb-4">
            <h3 class="text-lg font-semibold">Sac Tendance</h3>
            <p>€55.00</p>
          </div>
        </div>
      </div>
    </section>

    <section id="testimonials" class="py-5 bg-light">
      <div class="container mx-auto text-center">
        <h2 class="text-2xl font-bold mb-4">Ce que disent nos clients</h2>
        <div class="carousel relative overflow-hidden">
          <div
            class="carousel-inner flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
          >
            <div
              v-for="(testimonial, index) in testimonials"
              :key="index"
              class="carousel-item flex-shrink-0 w-full text-center"
              
            >
              <blockquote class="text-lg italic">
                {{ testimonial.text }}
              </blockquote>
              <p class="text-sm font-bold mt-2">- {{ testimonial.author }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="instagram py-5">
      <div class="container mx-auto">
        <h2 class="text-2xl font-bold mb-4 text-center">Suivez-nous sur Instagram</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          <div class="text-center">
            <a href="https://www.instagram.com/templatesjungle/" target="_blank">
              <img src="../../assets/images/Product-07.jpg" alt="instagram" class="mx-auto">
            </a>
          </div>
          <div class="text-center">
            <a href="https://www.instagram.com/templatesjungle/" target="_blank">
              <img src="../../assets/images/Product-14.jpg" alt="instagram" class="mx-auto">
            </a>
          </div>
          <div class="text-center">
            <a href="https://www.instagram.com/templatesjungle/" target="_blank">
              <img src="../../assets/images/Product-12.jpg" alt="instagram" class="mx-auto">
            </a>
          </div>
          <div class="text-center">
            <a href="https://www.instagram.com/templatesjungle/" target="_blank">
              <img src="../../assets/images/Product-09.jpg" alt="instagram" class="mx-auto">
            </a>
          </div>
          <div class="text-center">
            <a href="https://www.instagram.com/templatesjungle/" target="_blank">
              <img src="../../assets/images/Product-06.jpg" alt="instagram" class="mx-auto">
            </a>
          </div>
          <div class="text-center">
            <a href="https://www.instagram.com/templatesjungle/" target="_blank">
              <img src="../../assets/images/product-13.jpg" alt="instagram" class="mx-auto">
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      testimonials: [
        { text: "J'adore mon sac Mimo ! Il est non seulement élégant, mais aussi très pratique. Bravo pour cette qualité artisanale.", author: "Alice" },
        { text: "Un produit magnifique et écoresponsable. Je recommande vivement !", author: "Benoît" },
        { text: "Livraison rapide et produit de qualité supérieure. Je suis ravi !", author: "Chloé" },
      ],
      currentIndex: 0, 
    };
  },
  methods: {
    nextSlide() {
      
      const firstTestimonial = this.testimonials.shift();
      this.testimonials.push(firstTestimonial);
    },
  },
  mounted() {
    setInterval(this.nextSlide, 5000); 
  },
};
</script>

<style scoped>
#billboard {
  background-color: #f8f9fa;
  padding: 5rem 0;
}

#billboard h1 {
  font-size: 2.25rem;
  font-weight: 700;
  margin-top: 1rem;
}

#billboard p {
  font-size: 1rem;
  margin-top: 1rem;
  max-width: 36rem;
  margin-left: auto;
  margin-right: auto;
  color: #6c757d;
  line-height: 1.6;
}

#new-arrivals {
  background-color: #fff;
  padding: 5rem 0;
}

#new-arrivals h2 {
  font-size: 1.5rem;
  font-weight: 700;
}

#new-arrivals img {
  max-height: 200px;
  object-fit: cover;
}

#testimonials {
  background-color: #f8f9fa;
  padding: 5rem 0;
}

#testimonials h2 {
  font-size: 1.5rem;
  font-weight: 700;
}

.carousel {
  position: relative;
  overflow: hidden;
}

.carousel-inner {
  display: flex;
  transition: transform 1.5s ease-in-out; 
  will-change: transform;
}

.carousel-inner {
  display: flex;
  transition: transform 0.5s ease-in-out;
  will-change: transform;
}

.carousel-item {
  flex: 0 0 100%;
  text-align: center;
}

.instagram {
  margin-top: 2rem;
}

.instagram img {
  width: 100%;
  height: auto;
}
</style>
