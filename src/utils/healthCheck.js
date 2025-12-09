class HealthChecker {
  async checkService(serviceUrl) {
    try {
      const response = await fetch(`${serviceUrl}/health`, {
        method: 'GET',
        timeout: 5000
      });
      
      return {
        healthy: response.ok,
        status: response.status,
        timestamp: Date.now()
      };
    } catch (error) {
      return {
        healthy: false,
        error: error.message,
        timestamp: Date.now()
      };
    }
  }
  
  async checkAllServices(services) {
    const results = {};
    
    for (const [name, config] of services.entries()) {
      results[name] = await this.checkService(config.url);
    }
    
    return results;
  }
}

module.exports = new HealthChecker();
