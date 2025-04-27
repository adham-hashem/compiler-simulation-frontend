// particles.d.ts
interface ParticlesJS {
    (tagId: string, params: any): void;
  }
  
  declare global {
    interface Window {
      particlesJS: ParticlesJS;
      pJSDom: any[];
    }
  }
  
  export {};