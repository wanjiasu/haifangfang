import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { AppConfig } from "@/lib/config";

import Container from "@/components/common/container";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations("glossary");

  return {
    title: `AI Glossary | AI Terms & Definitions | ${AppConfig.siteName}`,
    description:
      "Comprehensive glossary of AI terms, definitions, and concepts. Learn about artificial intelligence terminology.",
    keywords:
      "AI glossary, AI terms, artificial intelligence definitions, AI concepts, machine learning terms",
  };
}

// Mock glossary data - in a real app, this would come from a database or CMS
const glossaryTerms = [
  {
    id: "1",
    term: "Artificial Intelligence (AI)",
    definition:
      "The simulation of human intelligence in machines that are programmed to think and learn like humans.",
    category: "General",
    letter: "A",
  },
  {
    id: "2",
    term: "Machine Learning (ML)",
    definition:
      "A subset of AI that enables computers to learn and improve from experience without being explicitly programmed.",
    category: "Machine Learning",
    letter: "M",
  },
  {
    id: "3",
    term: "Deep Learning",
    definition:
      "A subset of machine learning that uses neural networks with multiple layers to model and understand complex patterns.",
    category: "Machine Learning",
    letter: "D",
  },
  {
    id: "4",
    term: "Neural Network",
    definition:
      "A computing system inspired by biological neural networks that learns to perform tasks by considering examples.",
    category: "Machine Learning",
    letter: "N",
  },
  {
    id: "5",
    term: "Natural Language Processing (NLP)",
    definition:
      "A branch of AI that helps computers understand, interpret and manipulate human language.",
    category: "NLP",
    letter: "N",
  },
  {
    id: "6",
    term: "Computer Vision",
    definition:
      "A field of AI that trains computers to interpret and understand the visual world from digital images or videos.",
    category: "Computer Vision",
    letter: "C",
  },
  {
    id: "7",
    term: "Algorithm",
    definition:
      "A set of rules or instructions given to an AI, neural network, or other machine to help it learn on its own.",
    category: "General",
    letter: "A",
  },
  {
    id: "8",
    term: "Big Data",
    definition:
      "Extremely large datasets that may be analyzed computationally to reveal patterns, trends, and associations.",
    category: "Data Science",
    letter: "B",
  },
  {
    id: "9",
    term: "Chatbot",
    definition:
      "A computer program designed to simulate conversation with human users, especially over the internet.",
    category: "Applications",
    letter: "C",
  },
  {
    id: "10",
    term: "Generative AI",
    definition:
      "AI systems that can generate new content, such as text, images, audio, or code, based on training data.",
    category: "Applications",
    letter: "G",
  },
  {
    id: "11",
    term: "Large Language Model (LLM)",
    definition:
      "A type of AI model trained on vast amounts of text data to understand and generate human-like text.",
    category: "NLP",
    letter: "L",
  },
  {
    id: "12",
    term: "Prompt Engineering",
    definition:
      "The practice of designing and refining prompts to get desired outputs from AI language models.",
    category: "Applications",
    letter: "P",
  },
];

const categories = [
  "All",
  "General",
  "Machine Learning",
  "NLP",
  "Computer Vision",
  "Data Science",
  "Applications",
];
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default async function GlossaryPage() {
  const t = await getTranslations("glossary");

  // Group terms by letter
  const termsByLetter = glossaryTerms.reduce(
    (acc, term) => {
      const letter = term.letter.toUpperCase();

      if (!acc[letter]) {
        acc[letter] = [];
      }
      acc[letter].push(term);

      return acc;
    },
    {} as Record<string, typeof glossaryTerms>,
  );

  return (
    <Container className="mt-4">
      {/* Summer-themed Hero Section */}
      <div className="relative overflow-hidden text-center py-20 mb-12 summer-card">
        {/* Summer background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-5 left-10 text-4xl animate-pulse">☀️</div>
          <div className="absolute top-10 right-20 text-3xl animate-bounce">🌴</div>
          <div className="absolute bottom-5 left-20 text-2xl animate-pulse">📚</div>
          <div className="absolute bottom-10 right-10 text-3xl animate-bounce">🧠</div>
        </div>
        
        <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-orange-500 via-yellow-400 to-red-500 bg-clip-text text-transparent mb-6">
          AI Glossary ☀️
        </h1>
        <p className="text-xl text-orange-700 dark:text-orange-300 max-w-3xl mx-auto leading-relaxed">
          Discover AI terms and definitions in our sunny knowledge base! 🌞<br/>
          From algorithms to zero-shot learning, explore the language of artificial intelligence.
        </p>
      </div>

      {/* Summer-themed Alphabet Navigation */}
      <div className="summer-card p-6 mb-12">
        <h2 className="text-2xl font-bold text-orange-600 mb-4 text-center">
          Browse by Letter 🔤
        </h2>
        <div className="flex flex-wrap justify-center gap-2">
          {alphabet.map((letter) => {
            const hasTerms = termsByLetter[letter]?.length > 0;
            return (
              <a
                key={letter}
                href={`#letter-${letter.toLowerCase()}`}
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300
                  ${hasTerms 
                    ? 'summer-btn text-white hover:scale-110' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                {letter}
              </a>
            );
          })}
        </div>
      </div>

      {/* Summer-themed Category Filter */}
      <div className="summer-card p-6 mb-12">
        <h2 className="text-2xl font-bold text-orange-600 mb-4 text-center">
          Categories 🏷️
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              className="summer-btn px-6 py-2 text-sm font-medium rounded-full hover:scale-105"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Summer-themed Terms by Letter */}
      <div className="space-y-12">
        {alphabet.map((letter) => {
          const terms = termsByLetter[letter];
          if (!terms || terms.length === 0) return null;

          return (
            <section
              key={letter}
              id={`letter-${letter.toLowerCase()}`}
              className="summer-card p-8"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">{letter}</span>
                </div>
                <h2 className="text-4xl font-bold text-orange-600">
                  {letter} Terms
                </h2>
                <div className="text-2xl animate-bounce">🌻</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {terms.map((term) => (
                  <div
                    key={term.id}
                    className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-orange-900 dark:to-yellow-900 p-6 rounded-xl border-2 border-orange-200 dark:border-orange-700 hover:border-orange-400 dark:hover:border-orange-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-orange-800 dark:text-orange-200">
                        {term.term}
                      </h3>
                      <span className="bg-orange-200 dark:bg-orange-700 text-orange-800 dark:text-orange-200 px-3 py-1 rounded-full text-sm font-medium">
                        {term.category}
                      </span>
                    </div>
                    <p className="text-orange-700 dark:text-orange-300 leading-relaxed">
                      {term.definition}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Summer-themed Footer Message */}
      <div className="text-center mt-16 mb-8 summer-card p-8">
        <div className="text-4xl mb-4">🌞📖✨</div>
        <h3 className="text-2xl font-bold text-orange-600 mb-2">
          Keep Learning & Growing!
        </h3>
        <p className="text-orange-700 dark:text-orange-300 text-lg">
          Knowledge is like sunshine - it brightens everything it touches! 
          Continue exploring AI concepts and expand your understanding.
        </p>
      </div>
    </Container>
  );
}