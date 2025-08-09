import { useState } from "react";
import { TESTIMONIALS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function TestimonialsSection() {
  const [showAll, setShowAll] = useState(false);
  const displayedTestimonials = showAll ? TESTIMONIALS : TESTIMONIALS.slice(0, 6);

  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Ce que disent nos clients 💬
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Découvrez les témoignages de nos utilisateurs satisfaits
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedTestimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star text-yellow-400"></i>
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center space-x-3">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover" 
                />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!showAll && TESTIMONIALS.length > 6 && (
          <div className="text-center mt-12">
            <Button
              onClick={() => setShowAll(true)}
              variant="outline"
              className="bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 hover:bg-primary-200 dark:hover:bg-primary-900/50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Voir plus de témoignages
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
