// Simple service to map available videos to lessons/courses based on filenames
// Rules implemented:
// - Alphabet: one video (isl_alphabet.mp4) links ONLY to A–K course; K–T and U–Z remain blank
// - Mathematics: if filename contains "counting numbers", link ONLY to the first math course; leave other math counting courses blank
// - General: for other videos, match by best topic keyword without duplicating across unrelated courses

// Import video assets
import islAlphabet from '../../Videos for project/isl_alphabet.mp4';
import islGreetings from '../../Videos for project/isl_basicgreetings.mp4';
import mathAddition from '../../Videos for project/math_addition.mp4';
import mathColoursShapes from '../../Videos for project/math_coloursandshapes.mp4';
import mathCounting from '../../Videos for project/math_countingnumbers.mp4';
import scienceAnimals from '../../Videos for project/science_animals.mp4';
import scienceDayNight from '../../Videos for project/science_daynight.mp4';
import sciencePlants from '../../Videos for project/science_plantsandtrees.mp4';
import scienceWaterCycle from '../../Videos for project/science_watercycle.mp4';

const videos = [
  { file: islAlphabet, name: 'isl_alphabet.mp4' },
  { file: islGreetings, name: 'isl_basicgreetings.mp4' },
  { file: mathAddition, name: 'math_addition.mp4' },
  { file: mathColoursShapes, name: 'math_coloursandshapes.mp4' },
  { file: mathCounting, name: 'math_countingnumbers.mp4' },
  { file: scienceAnimals, name: 'science_animals.mp4' },
  { file: scienceDayNight, name: 'science_daynight.mp4' },
  { file: sciencePlants, name: 'science_plantsandtrees.mp4' },
  { file: scienceWaterCycle, name: 'science_watercycle.mp4' }
];

function normalize(text) {
  return text.toLowerCase();
}

// Public API: getVideoForLesson(module, lessonTitle)
export function getVideoForLesson(moduleName, lessonTitle) {
  const module = normalize(moduleName);
  const title = normalize(lessonTitle);

  // Indian Sign Language (Alphabet and Greetings)
  if (module.includes('indian sign language') || module === 'isl') {
    // Alphabet courses: only link A–K
    if (title.includes('alphabet a') || title.match(/alphabet\s*a[-–]?j|alphabet\s*a[-–]?k/)) {
      const v = videos.find(v => v.name === 'isl_alphabet.mp4');
      return v?.file || null;
    }
    if (title.includes('alphabet k') || title.includes('alphabet u') || title.includes('numbers')) {
      return null; // leave K–T and U–Z & Numbers blank per rule
    }
    if (title.includes('greetings')) {
      const v = videos.find(v => v.name === 'isl_basicgreetings.mp4');
      return v?.file || null;
    }
    return null;
  }

  // Mathematics
  if (module.includes('mathematics') || module === 'math') {
    // Counting numbers: only link to the first math course
    if (title.includes('counting') && (title.includes('1-5') || title.includes('1 to 5') || title.includes('1 – 5'))) {
      const v = videos.find(v => v.name === 'math_countingnumbers.mp4');
      return v?.file || null;
    }
    if (title.includes('counting')) {
      return null; // leave other counting courses blank
    }
    if (title.includes('shapes') || title.includes('colors') || title.includes('colours')) {
      const v = videos.find(v => v.name === 'math_coloursandshapes.mp4');
      return v?.file || null;
    }
    if (title.includes('addition')) {
      const v = videos.find(v => v.name === 'math_addition.mp4');
      return v?.file || null;
    }
    return null;
  }

  // Science
  if (module.includes('science')) {
    if (title.includes('plants') || title.includes('trees')) {
      const v = videos.find(v => v.name === 'science_plantsandtrees.mp4');
      return v?.file || null;
    }
    if (title.includes('animals') || title.includes('birds')) {
      const v = videos.find(v => v.name === 'science_animals.mp4');
      return v?.file || null;
    }
    if (title.includes('water') || title.includes('weather') || title.includes('cycle')) {
      const v = videos.find(v => v.name === 'science_watercycle.mp4');
      return v?.file || null;
    }
    if (title.includes('day') || title.includes('night')) {
      const v = videos.find(v => v.name === 'science_daynight.mp4');
      return v?.file || null;
    }
    return null;
  }

  return null;
}


