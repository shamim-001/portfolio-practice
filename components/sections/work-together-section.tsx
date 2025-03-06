import type React from "react"

const WorkTogetherSection: React.FC = () => {
  return (
    <section className="pt-0 pb-12 md:pb-24 lg:pb-32">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
        <p className="text-gray-600 mb-8">We're always looking for new opportunities to collaborate.</p>
        <a href="/contact" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Contact Us
        </a>
      </div>
    </section>
  )
}

export default WorkTogetherSection

