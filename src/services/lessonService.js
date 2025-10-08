// Lesson service for tracking lesson completion, progress, and review data

class LessonService {
  constructor() {
    this.storageKey = 'tinySigns_lessonProgress';
    this.userKey = 'tinySigns_currentUser';
  }

  // Get current user ID
  getCurrentUserId() {
    const user = localStorage.getItem('tinySignsUser');
    if (user) {
      return JSON.parse(user).id;
    }
    const tempUserId = 'user_' + Date.now();
    localStorage.setItem(this.userKey, JSON.stringify({ id: tempUserId }));
    return tempUserId;
  }

  // Update user's progress in localStorage
  updateUserProgress(moduleName, progressValue) {
    try {
      const user = localStorage.getItem('tinySignsUser');
      if (user) {
        const userData = JSON.parse(user);
        const moduleKey = moduleName.toLowerCase() === 'indian sign language' ? 'isl' : moduleName.toLowerCase();
        
        // Update individual progress
        userData.individualProgress = userData.individualProgress || {
          mathematics: 0,
          science: 0,
          isl: 0
        };
        userData.individualProgress[moduleKey] = progressValue;
        
        // Calculate total progress (average of all modules)
        const totalProgress = Object.values(userData.individualProgress).reduce((sum, val) => sum + val, 0) / 3;
        userData.progress = Math.round(totalProgress);
        
        localStorage.setItem('tinySignsUser', JSON.stringify(userData));
        return userData;
      }
    } catch (error) {
      console.error('Error updating user progress:', error);
    }
    return null;
  }

  // Get user's current progress
  getUserProgress() {
    try {
      const user = localStorage.getItem('tinySignsUser');
      if (user) {
        const userData = JSON.parse(user);
        return {
          progress: userData.progress || 0,
          individualProgress: userData.individualProgress || {
            mathematics: 0,
            science: 0,
            isl: 0
          }
        };
      }
    } catch (error) {
      console.error('Error getting user progress:', error);
    }
    return {
      progress: 0,
      individualProgress: {
        mathematics: 0,
        science: 0,
        isl: 0
      }
    };
  }

  // Mark lesson as completed
  async completeLesson(moduleName, lessonId, timeSpent = 0) {
    try {
      const userId = this.getCurrentUserId();
      const lessonRecord = {
        id: this.generateId(),
        userId,
        moduleName,
        lessonId,
        completed: true,
        completedAt: new Date().toISOString(),
        timeSpent,
        watchCount: 1
      };

      const existingProgress = this.getLessonProgress();
      const existingIndex = existingProgress.findIndex(
        p => p.moduleName === moduleName && p.lessonId === lessonId && p.userId === userId
      );

      if (existingIndex >= 0) {
        // Update existing record
        existingProgress[existingIndex] = {
          ...existingProgress[existingIndex],
          ...lessonRecord,
          watchCount: existingProgress[existingIndex].watchCount + 1
        };
      } else {
        // Add new record
        existingProgress.push(lessonRecord);
      }

      localStorage.setItem(this.storageKey, JSON.stringify(existingProgress));
      
      // Update user's progress based on lesson completion
      const moduleStats = this.getModuleStats(moduleName, 4); // Assuming 4 lessons per module
      this.updateUserProgress(moduleName, moduleStats.completionPercentage);
      
      return lessonRecord;
    } catch (error) {
      console.error('Error completing lesson:', error);
      throw error;
    }
  }

  // Rewatch a lesson
  async rewatchLesson(moduleName, lessonId, timeSpent = 0) {
    try {
      const userId = this.getCurrentUserId();
      const existingProgress = this.getLessonProgress();
      const existingIndex = existingProgress.findIndex(
        p => p.moduleName === moduleName && p.lessonId === lessonId && p.userId === userId
      );

      if (existingIndex >= 0) {
        existingProgress[existingIndex].watchCount += 1;
        existingProgress[existingIndex].timeSpent += timeSpent;
        existingProgress[existingIndex].lastWatched = new Date().toISOString();
      } else {
        // If lesson wasn't completed before, mark as completed
        await this.completeLesson(moduleName, lessonId, timeSpent);
        return;
      }

      localStorage.setItem(this.storageKey, JSON.stringify(existingProgress));
      
      // Update user's progress based on lesson completion
      const moduleStats = this.getModuleStats(moduleName, 4); // Assuming 4 lessons per module
      this.updateUserProgress(moduleName, moduleStats.completionPercentage);
      
      return existingProgress[existingIndex];
    } catch (error) {
      console.error('Error rewatching lesson:', error);
      throw error;
    }
  }

  // Get lesson progress for a specific module
  getModuleProgress(moduleName) {
    const userId = this.getCurrentUserId();
    const allProgress = this.getLessonProgress();
    return allProgress.filter(p => p.moduleName === moduleName && p.userId === userId);
  }

  // Get all lesson progress
  getLessonProgress() {
    try {
      const progress = localStorage.getItem(this.storageKey);
      return progress ? JSON.parse(progress) : [];
    } catch (error) {
      console.error('Error retrieving lesson progress:', error);
      return [];
    }
  }

  // Get progress statistics for a module
  getModuleStats(moduleName, totalLessons) {
    const moduleProgress = this.getModuleProgress(moduleName);
    const completedLessons = moduleProgress.filter(p => p.completed);
    
    return {
      totalLessons,
      completedLessons: completedLessons.length,
      completionPercentage: Math.round((completedLessons.length / totalLessons) * 100),
      totalTimeSpent: completedLessons.reduce((sum, lesson) => sum + (lesson.timeSpent || 0), 0),
      averageWatchCount: completedLessons.length > 0 
        ? Math.round(completedLessons.reduce((sum, lesson) => sum + lesson.watchCount, 0) / completedLessons.length)
        : 0,
      lastCompleted: completedLessons.length > 0 
        ? Math.max(...completedLessons.map(l => new Date(l.completedAt).getTime()))
        : null
    };
  }

  // Get overall progress across all modules
  getOverallProgress(moduleConfigs) {
    const overallStats = {
      totalModules: moduleConfigs.length,
      completedModules: 0,
      totalLessons: 0,
      completedLessons: 0,
      totalTimeSpent: 0,
      moduleStats: {}
    };

    moduleConfigs.forEach(config => {
      const moduleStats = this.getModuleStats(config.name, config.totalLessons);
      overallStats.totalLessons += config.totalLessons;
      overallStats.completedLessons += moduleStats.completedLessons;
      overallStats.totalTimeSpent += moduleStats.totalTimeSpent;
      
      if (moduleStats.completionPercentage === 100) {
        overallStats.completedModules++;
      }
      
      overallStats.moduleStats[config.name] = moduleStats;
    });

    overallStats.overallCompletionPercentage = overallStats.totalLessons > 0 
      ? Math.round((overallStats.completedLessons / overallStats.totalLessons) * 100)
      : 0;

    return overallStats;
  }

  // Get improvement areas based on exam results and lesson progress
  getImprovementAreas(moduleName, examResults) {
    const areas = [];
    
    if (examResults && examResults.percentage < 80) {
      // Analyze incorrect answers to suggest improvement areas
      const incorrectQuestions = examResults.questionResults?.filter(q => !q.isCorrect) || [];
      
      if (incorrectQuestions.length > 0) {
        // Map questions to improvement areas (this would be more sophisticated in a real app)
        const questionTopics = {
          'mathematics': {
            'counting': ['How many fingers', 'What number comes after', 'What number is missing'],
            'shapes': ['What shape has', 'Which shape has'],
            'addition': ['If you have', 'What is 1 + 1']
          },
          'science': {
            'plants': ['What do plants need', 'What color are most leaves'],
            'animals': ['What animal says', 'What do birds use', 'What do we call baby'],
            'weather': ['What falls from the sky', 'What happens to water']
          },
          'isl': {
            'greetings': ['How do you sign Hello', 'What is the sign for Thank you'],
            'alphabet': ['How do you sign the letter', 'How do you sign the number'],
            'vocabulary': ['What is the sign for Water', 'What is the sign for Family']
          }
        };

        const topics = questionTopics[moduleName.toLowerCase()] || {};
        const suggestedAreas = new Set();

        incorrectQuestions.forEach(question => {
          Object.entries(topics).forEach(([topic, keywords]) => {
            if (keywords.some(keyword => question.question.includes(keyword))) {
              suggestedAreas.add(topic);
            }
          });
        });

        suggestedAreas.forEach(area => {
          areas.push({
            area: area.charAt(0).toUpperCase() + area.slice(1),
            suggestion: `Focus more on ${area}`,
            priority: 'high'
          });
        });
      }
    }

    // Add general suggestions based on completion rate
    const moduleStats = this.getModuleStats(moduleName, 4); // Assuming 4 lessons per module
    if (moduleStats.completionPercentage < 100) {
      areas.push({
        area: 'Lesson Completion',
        suggestion: 'Complete all lessons in this module',
        priority: 'medium'
      });
    }

    if (moduleStats.averageWatchCount < 2) {
      areas.push({
        area: 'Review',
        suggestion: 'Consider rewatching lessons for better understanding',
        priority: 'low'
      });
    }

    return areas;
  }

  // Clear all lesson progress (for testing/reset)
  clearAllProgress() {
    localStorage.removeItem(this.storageKey);
    console.log('All lesson progress cleared');
  }

  // Generate unique ID
  generateId() {
    return 'lesson_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Export progress data
  exportProgress() {
    const progress = this.getLessonProgress();
    const stats = this.getOverallProgress([
      { name: 'Mathematics', totalLessons: 4 },
      { name: 'Science', totalLessons: 4 },
      { name: 'Indian Sign Language', totalLessons: 4 }
    ]);
    
    return {
      exportDate: new Date().toISOString(),
      progress,
      stats
    };
  }
}

// Create and export a singleton instance
export const lessonService = new LessonService();

// Export the class for testing purposes
export { LessonService };
