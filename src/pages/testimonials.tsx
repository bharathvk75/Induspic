import { TestimonialsColumn, TestimonialItem } from "./testimonials-column";
import { motion } from "framer-motion";
import "./Testimonials.css";

const testimonials: TestimonialItem[] = [
  {
    text: "Induspic's descaling blend significantly improved our boiler efficiency. Their team was professional and the results exceeded expectations.",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cfdfeeab?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Rajesh Kumar",
    role: "Plant Manager, Sugar Mill",
  },
  {
    text: "The rapid-action descaling from Induspic saved us critical downtime. Their solution is truly high-efficiency.",
    image: "https://images.unsplash.com/photo-1507003211169-e695c6edd231?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Priya Sharma",
    role: "Maintenance Head, Distillery",
  },
  {
    text: "Their non-ferrous specialist cleaner worked wonders on our delicate equipment without any erosion. Highly recommended!",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Amit Patel",
    role: "Operations Director, Engineering",
  },
  {
    text: "Induspic's general purpose cleaning agent is incredibly versatile. We use it across multiple surfaces with great results.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Sneha Reddy",
    role: "Facility Manager, Food & Agro",
  },
  {
    text: "The line flushing agent ensured complete residue removal after descaling, protecting our system integrity.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Vikram Singh",
    role: "Chief Engineer, Ice Plant",
  },
  {
    text: "Their neutralizing compound is crucial for post-process safety and metal protection. A reliable product.",
    image: "https://images.unsplash.com/photo-1547425260-76bc45649c3d?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Deepa Rao",
    role: "Quality Control, Pharmaceuticals",
  },
  {
    text: "The rust and carbon removal treatment brought our old equipment back to life. Deep penetration cleaning is no joke!",
    image: "https://images.unsplash.com/photo-1500048993953-d23a43626167?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Suresh Menon",
    role: "Production Head, Textile",
  },
  {
    text: "Induspic's surface reconditioning provides excellent protection, extending the life of our machinery.",
    image: "https://images.unsplash.com/photo-1507003211169-e695c6edd231?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Kavita Nair",
    role: "Maintenance Supervisor, Life Sciences",
  },
  {
    text: "Their team's expertise in chemical treatment is unmatched. Our plant's performance has significantly improved.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Arjun Das",
    role: "Operations Manager, Chemical Processing",
  },
];


const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);


const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="testimonials-header"
        >
          <div>
            <div className="testimonials-badge">Testimonials</div>
          </div>

          <h2 className="testimonials-title">
            What our clients say
          </h2>
          <p className="testimonials-subtitle">
            Hear directly from our satisfied industrial clients about the impact of Induspic Engineers' solutions.
          </p>
        </motion.div>

        <div className="testimonials-grid">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="testimonials-col-hidden-md" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="testimonials-col-hidden-lg" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;