// Exam service for handling exam results and database operations

class ExamService {
  constructor() {
    this.storageKey = 'tinySigns_examResults';
    this.userKey = 'tinySigns_currentUser';
  }

  // Get current user ID (in a real app, this would come from authentication)
  getCurrentUserId() {
    const user = localStorage.getItem(this.userKey);
    if (user) {
      return JSON.parse(user).id;
    }
    // Generate a temporary user ID for demo purposes
    const tempUserId = 'user_' + Date.now();
    localStorage.setItem(this.userKey, JSON.stringify({ id: tempUserId }));
    return tempUserId;
  }

  // Save exam results
  async saveExamResults(examData) {
    try {
      const userId = this.getCurrentUserId();
      const examRecord = {
        id: this.generateId(),
        userId,
        moduleName: examData.moduleName,
        results: examData.results,
        timestamp: new Date().toISOString(),
        createdAt: Date.now()
      };

      // Get existing results
      const existingResults = this.getExamResults();
      
      // Add new result
      existingResults.push(examRecord);
      
      // Save back to localStorage
      localStorage.setItem(this.storageKey, JSON.stringify(existingResults));
      
      console.log('Exam results saved:', examRecord);
      return examRecord;
    } catch (error) {
      console.error('Error saving exam results:', error);
      throw error;
    }
  }

  // Get all exam results for current user
  getExamResults() {
    try {
      const results = localStorage.getItem(this.storageKey);
      return results ? JSON.parse(results) : [];
    } catch (error) {
      console.error('Error retrieving exam results:', error);
      return [];
    }
  }

  // Get exam results for specific module
  getModuleExamResults(moduleName) {
    const allResults = this.getExamResults();
    return allResults.filter(result => result.moduleName === moduleName);
  }

  // Get user's best score for a module
  getBestScore(moduleName) {
    const moduleResults = this.getModuleExamResults(moduleName);
    if (moduleResults.length === 0) return null;
    
    return moduleResults.reduce((best, current) => {
      return current.results.percentage > best.results.percentage ? current : best;
    });
  }

  // Get user's exam history
  getExamHistory() {
    const allResults = this.getExamResults();
    return allResults.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  // Get user statistics
  getUserStats() {
    const allResults = this.getExamResults();
    const stats = {
      totalExams: allResults.length,
      modulesCompleted: new Set(allResults.map(r => r.moduleName)).size,
      averageScore: 0,
      bestScore: 0,
      totalTimeSpent: 0,
      moduleStats: {}
    };

    if (allResults.length > 0) {
      // Calculate average score
      const totalPercentage = allResults.reduce((sum, result) => sum + result.results.percentage, 0);
      stats.averageScore = Math.round(totalPercentage / allResults.length);

      // Calculate best score
      stats.bestScore = Math.max(...allResults.map(r => r.results.percentage));

      // Calculate total time spent
      stats.totalTimeSpent = allResults.reduce((sum, result) => sum + result.results.completionTime, 0);

      // Calculate module-specific stats
      const moduleGroups = allResults.reduce((groups, result) => {
        if (!groups[result.moduleName]) {
          groups[result.moduleName] = [];
        }
        groups[result.moduleName].push(result);
        return groups;
      }, {});

      Object.keys(moduleGroups).forEach(moduleName => {
        const moduleResults = moduleGroups[moduleName];
        const bestResult = moduleResults.reduce((best, current) => 
          current.results.percentage > best.results.percentage ? current : best
        );
        
        stats.moduleStats[moduleName] = {
          attempts: moduleResults.length,
          bestScore: bestResult.results.percentage,
          lastAttempt: bestResult.timestamp,
          averageScore: Math.round(
            moduleResults.reduce((sum, r) => sum + r.results.percentage, 0) / moduleResults.length
          )
        };
      });
    }

    return stats;
  }

  // Clear all exam results (for testing/reset purposes)
  clearAllResults() {
    localStorage.removeItem(this.storageKey);
    console.log('All exam results cleared');
  }

  // Generate unique ID
  generateId() {
    return 'exam_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Export results (for backup or analysis)
  exportResults() {
    const results = this.getExamResults();
    const stats = this.getUserStats();
    
    return {
      exportDate: new Date().toISOString(),
      userStats: stats,
      examResults: results
    };
  }

  // Import results (for restore from backup)
  importResults(data) {
    try {
      if (data.examResults && Array.isArray(data.examResults)) {
        localStorage.setItem(this.storageKey, JSON.stringify(data.examResults));
        console.log('Exam results imported successfully');
        return true;
      }
      throw new Error('Invalid data format');
    } catch (error) {
      console.error('Error importing exam results:', error);
      return false;
    }
  }
}

// Create and export a singleton instance
export const examService = new ExamService();

// Export the class for testing purposes
export { ExamService };
