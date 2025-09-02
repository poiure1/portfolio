import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Github, ExternalLink, Filter } from "lucide-react";
import portfolioData from "../data/portfolioData.json";
import Button from "../components/Button";
import AnimatedSection from "../components/AnimatedSection";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const { projects, sections } = portfolioData;

  // Dynamically generate categories from projects (flatten all categories)
  const allCategories = projects.flatMap(
    (project) => project.categories || [project.category]
  );
  const projectCategories = [...new Set(allCategories)];
  const categories = ["All", ...projectCategories];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => {
          // Check if project has the category in either categories array or single category
          if (project.categories) {
            return project.categories.includes(activeFilter);
          }
          return project.category === activeFilter;
        });

  return (
    <div>
      {/* Header Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              My <span className="text-primary-500">Projects</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Here's a collection of projects I've worked on.
            </p>
          </AnimatedSection>

          {/* Modern Filter Buttons */}
          <AnimatedSection animation="scaleIn" delay={200} className="flex flex-wrap justify-center gap-2 mb-16 p-2 bg-gray-50 rounded-2xl max-w-fit mx-auto">
            {categories.map((category) => {
              const count =
                category === "All"
                  ? projects.length
                  : projects.filter((p) => {
                      if (p.categories) {
                        return p.categories.includes(category);
                      }
                      return p.category === category;
                    }).length;

              return (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 text-sm ${
                    activeFilter === category
                      ? "bg-white text-primary-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                  }`}
                >
                  {category}
                  {activeFilter === category && (
                    <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {count}
                    </span>
                  )}
                  {activeFilter !== category && (
                    <span className="ml-1 text-xs opacity-60">{count}</span>
                  )}
                </button>
              );
            })}
          </AnimatedSection>

          {/* Modern Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredProjects.map((project, index) => (
              <AnimatedSection
                key={project.id}
                animation="fadeInUp"
                delay={index * 100}
              >
                <Link
                  to={`/portfolio/projects/${project.id}`}
                  className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden block h-full"
                >
                  {/* Project Image */}
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/400x300/6366f1/ffffff?text=${encodeURIComponent(
                          project.title
                        )}`;
                      }}
                    />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <div className="flex gap-1">
                        {(project.categories || [project.category])
                          .slice(0, 2)
                          .map((cat, index) => (
                            <span
                              key={index}
                              className="bg-white/95 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-xs font-medium shadow-sm"
                            >
                              {cat}
                            </span>
                          ))}
                        {(project.categories || [project.category]).length >
                          2 && (
                          <span className="bg-white/95 backdrop-blur-sm text-gray-700 px-2 py-1 rounded-full text-xs font-medium shadow-sm">
                            +
                            {(project.categories || [project.category]).length -
                              2}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Hover Overlay with Quick Actions */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white/95 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-white transition-all duration-200 flex items-center gap-2 shadow-lg"
                            aria-label="View source code"
                          >
                            <Github className="w-4 h-4" />
                            Code
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="bg-primary-500/95 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-600 transition-all duration-200 flex items-center gap-2 shadow-lg"
                            aria-label="View live demo"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                      {project.title}
                    </h3>

                    {project.description && (
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                        {project.description}
                      </p>
                    )}

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-50 text-gray-600 px-2.5 py-1 rounded-md text-xs font-medium hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200 border border-gray-100"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="bg-gray-100 text-gray-500 px-2.5 py-1 rounded-md text-xs font-medium">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          {/* No projects message */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Filter className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No projects found
                </h3>
                <p className="text-gray-500 text-lg">
                  No projects match the selected category "{activeFilter}". Try
                  selecting a different filter.
                </p>
                <button
                  onClick={() => setActiveFilter("All")}
                  className="mt-6 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-300 font-medium"
                >
                  Show All Projects
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 lg:py-32 bg-gray-50">
        <AnimatedSection animation="fadeInUp" className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {sections.cta.title}
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {sections.cta.subtitle}
          </p>
          <Button to="/portfolio/contact" variant="primary" size="md">
            {sections.cta.buttonText}
          </Button>
        </AnimatedSection>
      </section>
    </div>
  );
};

export default Projects;
