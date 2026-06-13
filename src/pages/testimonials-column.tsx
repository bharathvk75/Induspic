"use client";
import React from "react";
import { motion } from "framer-motion";

// Define the type for a single testimonial item
export interface TestimonialItem {
  text: string;
  image: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: TestimonialItem[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="testimonials-col-wrapper"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div className="testimonials-card" key={i}>
                  <div>{text}</div>
                  <div className="testimonials-card-profile">
                    <div className="testimonials-card-info">
                      <div className="testimonials-card-name">{name}</div>
                      <div className="testimonials-card-role">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};