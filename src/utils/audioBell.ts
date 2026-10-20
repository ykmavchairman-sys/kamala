/**
 * Authentic Brass Temple Bell / Singing Bowl synthesis using Web Audio API.
 * No external mp3 files required, works instantly offline and in all modern browsers.
 */
class TempleBellPlayer {
  private ctx: AudioContext | null = null;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playBell(frequency = 528) {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // Harmonic overtones for rich Indian brass temple bell / Ghanta
      const partials = [
        { freqMult: 1.0, gain: 0.7, decay: 2.8 },
        { freqMult: 2.02, gain: 0.45, decay: 2.2 },
        { freqMult: 2.76, gain: 0.35, decay: 1.8 },
        { freqMult: 4.15, gain: 0.2, decay: 1.2 },
        { freqMult: 5.43, gain: 0.1, decay: 0.8 },
      ];

      partials.forEach(p => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequency * p.freqMult, now);

        gain.gain.setValueAtTime(p.gain * 0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + p.decay);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + p.decay);
      });
    } catch (e) {
      console.warn('AudioContext playback error', e);
    }
  }

  playConchShell() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 1.2);
      osc.frequency.exponentialRampToValueAtTime(330, now + 2.5);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.6);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 3.0);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 3.0);
    } catch (e) {
      console.warn('Conch sound error', e);
    }
  }
}

export const bellPlayer = new TempleBellPlayer();
