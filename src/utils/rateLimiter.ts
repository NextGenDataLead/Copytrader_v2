import { toast } from 'react-hot-toast';

export class RateLimiter {
  private queue: (() => Promise<any>)[] = [];
  private processing = false;
  private requestCount = 0;
  private resetTimeout: NodeJS.Timeout | null = null;

  constructor(
    private maxRequestsPerMinute: number = 250, // Buffer below 290 limit
    private cooldownPeriod: number = 60000 // 1 minute in milliseconds
  ) {}

  async enqueue<T>(task: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await task();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      
      this.processQueue();
    });
  }

  private async processQueue() {
    if (this.processing || this.queue.length === 0) return;
    this.processing = true;

    while (this.queue.length > 0) {
      if (this.requestCount >= this.maxRequestsPerMinute) {
        console.log('Rate limit reached, cooling down...');
        toast.error('Rate limit reached. Waiting before making more requests.');
        await this.cooldown();
      }

      const task = this.queue.shift();
      if (task) {
        this.requestCount++;
        this.scheduleReset();
        
        try {
          await task();
        } catch (error) {
          console.error('Task execution error:', error);
        }

        // Add a small delay between requests
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    this.processing = false;
  }

  private scheduleReset() {
    if (!this.resetTimeout) {
      this.resetTimeout = setTimeout(() => {
        this.requestCount = 0;
        this.resetTimeout = null;
      }, this.cooldownPeriod);
    }
  }

  private async cooldown(): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        this.requestCount = 0;
        resolve();
      }, this.cooldownPeriod);
    });
  }
}