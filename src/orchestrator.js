class MicroservicesOrchestrator {
  constructor() {
    this.services = new Map();
    this.circuitBreakers = new Map();
  }
  
  registerService(name, config) {
    this.services.set(name, {
      ...config,
      healthy: true,
      lastCheck: Date.now()
    });
  }
  
  async callService(serviceName, endpoint, data) {
    const service = this.services.get(serviceName);
    if (!service) {
      throw new Error(`Service ${serviceName} not found`);
    }
    
    // Check circuit breaker
    if (this.isCircuitOpen(serviceName)) {
      throw new Error(`Circuit breaker open for ${serviceName}`);
    }
    
    try {
      const response = await fetch(`${service.url}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        this.recordFailure(serviceName);
        throw new Error(`Service call failed: ${response.statusText}`);
      }
      
      this.recordSuccess(serviceName);
      return await response.json();
    } catch (error) {
      this.recordFailure(serviceName);
      throw error;
    }
  }
  
  isCircuitOpen(serviceName) {
    const breaker = this.circuitBreakers.get(serviceName);
    if (!breaker) return false;
    
    return breaker.failures >= breaker.threshold && 
           Date.now() - breaker.lastFailure < breaker.timeout;
  }
  
  recordFailure(serviceName) {
    if (!this.circuitBreakers.has(serviceName)) {
      this.circuitBreakers.set(serviceName, {
        failures: 0,
        successes: 0,
        threshold: 5,
        timeout: 60000
      });
    }
    
    const breaker = this.circuitBreakers.get(serviceName);
    breaker.failures++;
    breaker.lastFailure = Date.now();
  }
  
  recordSuccess(serviceName) {
    if (this.circuitBreakers.has(serviceName)) {
      const breaker = this.circuitBreakers.get(serviceName);
      breaker.failures = 0;
      breaker.successes++;
    }
  }
}

module.exports = new MicroservicesOrchestrator();
